import { MailService } from '@sendgrid/mail';

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
if (!SENDGRID_API_KEY) {
  throw new Error("SENDGRID_API_KEY environment variable must be set");
}

const mailService = new MailService();
mailService.setApiKey(SENDGRID_API_KEY);

interface EmailParams {
  to: string;
  from: string;
  subject: string;
  text?: string;
  html?: string;
}

const FROM_EMAIL = "mdeshazo@mykoal.com";
const TO_EMAIL = "mdeshazo@mykoal.com";

export async function sendEmail(params: EmailParams): Promise<boolean> {
  try {
    await mailService.send({
      to: params.to,
      from: params.from,
      subject: params.subject,
      html: params.html || params.text || '',
      text: params.text || '',
    });
    return true;
  } catch (error) {
    console.error('SendGrid email error:', error);
    return false;
  }
}

export async function sendNotificationEmail(template: any): Promise<boolean> {
  return sendEmail({
    to: TO_EMAIL,
    from: FROM_EMAIL,
    subject: template.subject,
    text: template.text,
    html: template.html,
  });
}

// Email templates for form notifications
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
    `,
    text: `
      New Contact Form Submission
      
      Name: ${contact.firstName} ${contact.lastName}
      Email: ${contact.email}
      Phone: ${contact.phone}
      Loan Type: ${contact.loanType}
      Message: ${contact.message || 'No message provided'}
      Submitted: ${new Date().toLocaleString()}
    `
  }),

  newQuickQuote: (quote: any) => ({
    subject: `New Quote Request - $${parseInt(quote.loanAmount).toLocaleString()}`,
    html: `
      <h2>New Quick Quote Request</h2>
      <p><strong>Email:</strong> ${quote.email}</p>
      <p><strong>Loan Amount:</strong> $${parseInt(quote.loanAmount).toLocaleString()}</p>
      <p><strong>Credit Score:</strong> ${quote.creditScore}</p>
      <p><strong>Property Type:</strong> ${quote.propertyType}</p>
      <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
    `,
    text: `
      New Quick Quote Request
      
      Email: ${quote.email}
      Loan Amount: $${parseInt(quote.loanAmount).toLocaleString()}
      Credit Score: ${quote.creditScore}
      Property Type: ${quote.propertyType}
      Submitted: ${new Date().toLocaleString()}
    `
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
    `,
    text: `
      New Pre-Qualification Application
      
      Name: ${preQual.firstName} ${preQual.lastName}
      Email: ${preQual.email}
      Phone: ${preQual.phone}
      Loan Type: ${preQual.loanType}
      Loan Amount: $${parseInt(preQual.loanAmount).toLocaleString()}
      Property Value: $${parseInt(preQual.propertyValue).toLocaleString()}
      Property Type: ${preQual.propertyType}
      Loan Term: ${preQual.loanTerm}
      Notes: ${preQual.notes || 'No additional notes'}
      Submitted: ${new Date().toLocaleString()}
    `
  }),

  newMarketSubscription: (subscription: any) => ({
    subject: `New Market Updates Subscription: ${subscription.email}`,
    html: `
      <h2>New Market Updates Subscription</h2>
      <p><strong>Email:</strong> ${subscription.email}</p>
      <p><strong>Subscribed:</strong> ${new Date().toLocaleString()}</p>
    `,
    text: `
      New Market Updates Subscription
      
      Email: ${subscription.email}
      Subscribed: ${new Date().toLocaleString()}
    `
  })
};