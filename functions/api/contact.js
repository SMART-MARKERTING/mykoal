export async function onRequestGet(context) {
  const { env } = context;
  return new Response(
    JSON.stringify({
      ok: true,
      functionReached: true,
      hasResendKey: Boolean(env.RESEND_API_KEY),
      from: env.RESEND_FROM || "noreply@mykoal.com",
      to: env.RESEND_TO || "mykoal@adaxahome.com",
    }),
    { status: 200, headers: { "Content-Type": "application/json" } },
  );
}

export async function onRequestPost(context) {
  const { request, env } = context;

  if (!env.RESEND_API_KEY) {
    return new Response(
      JSON.stringify({
        success: false,
        error: "Email is not configured: RESEND_API_KEY is missing in the Cloudflare Pages environment.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }

  try {
    const data = await request.json();

    const {
      firstName, lastName, name,
      email, phone, message,
      loanType, timeline,
      loanAmount, creditScore, propertyType,
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
      return new Response(
        JSON.stringify({ success: false, status: res.status, error: err }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("contact function error", err);
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
