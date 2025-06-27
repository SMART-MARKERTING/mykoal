import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertQuickQuoteSchema, insertPreQualificationSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contacts", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      
      // Here you would typically send an email notification
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

  // Quick quote submission
  app.post("/api/quick-quotes", async (req, res) => {
    try {
      const validatedData = insertQuickQuoteSchema.parse(req.body);
      const quote = await storage.createQuickQuote(validatedData);
      
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

  const httpServer = createServer(app);
  return httpServer;
}
