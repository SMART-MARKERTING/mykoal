import { Resend } from 'resend';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
if (!RESEND_API_KEY) {
  console.warn("⚠️  RESEND_API_KEY is not set — email sending will be disabled until configured.");
}

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

export const FROM_EMAIL = "noreply@mykoal.com";
const REPLY_TO = "mdeshazo@mykoal.com";
const TO_EMAIL = "mdeshazo@mykoal.com";

const PROFESSIONAL_SIGNATURE = `
<div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666;">
  <p style="color: #0066cc; font-style: italic; margin-bottom: 15px;">
    <strong>"Trust in the Lord with all your heart" - Proverbs 3:5</strong>
  </p>
  <p><strong>Mykoal DeShazo</strong><br>
  Vice President | Senior Loan Officer, NMLS# 1912347<br>
  Adaxa Home LLC · NMLS# 2380533<br>
  <a href="https://www.experience.com/mykoal-deshazo" style="color: #0066cc;">See My Reviews</a></p>
  <p><strong>Phone:</strong> (949) 418-5486<br>
  <strong>Email:</strong> <a href="mailto:mdeshazo@mykoal.com" style="color: #0066cc;">mdeshazo@mykoal.com</a><br>
  <strong>Website:</strong> <a href="https://mykoal.com" style="color: #0066cc;">mykoal.com</a><br>
  <strong>Address:</strong> 16767 N Perimeter Dr., Ste 150, Scottsdale, AZ 85260</p>
  <p style="font-size: 11px; color: #888;">This is not a commitment to lend. The contents of this message may be confidential. If you are not the intended recipient, do not disseminate, disclose, copy or use this message without the permission of the author. Nothing contained herein shall constitute a contract or electronic signature. If received in error, please delete immediately.</p>
</div>
`;

const PROFESSIONAL_SIGNATURE_TEXT = `

"Trust in the Lord with all your heart" - Proverbs 3:5

---
Mykoal DeShazo
Vice President | Senior Loan Officer, NMLS# 1912347
Adaxa Home LLC · NMLS# 2380533
Reviews: https://www.experience.com/mykoal-deshazo

Phone: (949) 418-5486
Email: mdeshazo@mykoal.com
Website: mykoal.com
Address: 16767 N Perimeter Dr., Ste 150, Scottsdale, AZ 85260

This is not a commitment to lend. If received in error, please delete immediately.
`;

export async function sendEmail(params: {
  to: string;
  subject: string;
  html?: string;
  text?: string;
}): Promise<boolean> {
  if (!resend) {
    console.warn("Email not sent — RESEND_API_KEY is not configured.");
    return false;
  }
  try {
    console.log(`Sending email via Resend to ${params.to}...`);
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      replyTo: REPLY_TO,
      to: params.to,
      subject: params.subject,
      html: params.html,
      text: params.text,
    });
    if (error) {
      console.error('Resend email error:', error);
      throw new Error(`Email delivery failed: ${error.message}`);
    }
    console.log(`✓ Email sent successfully to ${params.to}`);
    return true;
  } catch (error: any) {
    console.error('Resend email error:', error.message);
    throw new Error(`Email delivery failed: ${error.message}`);
  }
}

export async function sendNotificationEmail(template: { subject: string; html?: string; text?: string }): Promise<boolean> {
  return sendEmail({
    to: TO_EMAIL,
    subject: template.subject,
    html: template.html,
    text: template.text,
  });
}

export const emailTemplates = {
  newContact: (contact: any) => ({
    subject: `New Contact Form Submission from ${contact.firstName} ${contact.lastName}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${contact.firstName} ${contact.lastName}</p>
      <p><strong>Email:</strong> ${contact.email}</p>
      <p><strong>Phone:</strong> ${contact.phone}</p>
      <p><strong>Loan Type:</strong> ${contact.loanType}</p>
      <p><strong>Message:</strong> ${contact.message || 'No message provided'}</p>
      <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
      ${PROFESSIONAL_SIGNATURE}
    `,
    text: `New Contact Form Submission\n\nName: ${contact.firstName} ${contact.lastName}\nEmail: ${contact.email}\nPhone: ${contact.phone}\nLoan Type: ${contact.loanType}\nMessage: ${contact.message || 'No message provided'}\nSubmitted: ${new Date().toLocaleString()}${PROFESSIONAL_SIGNATURE_TEXT}`,
  }),

  newQuickQuote: (quote: any) => ({
    subject: `New Quote Request - $${parseInt(quote.loanAmount).toLocaleString()}`,
    html: `
      <h2>New Quick Quote Request</h2>
      <p><strong>Email:</strong> ${quote.email}</p>
      <p><strong>Phone:</strong> ${quote.phone || 'Not provided'}</p>
      <p><strong>Loan Amount:</strong> $${parseInt(quote.loanAmount).toLocaleString()}</p>
      <p><strong>Credit Score:</strong> ${quote.creditScore}</p>
      <p><strong>Property Type:</strong> ${quote.propertyType}</p>
      <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
      ${PROFESSIONAL_SIGNATURE}
    `,
    text: `New Quick Quote Request\n\nEmail: ${quote.email}\nPhone: ${quote.phone || 'Not provided'}\nLoan Amount: $${parseInt(quote.loanAmount).toLocaleString()}\nCredit Score: ${quote.creditScore}\nProperty Type: ${quote.propertyType}\nSubmitted: ${new Date().toLocaleString()}${PROFESSIONAL_SIGNATURE_TEXT}`,
  }),

  quickQuoteAutoReply: (quote: any) => ({
    subject: `We're Working on Your Rate Quote — Mykoal DeShazo`,
    html: `
      <h2>Thank You for Your Quote Request!</h2>
      <p>Hello,</p>
      <p>Thank you for requesting a rate quote. I'm personally reviewing your information and will be in touch within 24 hours.</p>
      <h3>Your Request Details:</h3>
      <ul>
        <li><strong>Loan Amount:</strong> $${parseInt(quote.loanAmount).toLocaleString()}</li>
        <li><strong>Credit Score Range:</strong> ${quote.creditScore}</li>
        <li><strong>Loan Type:</strong> ${quote.propertyType}</li>
      </ul>
      <p>If you have any immediate questions, feel free to call me directly at <strong>(949) 418-5486</strong>.</p>
      ${PROFESSIONAL_SIGNATURE}
    `,
    text: `Thank You for Your Quote Request!\n\nLoan Amount: $${parseInt(quote.loanAmount).toLocaleString()}\nCredit Score: ${quote.creditScore}\nLoan Type: ${quote.propertyType}\n\nI'll be in touch within 24 hours. Call (949) 418-5486 with any questions.${PROFESSIONAL_SIGNATURE_TEXT}`,
  }),

  newPreQualification: (preQual: any) => ({
    subject: `New Pre-Qualification Application from ${preQual.firstName} ${preQual.lastName}`,
    html: `
      <h2>New Pre-Qualification Application</h2>
      <p><strong>Name:</strong> ${preQual.firstName} ${preQual.lastName}</p>
      <p><strong>Email:</strong> ${preQual.email}</p>
      <p><strong>Phone:</strong> ${preQual.phone}</p>
      <p><strong>Loan Type:</strong> ${preQual.loanType}</p>
      <p><strong>Loan Amount:</strong> $${parseInt(preQual.loanAmount).toLocaleString()}</p>
      <p><strong>Property Value:</strong> $${parseInt(preQual.propertyValue).toLocaleString()}</p>
      <p><strong>Property Type:</strong> ${preQual.propertyType}</p>
      <p><strong>Loan Term:</strong> ${preQual.loanTerm}</p>
      <p><strong>Notes:</strong> ${preQual.notes || 'No additional notes'}</p>
      <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
      ${PROFESSIONAL_SIGNATURE}
    `,
    text: `New Pre-Qualification Application\n\nName: ${preQual.firstName} ${preQual.lastName}\nEmail: ${preQual.email}\nPhone: ${preQual.phone}\nLoan Type: ${preQual.loanType}\nLoan Amount: $${parseInt(preQual.loanAmount).toLocaleString()}\nProperty Value: $${parseInt(preQual.propertyValue).toLocaleString()}\nProperty Type: ${preQual.propertyType}\nLoan Term: ${preQual.loanTerm}\nNotes: ${preQual.notes || 'None'}\nSubmitted: ${new Date().toLocaleString()}${PROFESSIONAL_SIGNATURE_TEXT}`,
  }),

  newMarketSubscription: (subscription: any) => ({
    subject: `New Market Updates Subscription: ${subscription.email}`,
    html: `
      <h2>New Market Updates Subscription</h2>
      <p><strong>Email:</strong> ${subscription.email}</p>
      <p><strong>Subscribed:</strong> ${new Date().toLocaleString()}</p>
      ${PROFESSIONAL_SIGNATURE}
    `,
    text: `New Market Updates Subscription\n\nEmail: ${subscription.email}\nSubscribed: ${new Date().toLocaleString()}${PROFESSIONAL_SIGNATURE_TEXT}`,
  }),
};
