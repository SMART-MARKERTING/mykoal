import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertQuickQuoteSchema, insertPreQualificationSchema, insertMarketSubscriptionSchema } from "@shared/schema";
import { z } from "zod";
import { sendEmail, sendNotificationEmail, emailTemplates, FROM_EMAIL } from "./email";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contacts", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      
      // Send email notification
      const emailTemplate = emailTemplates.newContact(contact);
      await sendNotificationEmail(emailTemplate);
      console.log("New contact submission:", contact);
      
      res.json({ success: true, contact });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.errors 
        });
      } else {
        console.error("Error creating contact:", error);
        res.status(500).json({ 
          success: false, 
          message: "Internal server error" 
        });
      }
    }
  });

  // Get all contacts (for admin purposes)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      res.status(500).json({ 
        success: false, 
        message: "Internal server error" 
      });
    }
  });

  // Quick quote submission
  app.post("/api/quick-quotes", async (req, res) => {
    try {
      const validatedData = insertQuickQuoteSchema.parse(req.body);
      const quote = await storage.createQuickQuote(validatedData);
      
      // Send notification email to business
      const emailTemplate = emailTemplates.newQuickQuote(quote);
      await sendNotificationEmail(emailTemplate);
      
      // Send auto-reply email to customer
      const customerEmailTemplate = emailTemplates.quickQuoteAutoReply(quote);
      await sendEmail({
        to: quote.email,
        from: FROM_EMAIL,
        subject: customerEmailTemplate.subject,
        text: customerEmailTemplate.text,
        html: customerEmailTemplate.html,
      });
      
      console.log("New quick quote submission:", quote);
      
      res.json({ success: true, quote });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.errors 
        });
      } else {
        console.error("Error creating quick quote:", error);
        res.status(500).json({ 
          success: false, 
          message: "Internal server error" 
        });
      }
    }
  });

  // Get all quick quotes (for admin purposes)
  app.get("/api/quick-quotes", async (req, res) => {
    try {
      const quotes = await storage.getQuickQuotes();
      res.json(quotes);
    } catch (error) {
      console.error("Error fetching quick quotes:", error);
      res.status(500).json({ 
        success: false, 
        message: "Internal server error" 
      });
    }
  });

  // Get all contacts (for admin purposes)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      res.status(500).json({ 
        success: false, 
        message: "Internal server error" 
      });
    }
  });

  // Get all quick quotes (for admin purposes)
  app.get("/api/quick-quotes", async (req, res) => {
    try {
      const quotes = await storage.getQuickQuotes();
      res.json(quotes);
    } catch (error) {
      console.error("Error fetching quick quotes:", error);
      res.status(500).json({ 
        success: false, 
        message: "Internal server error" 
      });
    }
  });

  // Pre-qualification application submission
  app.post("/api/pre-qualifications", async (req, res) => {
    try {
      // Set defaults for removed sensitive fields before validation
      const requestData = {
        ...req.body,
        annualIncome: req.body.annualIncome || null,
        employmentType: req.body.employmentType || null,
        creditScore: req.body.creditScore || null,
      };
      
      const validatedData = insertPreQualificationSchema.parse(requestData);
      const preQualification = await storage.createPreQualification(validatedData);
      
      // Send email notification
      const emailTemplate = emailTemplates.newPreQualification(preQualification);
      await sendNotificationEmail(emailTemplate);
      console.log("New pre-qualification submission:", preQualification);
      
      res.json({ success: true, preQualification });
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error("Validation errors:", error.errors);
        res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.errors 
        });
      } else {
        console.error("Error creating pre-qualification:", error);
        res.status(500).json({ 
          success: false, 
          message: "Internal server error" 
        });
      }
    }
  });

  // Get all pre-qualifications (for admin purposes)
  app.get("/api/pre-qualifications", async (req, res) => {
    try {
      const preQualifications = await storage.getPreQualifications();
      res.json(preQualifications);
    } catch (error) {
      console.error("Error fetching pre-qualifications:", error);
      res.status(500).json({ 
        success: false, 
        message: "Internal server error" 
      });
    }
  });

  // Get blog posts
  app.get("/api/blog-posts", async (req, res) => {
    try {
      const posts = await storage.getBlogPosts();
      res.json(posts);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      res.status(500).json({ 
        success: false, 
        message: "Internal server error" 
      });
    }
  });

  // Get single blog post
  app.get("/api/blog-posts/:slug", async (req, res) => {
    try {
      const post = await storage.getBlogPost(req.params.slug);
      if (!post) {
        res.status(404).json({ 
          success: false, 
          message: "Blog post not found" 
        });
        return;
      }
      res.json(post);
    } catch (error) {
      console.error("Error fetching blog post:", error);
      res.status(500).json({ 
        success: false, 
        message: "Internal server error" 
      });
    }
  });

  // Get testimonials
  app.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      res.status(500).json({ 
        success: false, 
        message: "Internal server error" 
      });
    }
  });

  // Market updates
  app.get("/api/market-updates", async (req, res) => {
    try {
      const marketData = await storage.getMarketUpdates();
      res.json(marketData);
    } catch (error) {
      console.error("Market updates error:", error);
      res.status(503).json({ 
        error: "Market data sources temporarily unavailable",
        message: "Please check back in a few minutes for the latest rates and news"
      });
    }
  });

  // Market subscription (handle both singular and plural routes)
  const handleMarketSubscription = async (req: Request, res: Response) => {
    try {
      const validatedData = insertMarketSubscriptionSchema.parse(req.body);
      const subscription = await storage.createMarketSubscription(validatedData);
      
      // Send email notification
      try {
        const emailTemplate = emailTemplates.newMarketSubscription(subscription);
        await sendNotificationEmail(emailTemplate);
        console.log("New market subscription:", subscription);
      } catch (emailError) {
        console.error("Email notification failed:", emailError);
        // Continue without failing the subscription
      }
      
      res.json({ success: true, subscription });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.errors 
        });
      } else {
        console.error("Error creating market subscription:", error);
        
        // Handle duplicate email error specifically
        const errorString = JSON.stringify(error);
        const errorCode = (error as any)?.code;
        const errorMessage = (error as any)?.message || '';
        
        if (errorCode === '23505' || 
            errorString.includes('23505') || 
            errorString.includes('duplicate key') || 
            errorString.includes('already exists') ||
            errorMessage.includes('duplicate key') || 
            errorMessage.includes('already exists')) {
          res.status(200).json({ 
            success: true, 
            message: "You're already subscribed to market updates!" 
          });
        } else {
          res.status(500).json({ 
            success: false, 
            message: "Failed to create subscription" 
          });
        }
      }
    }
  };
  
  app.post("/api/market-subscription", handleMarketSubscription);
  app.post("/api/market-subscriptions", handleMarketSubscription);

  // Email debt consolidation quote
  app.post("/api/email-debt-quote", async (req, res) => {
    try {
      const { email, debts, totalDebt, totalPayments } = req.body;
      
      // Send comprehensive debt consolidation page analysis to user
      const userEmailTemplate = emailTemplates.debtConsolidationPageEmail({
        debts,
        totalDebt,
        totalMonthlyPayments: totalPayments,
        monthlyPayment: totalDebt * 0.08 / 12, // Estimated monthly payment
        totalPayments: totalDebt * 1.3, // Estimated total payments over loan term
        totalInterest: totalDebt * 0.3, // Estimated total interest
        interestRate: 8.0,
        loanTerm: 7
      });
      
      await sendEmail({
        to: email,
        from: "mdeshazo@mykoal.com",
        subject: userEmailTemplate.subject,
        html: userEmailTemplate.html,
        text: userEmailTemplate.text,
      });

      // Send notification to Mykoal
      const notificationTemplate = {
        subject: `Debt Consolidation Quote Request: ${email} - $${totalDebt.toLocaleString()}`,
        html: `
          <h2>New Debt Consolidation Quote Request</h2>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Total Debt:</strong> $${totalDebt.toLocaleString()}</p>
          <p><strong>Total Monthly Payments:</strong> $${totalPayments.toLocaleString()}</p>
          <p><strong>Number of Debts:</strong> ${debts.length}</p>
          
          <h3>Individual Debt Details:</h3>
          <table style="border-collapse: collapse; width: 100%; margin: 20px 0;">
            <tr style="background-color: #f8f9fa;">
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Creditor</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Balance</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Monthly Payment</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Type</th>
            </tr>
            ${debts.map((debt: any) => `
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">${debt.creditor}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">$${parseInt(debt.balance).toLocaleString()}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">$${parseInt(debt.currentPayment).toLocaleString()}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${debt.type}</td>
              </tr>
            `).join('')}
            <tr style="background-color: #e9ecef; font-weight: bold;">
              <td style="border: 1px solid #ddd; padding: 8px;">TOTALS</td>
              <td style="border: 1px solid #ddd; padding: 8px;">$${totalDebt.toLocaleString()}</td>
              <td style="border: 1px solid #ddd; padding: 8px;">$${totalPayments.toLocaleString()}</td>
              <td style="border: 1px solid #ddd; padding: 8px;">-</td>
            </tr>
          </table>
          
          <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
        `,
        text: `
          New Debt Consolidation Quote Request
          
          Email: ${email}
          Total Debt: $${totalDebt.toLocaleString()}
          Total Monthly Payments: $${totalPayments.toLocaleString()}
          Number of Debts: ${debts.length}
          
          Individual Debt Details:
          ${debts.map((debt: any) => `
          ${debt.creditor}: $${parseInt(debt.balance).toLocaleString()} balance, $${parseInt(debt.currentPayment).toLocaleString()}/month (${debt.type})`).join('')}
          
          TOTALS: $${totalDebt.toLocaleString()} total debt, $${totalPayments.toLocaleString()} total monthly payments
          
          Submitted: ${new Date().toLocaleString()}
        `
      };
      
      try {
        await sendNotificationEmail(notificationTemplate);
      } catch (emailError) {
        console.error("Email notification failed:", emailError);
        // Continue without failing the request
      }
      
      res.json({ success: true, message: "Complete debt consolidation analysis sent successfully" });
    } catch (error: any) {
      console.error("Error sending debt consolidation quote:", error);
      res.status(500).json({ 
        success: false, 
        message: error.message || "Failed to send quote" 
      });
    }
  });

  // Email calculation results
  app.post("/api/email-calculation", async (req, res) => {
    try {
      const { email, calculationType, inputs, results, savingsAnalysis, totalDebtBalance, totalMonthlyPayments, debts } = req.body;
      
      let userEmailTemplate;
      
      if (calculationType === 'debt-consolidation') {
        // Send comprehensive debt consolidation page for debt consolidation
        userEmailTemplate = emailTemplates.debtConsolidationPageEmail({
          debts: debts || [],
          totalDebt: totalDebtBalance || 0,
          totalMonthlyPayments: totalMonthlyPayments || 0,
          monthlyPayment: results?.monthlyPayment || 0,
          totalPayments: results?.totalPayments || 0,
          totalInterest: results?.totalInterest || 0,
          interestRate: inputs?.interestRate || 8.0,
          loanTerm: inputs?.loanTerm || 7
        });
      } else {
        // Send detailed calculation results for other calculators
        userEmailTemplate = emailTemplates.calculationResults({
          calculationType,
          inputs,
          results,
          savingsAnalysis,
          totalDebtBalance,
          totalMonthlyPayments
        });
      }
      
      await sendEmail({
        to: email,
        from: "mdeshazo@mykoal.com",
        subject: userEmailTemplate.subject,
        html: userEmailTemplate.html,
        text: userEmailTemplate.text,
      });

      // Send notification to Mykoal
      const notificationTemplate = {
        subject: `${calculationType === 'debt-consolidation' ? 'Debt Consolidation' : 'Mortgage'} Calculation Request: ${email}`,
        html: `
          <h2>New Calculation Results Request</h2>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Calculation Type:</strong> ${calculationType}</p>
          <p><strong>Loan Amount:</strong> $${inputs.loanAmount.toLocaleString()}</p>
          <p><strong>Interest Rate:</strong> ${inputs.interestRate}%</p>
          <p><strong>Monthly Payment:</strong> $${results.monthlyPayment.toLocaleString()}</p>
          <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
        `,
        text: `
          New Calculation Results Request
          
          Email: ${email}
          Calculation Type: ${calculationType}
          Loan Amount: $${inputs.loanAmount.toLocaleString()}
          Interest Rate: ${inputs.interestRate}%
          Monthly Payment: $${results.monthlyPayment.toLocaleString()}
          Submitted: ${new Date().toLocaleString()}
        `
      };
      
      try {
        await sendNotificationEmail(notificationTemplate);
      } catch (emailError) {
        console.error("Email notification failed:", emailError);
        // Continue without failing the request
      }
      
      res.json({ success: true, message: "Calculation results sent successfully" });
    } catch (error: any) {
      console.error("Error sending calculation results:", error);
      res.status(500).json({ 
        success: false, 
        message: error.message || "Failed to send calculation results" 
      });
    }
  });

  // Get all market subscriptions (for admin purposes)
  app.get("/api/market-subscriptions", async (req, res) => {
    try {
      const subscriptions = await storage.getMarketSubscriptions();
      res.json(subscriptions);
    } catch (error) {
      console.error("Error fetching market subscriptions:", error);
      res.status(500).json({ 
        success: false, 
        message: "Internal server error" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
