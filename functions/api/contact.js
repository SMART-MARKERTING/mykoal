export async function onRequestPost(context) {
  const { request, env } = context;

  // The React app submits JSON via fetch. The static /opt-in page also submits JSON
  // when JavaScript is available, but falls back to a native form POST
  // (application/x-www-form-urlencoded) when it is not. Support both.
  const contentType = request.headers.get("content-type") || "";
  const isForm =
    contentType.includes("application/x-www-form-urlencoded") ||
    contentType.includes("multipart/form-data");

  // For no-JS form submissions, respond with a simple HTML page so the visitor
  // isn't left staring at raw JSON. Otherwise respond with JSON for the SPA.
  const reply = (body, status) => {
    if (isForm) {
      return new Response(htmlResult(body), {
        status,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      });
    }
    return new Response(JSON.stringify(body), {
      status,
      headers: { "Content-Type": "application/json" },
    });
  };

  if (!env.RESEND_API_KEY) {
    return reply(
      {
        success: false,
        error: "Email is not configured: RESEND_API_KEY is missing in the Cloudflare Pages environment.",
      },
      500,
    );
  }

  try {
    let data;
    if (isForm) {
      const fd = await request.formData();
      data = Object.fromEntries(fd.entries());
      // An unchecked checkbox is simply absent from form data — record it explicitly.
      data.smsOptIn = data.smsOptIn === "Yes" ? "Yes" : "No";
    } else {
      data = await request.json();
    }

    const {
      firstName, lastName, name,
      email, phone, message,
      loanType, timeline,
      loanAmount, creditScore, propertyType,
      smsOptIn,
      ...rest
    } = data;

    const displayName = name || `${firstName || ""} ${lastName || ""}`.trim() || "Unknown";

    const rows = Object.entries({
      Name: displayName,
      Email: email,
      Phone: phone,
      "Loan Type": loanType,
      "Loan Amount": loanAmount,
      "Credit Score": creditScore,
      "Property Type": propertyType,
      Timeline: timeline,
      Message: message,
      "SMS Opt-In": smsOptIn,
      ...rest,
    })
      .filter(([, v]) => v)
      .map(
        ([k, v]) =>
          `<tr><td style="padding:6px 12px;font-weight:600;white-space:nowrap;background:#f5f5f5">${k}</td><td style="padding:6px 12px">${v}</td></tr>`
      )
      .join("");

    const html = `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
        <h2 style="color:#0077a8;margin-bottom:16px">New Lead — mykoal.com</h2>
        <table style="width:100%;border-collapse:collapse;border:1px solid #ddd;border-radius:8px;overflow:hidden">
          ${rows}
        </table>
        <p style="margin-top:24px;font-size:12px;color:#888">
          Sent from the contact form at mykoal.com
        </p>
      </div>`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: env.RESEND_FROM || "noreply@mykoal.com",
        to: env.RESEND_TO || "mykoal@adaxahome.com",
        reply_to: email || undefined,
        subject: `New Lead: ${displayName}`,
        html,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Resend send failed", res.status, err);
      return reply({ success: false, status: res.status, error: err }, 500);
    }

    return reply({ success: true }, 200);
  } catch (err) {
    console.error("contact function error", err);
    return reply({ success: false, error: err.message }, 500);
  }
}

// Minimal branded confirmation page for no-JavaScript form submissions.
function htmlResult(body) {
  const ok = body && body.success !== false;
  const heading = ok ? "Thank you!" : "Something went wrong";
  const detail = ok
    ? "Your message has been sent. Mykoal will be in touch shortly."
    : "Please try again, or call (480) 206-9290 / email mdeshazo@mykoal.com directly.";
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${heading} | Mykoal DeShazo</title>
<style>
  body{margin:0;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
    color:#e2e8f0;background:linear-gradient(135deg,#0f172a,#1e3a8a 55%,#1e293b);min-height:100vh;
    display:flex;align-items:center;justify-content:center;padding:24px;text-align:center}
  .card{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.18);border-radius:14px;
    padding:32px;max-width:440px}
  h1{color:#fff;margin:0 0 10px;font-size:24px}
  p{font-size:15px;line-height:1.6}
  a{display:inline-block;margin-top:18px;color:#fff;background:#ea580c;text-decoration:none;
    padding:11px 20px;border-radius:8px;font-weight:600}
</style></head>
<body><div class="card"><h1>${heading}</h1><p>${detail}</p>
<a href="/opt-in">Back to the form</a></div></body></html>`;
}
