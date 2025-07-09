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
  <p><strong>Mykoal DeShazo</strong><br>
  Executive Loan Officer, NMLS# 1912347<br>
  <a href="https://www.experience.com/mykoal-deshazo" style="color: #0066cc;">CLICK TO SEE MY REVIEWS</a></p>
  
  <p><strong>Phone:</strong> (623) 280-8351 (Direct)<br>
  <strong>Fax:</strong> (602) 362-5286 (FAX)<br>
  <strong>Email:</strong> <a href="mailto:mdeshazo@independencehl.com" style="color: #0066cc;">mdeshazo@independencehl.com</a><br>
  <strong>Website:</strong> <a href="#" style="color: #0066cc;">Apply now here</a><br>
  <strong>Address:</strong> 4343 North Scottsdale Road, Suite 100, Scottsdale, AZ 85251</p>
  
  <p><strong>UWM Breakthrough Award Winner - 2023</strong></p>
  
  <p><strong>Company NMLS# 2524174</strong> - For licensing information, go to: <a href="https://www.nmlsconsumeraccess.org" style="color: #0066cc;">www.nmlsconsumeraccess.org</a><br>
  <strong>Arizona Mortgage Banker License# 1048872</strong><br>
  4343 North Scottsdale Road, Suite 100, Scottsdale, AZ 85251</p>
  
  <p style="font-size: 11px; color: #888;">This is not a commitment to lend. The contents of this message may be confidential. If you are not the intended recipient, do not disseminate, disclose, copy or use this message without the permission of the author. Nothing contained in this message or in any attachment shall satisfy the requirements for a writing, and nothing contained herein shall constitute a contract or electronic signature. If this message has been received in error, please delete it immediately.</p>
</div>
`;

const PROFESSIONAL_SIGNATURE_TEXT = `

---
Mykoal DeShazo
Executive Loan Officer, NMLS# 1912347
CLICK TO SEE MY REVIEWS: https://www.experience.com/mykoal-deshazo

Phone: (623) 280-8351 (Direct)
Fax: (602) 362-5286 (FAX)
Email: mdeshazo@independencehl.com
Website: Apply now here
Address: 4343 North Scottsdale Road, Suite 100, Scottsdale, AZ 85251

UWM Breakthrough Award Winner - 2023

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
      response: error.response?.body
    });
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