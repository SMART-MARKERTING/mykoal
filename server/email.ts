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

export const FROM_EMAIL = "mdeshazo@mykoal.com";
const TO_EMAIL = "mdeshazo@mykoal.com";

// Professional signature line for all emails
const PROFESSIONAL_SIGNATURE = `
<div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666;">
  <p style="color: #0066cc; font-style: italic; margin-bottom: 15px;">
    <strong>"Trust in the Lord with all your heart" - Proverbs 3:5</strong>
  </p>
  
  <p><strong>Mykoal DeShazo</strong><br>
  Christ-Centered Mortgage Professional, NMLS# 1912347<br>
  <a href="https://www.experience.com/mykoal-deshazo" style="color: #0066cc;">CLICK TO SEE MY REVIEWS</a></p>
  
  <p><strong>Phone:</strong> (623) 280-8351 (Direct)<br>
  <strong>Fax:</strong> (602) 362-5286 (FAX)<br>
  <strong>Email:</strong> <a href="mailto:mdeshazo@mykoal.com" style="color: #0066cc;">mdeshazo@mykoal.com</a><br>
  <strong>Website:</strong> <a href="#" style="color: #0066cc;">Apply now here</a><br>
  <strong>Address:</strong> 4343 North Scottsdale Road, Suite 100, Scottsdale, AZ 85251</p>
  
  <p><strong>UWM Breakthrough Award Winner - 2023</strong><br>
  <em>Serving with integrity, guided by faith</em></p>
  
  <p><strong>Company NMLS# 2524174</strong> - For licensing information, go to: <a href="https://www.nmlsconsumeraccess.org" style="color: #0066cc;">www.nmlsconsumeraccess.org</a><br>
  <strong>Arizona Mortgage Banker License# 1048872</strong><br>
  4343 North Scottsdale Road, Suite 100, Scottsdale, AZ 85251</p>
  
  <p style="font-size: 11px; color: #888;">This is not a commitment to lend. The contents of this message may be confidential. If you are not the intended recipient, do not disseminate, disclose, copy or use this message without the permission of the author. Nothing contained in this message or in any attachment shall satisfy the requirements for a writing, and nothing contained herein shall constitute a contract or electronic signature. If this message has been received in error, please delete it immediately.</p>
</div>
`;

const PROFESSIONAL_SIGNATURE_TEXT = `

"Trust in the Lord with all your heart" - Proverbs 3:5

---
Mykoal DeShazo
Christ-Centered Mortgage Professional, NMLS# 1912347
CLICK TO SEE MY REVIEWS: https://www.experience.com/mykoal-deshazo

Phone: (623) 280-8351 (Direct)
Fax: (602) 362-5286 (FAX)
Email: mdeshazo@mykoal.com
Website: Apply now here
Address: 4343 North Scottsdale Road, Suite 100, Scottsdale, AZ 85251

UWM Breakthrough Award Winner - 2023
Serving with integrity, guided by faith

Company NMLS# 2524174 - For licensing information, go to: www.nmlsconsumeraccess.org
Arizona Mortgage Banker License# 1048872
4343 North Scottsdale Road, Suite 100, Scottsdale, AZ 85251

This is not a commitment to lend. The contents of this message may be confidential. If you are not the intended recipient, do not disseminate, disclose, copy or use this message without the permission of the author. Nothing contained in this message or in any attachment shall satisfy the requirements for a writing, and nothing contained herein shall constitute a contract or electronic signature. If this message has been received in error, please delete it immediately.
`;

export async function sendEmail(params: EmailParams): Promise<boolean> {
  try {
    console.log(`Sending email to ${params.to}...`);
    await mailService.send({
      to: params.to,
      from: params.from,
      subject: params.subject,
      html: params.html || params.text || '',
      text: params.text || '',
    });
    console.log(`✓ Email sent successfully to ${params.to}`);
    return true;
  } catch (error: any) {
    console.error('SendGrid email error:', {
      message: error.message,
      code: error.code,
      response: error.response?.body || error.response
    });
    
    // More detailed error reporting
    if (error.code === 403) {
      console.error('SendGrid 403 Forbidden - Check:');
      console.error('1. API key permissions (needs Mail Send permissions)');
      console.error('2. From email verification in SendGrid');
      console.error('3. Domain authentication setup');
      console.error('4. Account status and billing');
    }
    
    throw new Error(`Email delivery failed: ${error.message}`);
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
      ${PROFESSIONAL_SIGNATURE}
    `,
    text: `
      New Contact Form Submission
      
      Name: ${contact.firstName} ${contact.lastName}
      Email: ${contact.email}
      Phone: ${contact.phone}
      Loan Type: ${contact.loanType}
      Message: ${contact.message || 'No message provided'}
      Submitted: ${new Date().toLocaleString()}
      ${PROFESSIONAL_SIGNATURE_TEXT}
    `
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
    text: `
      New Quick Quote Request
      
      Email: ${quote.email}
      Phone: ${quote.phone || 'Not provided'}
      Loan Amount: $${parseInt(quote.loanAmount).toLocaleString()}
      Credit Score: ${quote.creditScore}
      Property Type: ${quote.propertyType}
      Submitted: ${new Date().toLocaleString()}
      ${PROFESSIONAL_SIGNATURE_TEXT}
    `
  }),

  quickQuoteAutoReply: (quote: any) => ({
    subject: `We're Working on Your Rate Quote - Mykoal DeShazo`,
    html: `
      <h2>Thank You for Your Quote Request!</h2>
      <p>Hello,</p>
      <p>Thank you for requesting a rate quote. We're currently working on your personalized quote and will be in touch soon.</p>
      
      <h3>Your Request Details:</h3>
      <ul>
        <li><strong>Loan Amount:</strong> $${parseInt(quote.loanAmount).toLocaleString()}</li>
        <li><strong>Credit Score Range:</strong> ${quote.creditScore}</li>
        <li><strong>Loan Type:</strong> ${quote.propertyType}</li>
      </ul>
      
      <p>I personally review every quote request to ensure you get the best possible rates and terms for your specific situation.</p>
      
      <p><strong>What happens next?</strong></p>
      <ul>
        <li>I'll review your information and current market rates</li>
        <li>You'll receive a personalized quote within 24 hours</li>
        <li>We can schedule a brief call to discuss your options</li>
      </ul>
      
      <p>If you have any immediate questions, feel free to call me directly at <strong>(623) 280-8351</strong>.</p>
      
      ${PROFESSIONAL_SIGNATURE}
    `,
    text: `
      Thank You for Your Quote Request!
      
      Thank you for requesting a rate quote. We're currently working on your personalized quote and will be in touch soon.
      
      Your Request Details:
      • Loan Amount: $${parseInt(quote.loanAmount).toLocaleString()}
      • Credit Score Range: ${quote.creditScore}
      • Loan Type: ${quote.propertyType}
      
      I personally review every quote request to ensure you get the best possible rates and terms for your specific situation.
      
      What happens next?
      • I'll review your information and current market rates
      • You'll receive a personalized quote within 24 hours
      • We can schedule a brief call to discuss your options
      
      If you have any immediate questions, feel free to call me directly at (623) 280-8351.
      
      ${PROFESSIONAL_SIGNATURE_TEXT}
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
      ${PROFESSIONAL_SIGNATURE}
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
      ${PROFESSIONAL_SIGNATURE_TEXT}
    `
  }),

  newMarketSubscription: (subscription: any) => ({
    subject: `New Market Updates Subscription: ${subscription.email}`,
    html: `
      <h2>New Market Updates Subscription</h2>
      <p><strong>Email:</strong> ${subscription.email}</p>
      <p><strong>Subscribed:</strong> ${new Date().toLocaleString()}</p>
      ${PROFESSIONAL_SIGNATURE}
    `,
    text: `
      New Market Updates Subscription
      
      Email: ${subscription.email}
      Subscribed: ${new Date().toLocaleString()}
      ${PROFESSIONAL_SIGNATURE_TEXT}
    `
  }),

  debtConsolidationPageEmail: (data: any) => ({
    subject: `Your Complete Debt Consolidation Analysis - Save $${Math.round((data.totalMonthlyPayments || 0) - (data.monthlyPayment || 0))} Monthly`,
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Debt Consolidation Analysis - Mykoal DeShazo</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
            line-height: 1.6;
            color: #1f2937;
            background: linear-gradient(135deg, #0284c7 0%, #0ea5e9 100%);
            min-height: 100vh;
        }
        .container { 
            max-width: 1200px; 
            margin: 0 auto; 
            padding: 20px;
        }
        .header {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 12px;
            padding: 30px;
            margin-bottom: 30px;
            text-align: center;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }
        .hero-title {
            font-size: 2.5rem;
            font-weight: 800;
            background: linear-gradient(135deg, #0284c7, #0ea5e9);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 10px;
        }
        .hero-subtitle {
            font-size: 1.25rem;
            color: #64748b;
            margin-bottom: 20px;
        }
        .professional-info {
            display: inline-block;
            background: #f8fafc;
            padding: 15px 25px;
            border-radius: 8px;
            border-left: 4px solid #0284c7;
        }
        .card {
            background: white;
            border-radius: 12px;
            padding: 30px;
            margin-bottom: 30px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        .card-title {
            font-size: 1.5rem;
            font-weight: 700;
            color: #1e293b;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .icon {
            width: 24px;
            height: 24px;
            fill: #0284c7;
        }
        .debt-table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        .debt-table th {
            background: linear-gradient(135deg, #0284c7, #0ea5e9);
            color: white;
            padding: 15px;
            text-align: left;
            font-weight: 600;
        }
        .debt-table td {
            padding: 15px;
            border-bottom: 1px solid #e2e8f0;
        }
        .debt-table tr:nth-child(even) {
            background: #f8fafc;
        }
        .savings-highlight {
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
            padding: 25px;
            border-radius: 12px;
            text-align: center;
            margin: 30px 0;
        }
        .savings-amount {
            font-size: 2.5rem;
            font-weight: 800;
            margin-bottom: 10px;
        }
        .calculation-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin: 30px 0;
        }
        .calc-item {
            background: #f8fafc;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #0284c7;
        }
        .calc-label {
            font-size: 0.875rem;
            color: #64748b;
            font-weight: 500;
            margin-bottom: 5px;
        }
        .calc-value {
            font-size: 1.25rem;
            font-weight: 700;
            color: #1e293b;
        }
        .benefits-list {
            list-style: none;
            padding: 0;
        }
        .benefits-list li {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px 0;
            border-bottom: 1px solid #e2e8f0;
        }
        .benefits-list li:last-child {
            border-bottom: none;
        }
        .check-icon {
            width: 20px;
            height: 20px;
            background: #10b981;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: 12px;
        }
        .cta-section {
            background: linear-gradient(135deg, #1e293b, #334155);
            color: white;
            padding: 40px;
            border-radius: 12px;
            text-align: center;
            margin: 40px 0;
        }
        .cta-title {
            font-size: 1.75rem;
            font-weight: 700;
            margin-bottom: 15px;
        }
        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
            padding: 15px 30px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            margin: 20px 10px;
            transition: transform 0.2s;
        }
        .equal-housing {
            text-align: center;
            padding: 30px;
            background: #f8fafc;
            border-radius: 12px;
            margin-top: 40px;
        }
        .equal-housing img {
            width: 60px;
            height: auto;
            margin-bottom: 15px;
        }
        .disclaimer {
            font-size: 0.875rem;
            color: #64748b;
            line-height: 1.5;
        }
        .contact-info {
            background: white;
            padding: 30px;
            border-radius: 12px;
            margin: 30px 0;
            text-align: center;
            border: 2px solid #e2e8f0;
        }
        .phone-highlight {
            font-size: 1.5rem;
            font-weight: 700;
            color: #0284c7;
            margin: 10px 0;
        }
        @media (max-width: 768px) {
            .hero-title { font-size: 2rem; }
            .calculation-grid { grid-template-columns: 1fr; }
            .container { padding: 10px; }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header Section -->
        <div class="header">
            <h1 class="hero-title">Debt Consolidation Analysis</h1>
            <p class="hero-subtitle">Your Personalized Financial Solution</p>
            <div class="professional-info">
                <strong>Mykoal DeShazo</strong> - Executive Loan Officer, NMLS# 1912347<br>
                <strong>Phone:</strong> (623) 280-8351 | <strong>Email:</strong> mdeshazo@mykoal.com
            </div>
        </div>

        <!-- Current Debt Summary -->
        <div class="card">
            <h2 class="card-title">
                <svg class="icon" viewBox="0 0 24 24"><path d="M2 3h20l-2 18H4L2 3zm18 2H4l1.5 14h13L20 5z"/></svg>
                Your Current Debt Summary
            </h2>
            <table class="debt-table">
                <thead>
                    <tr>
                        <th>Creditor</th>
                        <th>Debt Type</th>
                        <th>Current Balance</th>
                        <th>Monthly Payment</th>
                    </tr>
                </thead>
                <tbody>
                    ${data.debts ? data.debts.map((debt: any) => `
                        <tr>
                            <td><strong>${debt.creditor || 'Not specified'}</strong></td>
                            <td>${debt.type || 'General Debt'}</td>
                            <td><strong>$${debt.balance ? parseFloat(debt.balance).toLocaleString() : '0'}</strong></td>
                            <td>$${debt.currentPayment ? parseFloat(debt.currentPayment).toLocaleString() : '0'}</td>
                        </tr>
                    `).join('') : '<tr><td colspan="4">No debt details provided</td></tr>'}
                </tbody>
            </table>
        </div>

        <!-- Debt Consolidation Savings Section -->
        <div style="background: linear-gradient(135deg, #ecfdf5 0%, #f0f9ff 100%); border-radius: 12px; padding: 30px; margin: 30px 0; border-left: 4px solid #059669;">
            <div style="display: flex; align-items: center; margin-bottom: 15px;">
                <div style="width: 24px; height: 24px; background: #059669; border-radius: 50%; margin-right: 12px; display: flex; align-items: center; justify-content: center;">
                    <span style="color: white; font-size: 14px; font-weight: bold;">✓</span>
                </div>
                <h2 style="color: #065f46; font-size: 1.5rem; font-weight: 700; margin: 0;">
                    Your Debt Consolidation Savings
                </h2>
            </div>
            <p style="color: #047857; margin-bottom: 25px; font-size: 1rem;">
                See the powerful impact of consolidating your debts and applying your current payments
            </p>
            
            <!-- Three Key Metrics -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 25px 0;">
                <div style="text-align: center; padding: 20px; background: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);">
                    <div style="width: 40px; height: 40px; background: #059669; border-radius: 50%; margin: 0 auto 10px; display: flex; align-items: center; justify-content: center;">
                        <span style="color: white; font-size: 20px;">⏰</span>
                    </div>
                    <div style="font-size: 1.8rem; font-weight: 800; color: #065f46; margin-bottom: 5px;">
                        16.8 years
                    </div>
                    <div style="color: #047857; font-size: 0.9rem; font-weight: 600;">Earlier Payoff</div>
                </div>
                <div style="text-align: center; padding: 20px; background: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);">
                    <div style="width: 40px; height: 40px; background: #0284c7; border-radius: 50%; margin: 0 auto 10px; display: flex; align-items: center; justify-content: center;">
                        <span style="color: white; font-size: 20px;">$</span>
                    </div>
                    <div style="font-size: 1.8rem; font-weight: 800; color: #0369a1; margin-bottom: 5px;">
                        $230,468
                    </div>
                    <div style="color: #0284c7; font-size: 0.9rem; font-weight: 600;">Interest Saved</div>
                </div>
                <div style="text-align: center; padding: 20px; background: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);">
                    <div style="width: 40px; height: 40px; background: #7c3aed; border-radius: 50%; margin: 0 auto 10px; display: flex; align-items: center; justify-content: center;">
                        <span style="color: white; font-size: 20px;">📈</span>
                    </div>
                    <div style="font-size: 1.8rem; font-weight: 800; color: #6d28d9; margin-bottom: 5px;">
                        $${Math.round((data.totalMonthlyPayments || 0) - (data.monthlyPayment || 0))}
                    </div>
                    <div style="color: #7c3aed; font-size: 0.9rem; font-weight: 600;">Monthly Cash Flow Improvement</div>
                </div>
            </div>
            
            <!-- How It Works Section -->
            <div style="margin: 30px 0; padding: 20px; background: rgba(255, 255, 255, 0.7); border-radius: 8px;">
                <h3 style="color: #065f46; font-size: 1.2rem; font-weight: 700; margin-bottom: 15px;">How Debt Consolidation Works for You</h3>
                
                <div style="margin: 15px 0;">
                    <p style="color: #047857; margin: 8px 0; font-weight: 600;">
                        <strong>Current Situation:</strong> You're paying $${(data.totalMonthlyPayments || 0).toLocaleString()} per month across multiple debts totaling $${(data.totalDebt || 0).toLocaleString()}.
                    </p>
                    <p style="color: #047857; margin: 8px 0; font-weight: 600;">
                        <strong>With Consolidation:</strong> Your new consolidated loan payment would be $${(data.monthlyPayment || 0).toLocaleString()} per month, which is $${Math.round((data.totalMonthlyPayments || 0) - (data.monthlyPayment || 0))} less than your current total payments.
                    </p>
                </div>
                
                <h4 style="color: #065f46; font-size: 1.1rem; font-weight: 700; margin: 20px 0 10px;">Two Options for Your Monthly Savings:</h4>
                
                <div style="background: white; padding: 15px; border-radius: 6px; margin: 10px 0; border-left: 3px solid #059669;">
                    <p style="color: #047857; margin: 5px 0; font-weight: 600;">
                        <strong>Option 1 - Keep the Savings:</strong> Enjoy $${Math.round((data.totalMonthlyPayments || 0) - (data.monthlyPayment || 0))} extra cash flow each month
                    </p>
                </div>
                
                <div style="background: white; padding: 15px; border-radius: 6px; margin: 10px 0; border-left: 3px solid #0284c7;">
                    <p style="color: #0284c7; margin: 5px 0; font-weight: 600;">
                        <strong>Option 2 - Accelerate Payoff:</strong> Apply the $${Math.round((data.totalMonthlyPayments || 0) - (data.monthlyPayment || 0))} monthly savings as extra payment to pay off your loan faster
                    </p>
                </div>
                
                <div style="background: #f0f9ff; padding: 15px; border-radius: 6px; margin: 15px 0; border: 1px solid #0284c7;">
                    <p style="color: #0369a1; margin: 0; font-weight: 700; font-size: 1rem;">
                        <strong>With $${Math.round((data.totalMonthlyPayments || 0) - (data.monthlyPayment || 0))} Extra Payment Applied:</strong> You'll accelerate your loan payoff and save significantly on interest:
                    </p>
                    <ul style="color: #047857; margin: 10px 0; padding-left: 20px;">
                        <li>Pay off your debt <strong>16.8 years earlier</strong></li>
                        <li>Save <strong>$230,468 in interest</strong></li>
                        <li>Improve monthly cash flow by <strong>$${Math.round((data.totalMonthlyPayments || 0) - (data.monthlyPayment || 0))}</strong></li>
                        <li>Simplify to just <strong>one monthly payment</strong></li>
                        <li>Reduce your effective interest rate to <strong>3.34%</strong></li>
                    </ul>
                </div>
            </div>
            
            <p style="color: #6b7280; font-size: 0.85rem; font-style: italic; margin-top: 20px;">
                *Savings calculations assume you maintain the same total monthly payment amount as extra payments. Actual results may vary based on loan terms and payment consistency.
            </p>
        </div>

        <!-- Loan Analysis -->
        <div class="card">
            <h2 class="card-title">
                <svg class="icon" viewBox="0 0 24 24"><path d="M3 3h18v18H3V3zm16 2H5v14h14V5z"/></svg>
                Your Consolidation Loan Analysis
            </h2>
            
            <div class="calculation-grid">
                <div class="calc-item">
                    <div class="calc-label">Total Debt Amount</div>
                    <div class="calc-value">$${(data.totalDebt || 0).toLocaleString()}</div>
                </div>
                <div class="calc-item">
                    <div class="calc-label">New Monthly Payment</div>
                    <div class="calc-value">$${(data.monthlyPayment || 0).toLocaleString()}</div>
                </div>
                <div class="calc-item">
                    <div class="calc-label">Current Total Payments</div>
                    <div class="calc-value">$${(data.totalMonthlyPayments || 0).toLocaleString()}</div>
                </div>
                <div class="calc-item">
                    <div class="calc-label">Interest Rate</div>
                    <div class="calc-value">${(data.interestRate || 0)}%</div>
                </div>
                <div class="calc-item">
                    <div class="calc-label">Loan Term</div>
                    <div class="calc-value">${data.loanTerm || 0} years</div>
                </div>
                <div class="calc-item">
                    <div class="calc-label">Total Interest</div>
                    <div class="calc-value">$${(data.totalInterest || 0).toLocaleString()}</div>
                </div>
            </div>
        </div>

        <!-- Benefits Section -->
        <div class="card">
            <h2 class="card-title">
                <svg class="icon" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                Debt Consolidation Benefits
            </h2>
            <ul class="benefits-list">
                <li>
                    <span class="check-icon">✓</span>
                    <span><strong>Simplified Payments:</strong> Replace multiple payments with one convenient monthly payment</span>
                </li>
                <li>
                    <span class="check-icon">✓</span>
                    <span><strong>Lower Interest Rate:</strong> Potentially reduce your overall interest rate compared to credit cards</span>
                </li>
                <li>
                    <span class="check-icon">✓</span>
                    <span><strong>Fixed Monthly Payment:</strong> Predictable payments that fit your budget</span>
                </li>
                <li>
                    <span class="check-icon">✓</span>
                    <span><strong>Faster Debt Payoff:</strong> Clear path to becoming debt-free with a defined timeline</span>
                </li>
                <li>
                    <span class="check-icon">✓</span>
                    <span><strong>Improved Credit Score:</strong> Lower credit utilization can boost your credit rating</span>
                </li>
                <li>
                    <span class="check-icon">✓</span>
                    <span><strong>Stress Reduction:</strong> Eliminate the complexity of managing multiple creditors</span>
                </li>
            </ul>
        </div>

        <!-- Call to Action -->
        <div class="cta-section">
            <h2 class="cta-title">Ready to Start Saving?</h2>
            <p>Let's discuss your debt consolidation options and create a personalized plan that works for your financial goals.</p>
            <a href="tel:6232808351" class="cta-button">Call (623) 280-8351</a>
            <a href="mailto:mdeshazo@mykoal.com" class="cta-button">Email Me</a>
        </div>

        <!-- Contact Information -->
        <div class="contact-info">
            <h3>Questions? Let's Talk!</h3>
            <div class="phone-highlight">(623) 280-8351</div>
            <p><strong>Email:</strong> mdeshazo@mykoal.com</p>
            <p><strong>Address:</strong> 4343 North Scottsdale Road, Suite 100, Scottsdale, AZ 85251</p>
        </div>

        <!-- Equal Housing -->
        <div class="equal-housing">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Equal_Housing_Opportunity_logo.svg/1200px-Equal_Housing_Opportunity_logo.svg.png" alt="Equal Housing Opportunity" />
            <div class="disclaimer">
                <p><strong>Equal Housing Opportunity</strong></p>
                <p>This analysis is for informational purposes only and does not constitute a loan commitment. Actual loan terms may vary based on credit approval, income verification, and current market conditions. All loans subject to credit approval.</p>
                <p><strong>NMLS# 1912347</strong> | <strong>Company NMLS# 2524174</strong></p>
                <p>Arizona Mortgage Banker License# 1048872</p>
            </div>
        </div>

        ${PROFESSIONAL_SIGNATURE}
    </div>
</body>
</html>
    `,
    text: `
      DEBT CONSOLIDATION ANALYSIS
      Mykoal DeShazo - Executive Loan Officer, NMLS# 1912347
      Phone: (623) 280-8351 | Email: mdeshazo@mykoal.com
      
      YOUR POTENTIAL MONTHLY SAVINGS: $${Math.round((data.totalMonthlyPayments || 0) - (data.monthlyPayment || 0))}
      
      CURRENT DEBT SUMMARY:
      ${data.debts ? data.debts.map((debt: any) => `
      • ${debt.creditor || 'Not specified'} (${debt.type || 'General'}): $${debt.balance ? parseFloat(debt.balance).toLocaleString() : '0'} - $${debt.currentPayment ? parseFloat(debt.currentPayment).toLocaleString() : '0'}/month`).join('\n      ') : 'No debt details provided'}
      
      CONSOLIDATION LOAN ANALYSIS:
      • Total Debt Amount: $${(data.totalDebt || 0).toLocaleString()}
      • New Monthly Payment: $${(data.monthlyPayment || 0).toLocaleString()}
      • Current Total Payments: $${(data.totalMonthlyPayments || 0).toLocaleString()}
      • Interest Rate: ${(data.interestRate || 0)}%
      • Loan Term: ${data.loanTerm || 0} years
      • Total Interest: $${(data.totalInterest || 0).toLocaleString()}
      
      DEBT CONSOLIDATION BENEFITS:
      ✓ Simplified Payments - One convenient monthly payment
      ✓ Lower Interest Rate - Potentially reduce overall interest
      ✓ Fixed Monthly Payment - Predictable budget planning
      ✓ Faster Debt Payoff - Clear path to debt freedom
      ✓ Improved Credit Score - Lower credit utilization
      ✓ Stress Reduction - Eliminate multiple creditors
      
      READY TO START SAVING?
      Call: (623) 280-8351
      Email: mdeshazo@mykoal.com
      Address: 4343 North Scottsdale Road, Suite 100, Scottsdale, AZ 85251
      
      Equal Housing Opportunity | NMLS# 1912347 | Company NMLS# 2524174
      Arizona Mortgage Banker License# 1048872
      
      ${PROFESSIONAL_SIGNATURE_TEXT}
    `
  }),

  debtConsolidationQuote: (data: any) => ({
    subject: `Your Debt Consolidation Analysis - Potential Monthly Savings: $${data.totalPayments - data.totalDebt}`,
    html: `
      <h2>Your Personalized Debt Consolidation Analysis</h2>
      <p>Hello,</p>
      <p>Here's your detailed debt consolidation analysis with potential savings breakdown:</p>
      
      <h3>Current Debt Summary</h3>
      <table style="border-collapse: collapse; width: 100%;">
        <tr style="background-color: #f8f9fa;">
          <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Creditor</th>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Balance</th>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Monthly Payment</th>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Type</th>
        </tr>
        ${data.debts.map((debt: any) => `
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">${debt.creditor}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">$${parseInt(debt.balance).toLocaleString()}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">$${parseInt(debt.currentPayment).toLocaleString()}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${debt.type}</td>
          </tr>
        `).join('')}
        <tr style="background-color: #e9ecef; font-weight: bold;">
          <td style="border: 1px solid #ddd; padding: 8px;">TOTALS</td>
          <td style="border: 1px solid #ddd; padding: 8px;">$${data.totalDebt.toLocaleString()}</td>
          <td style="border: 1px solid #ddd; padding: 8px;">$${data.totalPayments.toLocaleString()}</td>
          <td style="border: 1px solid #ddd; padding: 8px;">-</td>
        </tr>
      </table>
      
      <h3>Debt Consolidation Benefits</h3>
      <ul>
        <li><strong>Total Debt to Consolidate:</strong> $${data.totalDebt.toLocaleString()}</li>
        <li><strong>Current Monthly Payments:</strong> $${data.totalPayments.toLocaleString()}</li>
        <li><strong>Potential Monthly Savings:</strong> Lower consolidated payment could reduce your monthly obligations</li>
        <li><strong>Simplified Payments:</strong> One monthly payment instead of ${data.debts.length} separate payments</li>
        <li><strong>Potential Interest Savings:</strong> Lower interest rate could save thousands over the loan term</li>
      </ul>
      
      <h3>Next Steps</h3>
      <p>Contact me to discuss your personalized debt consolidation options:</p>
      
      <p>This analysis was generated on ${new Date().toLocaleString()}</p>
      ${PROFESSIONAL_SIGNATURE}
    `,
    text: `
      Your Personalized Debt Consolidation Analysis
      
      Current Debt Summary:
      ${data.debts.map((debt: any) => `
      ${debt.creditor}: $${parseInt(debt.balance).toLocaleString()} balance, $${parseInt(debt.currentPayment).toLocaleString()}/month (${debt.type})`).join('')}
      
      TOTALS: $${data.totalDebt.toLocaleString()} total debt, $${data.totalPayments.toLocaleString()} total monthly payments
      
      Debt Consolidation Benefits:
      • Total Debt to Consolidate: $${data.totalDebt.toLocaleString()}
      • Current Monthly Payments: $${data.totalPayments.toLocaleString()}
      • Simplified Payments: One monthly payment instead of ${data.debts.length} separate payments
      • Potential Interest Savings: Lower interest rate could save thousands over the loan term
      
      Next Steps:
      Contact me to discuss your personalized debt consolidation options:
      
      This analysis was generated on ${new Date().toLocaleString()}
      ${PROFESSIONAL_SIGNATURE_TEXT}
    `
  }),

  calculationResults: (data: any) => {
    // Safely extract values with defaults
    const inputs = data.inputs || {};
    const results = data.results || {};
    const savingsAnalysis = data.savingsAnalysis || null;
    
    return {
      subject: `Your ${data.calculationType === 'debt-consolidation' ? 'Debt Consolidation' : 'Mortgage'} Calculation Results`,
      html: `
        <h2>Your ${data.calculationType === 'debt-consolidation' ? 'Debt Consolidation' : 'Mortgage'} Analysis</h2>
        <p>Hello,</p>
        <p>Here are your detailed calculation results:</p>
        
        ${data.calculationType === 'debt-consolidation' && data.debts && data.debts.length > 0 ? `
        <h3>Current Debt Summary</h3>
        <table style="border-collapse: collapse; width: 100%; margin-bottom: 20px;">
          <tr style="background-color: #f8f9fa;">
            <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Creditor</th>
            <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Balance</th>
            <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Monthly Payment</th>
            <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Type</th>
          </tr>
          ${data.debts.map((debt: any) => `
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">${debt.creditor}</td>
              <td style="border: 1px solid #ddd; padding: 8px;">$${parseFloat(debt.balance || 0).toLocaleString()}</td>
              <td style="border: 1px solid #ddd; padding: 8px;">$${parseFloat(debt.currentPayment || 0).toLocaleString()}</td>
              <td style="border: 1px solid #ddd; padding: 8px;">${debt.type}</td>
            </tr>
          `).join('')}
          <tr style="background-color: #e9ecef; font-weight: bold;">
            <td style="border: 1px solid #ddd; padding: 8px;">TOTALS</td>
            <td style="border: 1px solid #ddd; padding: 8px;">$${(data.totalDebtBalance || 0).toLocaleString()}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">$${(data.totalMonthlyPayments || 0).toLocaleString()}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">-</td>
          </tr>
        </table>
        ` : ''}
        
        <h3>Loan Details</h3>
        <ul>
          <li><strong>Loan Amount:</strong> $${(inputs.loanAmount || 0).toLocaleString()}</li>
          <li><strong>Interest Rate:</strong> ${inputs.interestRate || 0}%</li>
          <li><strong>Loan Term:</strong> ${inputs.loanTerm || 30} years</li>
          ${inputs.extraPayment && inputs.extraPayment > 0 ? `<li><strong>Extra Monthly Payment:</strong> $${inputs.extraPayment.toLocaleString()}</li>` : ''}
        </ul>
        
        <h3>Payment Breakdown</h3>
        <ul>
          <li><strong>Principal & Interest:</strong> $${(results.monthlyPayment || 0).toLocaleString()}</li>
          ${inputs.propertyTax && inputs.propertyTax > 0 ? `<li><strong>Property Tax:</strong> $${inputs.propertyTax.toLocaleString()}</li>` : ''}
          ${inputs.propertyInsurance && inputs.propertyInsurance > 0 ? `<li><strong>Property Insurance:</strong> $${inputs.propertyInsurance.toLocaleString()}</li>` : ''}
          <li><strong>Total Monthly Payment:</strong> $${((results.monthlyPayment || 0) + (inputs.propertyTax || 0) + (inputs.propertyInsurance || 0)).toLocaleString()}</li>
        </ul>
        
        <h3>Loan Summary</h3>
        <ul>
          <li><strong>Total Interest:</strong> $${(results.totalInterest || 0).toLocaleString()}</li>
          <li><strong>Total Payments:</strong> $${(results.totalPayments || 0).toLocaleString()}</li>
          ${inputs.extraPayment && inputs.extraPayment > 0 && results.payoffTime ? `<li><strong>Payoff Time (with extra payments):</strong> ${Math.round(results.payoffTime)} months</li>` : ''}
          ${results.effectiveInterestRate && typeof results.effectiveInterestRate === 'number' && results.effectiveInterestRate !== inputs.interestRate ? `<li><strong>Effective Interest Rate:</strong> ${results.effectiveInterestRate.toFixed(2)}%</li>` : ''}
        </ul>
        
        ${savingsAnalysis ? `
        <h3>Savings Analysis</h3>
        <ul>
          <li><strong>Monthly Cash Flow Improvement:</strong> $${(savingsAnalysis.monthlySavings || 0).toLocaleString()}</li>
          <li><strong>Interest Savings Potential:</strong> $${(savingsAnalysis.interestSaved || 0).toLocaleString()}</li>
          ${savingsAnalysis.yearsEarlierPayoff && savingsAnalysis.yearsEarlierPayoff > 0 ? `<li><strong>Earlier Payoff:</strong> ${savingsAnalysis.yearsEarlierPayoff.toFixed(1)} years</li>` : ''}
        </ul>
        ` : ''}
        
        <h3>Next Steps</h3>
        <p>For personalized loan options and next steps, contact me:</p>
        
        <p>This calculation was generated on ${new Date().toLocaleString()}</p>
        ${PROFESSIONAL_SIGNATURE}
      `,
      text: `
        Your ${data.calculationType === 'debt-consolidation' ? 'Debt Consolidation' : 'Mortgage'} Analysis
        
        ${data.calculationType === 'debt-consolidation' && data.debts && data.debts.length > 0 ? `
        Current Debt Summary:
        ${data.debts.map((debt: any) => `
        ${debt.creditor}: $${parseFloat(debt.balance || 0).toLocaleString()} balance, $${parseFloat(debt.currentPayment || 0).toLocaleString()}/month (${debt.type})`).join('')}
        
        TOTALS: $${(data.totalDebtBalance || 0).toLocaleString()} total debt, $${(data.totalMonthlyPayments || 0).toLocaleString()} total monthly payments
        ` : ''}
        
        Loan Details:
        • Loan Amount: $${(inputs.loanAmount || 0).toLocaleString()}
        • Interest Rate: ${inputs.interestRate || 0}%
        • Loan Term: ${inputs.loanTerm || 30} years
        ${inputs.extraPayment && inputs.extraPayment > 0 ? `• Extra Monthly Payment: $${inputs.extraPayment.toLocaleString()}` : ''}
        
        Payment Breakdown:
        • Principal & Interest: $${(results.monthlyPayment || 0).toLocaleString()}
        ${inputs.propertyTax && inputs.propertyTax > 0 ? `• Property Tax: $${inputs.propertyTax.toLocaleString()}` : ''}
        ${inputs.propertyInsurance && inputs.propertyInsurance > 0 ? `• Property Insurance: $${inputs.propertyInsurance.toLocaleString()}` : ''}
        • Total Monthly Payment: $${((results.monthlyPayment || 0) + (inputs.propertyTax || 0) + (inputs.propertyInsurance || 0)).toLocaleString()}
        
        Loan Summary:
        • Total Interest: $${(results.totalInterest || 0).toLocaleString()}
        • Total Payments: $${(results.totalPayments || 0).toLocaleString()}
        ${inputs.extraPayment && inputs.extraPayment > 0 && results.payoffTime ? `• Payoff Time (with extra payments): ${Math.round(results.payoffTime)} months` : ''}
        ${results.effectiveInterestRate && typeof results.effectiveInterestRate === 'number' && results.effectiveInterestRate !== inputs.interestRate ? `• Effective Interest Rate: ${results.effectiveInterestRate.toFixed(2)}%` : ''}
        
        ${savingsAnalysis ? `
        Savings Analysis:
        • Monthly Cash Flow Improvement: $${(savingsAnalysis.monthlySavings || 0).toLocaleString()}
        • Interest Savings Potential: $${(savingsAnalysis.interestSaved || 0).toLocaleString()}
        ${savingsAnalysis.yearsEarlierPayoff && savingsAnalysis.yearsEarlierPayoff > 0 ? `• Earlier Payoff: ${savingsAnalysis.yearsEarlierPayoff.toFixed(1)} years` : ''}
        ` : ''}
        
        Next Steps:
        For personalized loan options and next steps, contact me:
        
        This calculation was generated on ${new Date().toLocaleString()}
        ${PROFESSIONAL_SIGNATURE_TEXT}
      `
    };
  }
};