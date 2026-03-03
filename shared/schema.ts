import { pgTable, text, serial, integer, timestamp, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  loanType: text("loan_type").notNull(),
  timeline: text("timeline").notNull(),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const quickQuotes = pgTable("quick_quotes", {
  id: serial("id").primaryKey(),
  loanAmount: decimal("loan_amount", { precision: 12, scale: 2 }).notNull(),
  creditScore: text("credit_score").notNull(),
  propertyType: text("property_type").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  category: text("category").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  imageUrl: text("image_url"),
  publishedAt: timestamp("published_at").defaultNow().notNull(),
});

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  content: text("content").notNull(),
  rating: integer("rating").notNull(),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const preQualifications = pgTable("pre_qualifications", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  dateOfBirth: text("date_of_birth"),
  ssn: text("ssn"),
  annualIncome: decimal("annual_income", { precision: 12, scale: 2 }),
  employmentType: text("employment_type"),
  employmentLength: text("employment_length"),
  creditScore: text("credit_score"),
  monthlyDebt: decimal("monthly_debt", { precision: 12, scale: 2 }),
  assets: decimal("assets", { precision: 12, scale: 2 }),
  loanType: text("loan_type").notNull(),
  loanAmount: decimal("loan_amount", { precision: 12, scale: 2 }).notNull(),
  propertyValue: decimal("property_value", { precision: 12, scale: 2 }),
  propertyType: text("property_type"),
  downPayment: decimal("down_payment", { precision: 12, scale: 2 }),
  bankruptcyHistory: text("bankruptcy_history"),
  notes: text("notes"),
  qualificationStatus: text("qualification_status").notNull(),
  qualificationScore: integer("qualification_score").notNull(),
  estimatedRate: text("estimated_rate"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const marketSubscriptions = pgTable("market_subscriptions", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  status: text("status").notNull().default("active"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertContactSchema = createInsertSchema(contacts).omit({
  id: true,
  createdAt: true,
});

export const insertQuickQuoteSchema = createInsertSchema(quickQuotes).omit({
  id: true,
  createdAt: true,
});

export const insertPreQualificationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(1, "Phone number is required"),
  loanType: z.string().min(1, "Loan type is required"),
  loanAmount: z.string().min(1, "Loan amount is required"),
  // Optional fields that were removed from the form
  annualIncome: z.string().nullish(),
  employmentType: z.string().nullish(),
  creditScore: z.string().nullish(),
  dateOfBirth: z.string().optional().nullable(),
  ssn: z.string().optional().nullable(),
  employmentLength: z.string().optional().nullable(),
  monthlyDebt: z.string().optional().nullable(),
  assets: z.string().optional().nullable(),
  propertyValue: z.string().optional().nullable(),
  propertyType: z.string().optional().nullable(),
  downPayment: z.string().optional().nullable(),
  bankruptcyHistory: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  estimatedRate: z.string().optional().nullable(),
});

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  lastName: text("last_name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertLeadSchema = createInsertSchema(leads).omit({
  id: true,
  createdAt: true,
});

export const insertMarketSubscriptionSchema = createInsertSchema(marketSubscriptions).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type Contact = typeof contacts.$inferSelect;
export type InsertContact = z.infer<typeof insertContactSchema>;
export type QuickQuote = typeof quickQuotes.$inferSelect;
export type InsertQuickQuote = z.infer<typeof insertQuickQuoteSchema>;
export type PreQualification = typeof preQualifications.$inferSelect;
export type InsertPreQualification = z.infer<typeof insertPreQualificationSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;
export type Testimonial = typeof testimonials.$inferSelect;
export type MarketSubscription = typeof marketSubscriptions.$inferSelect;
export type InsertMarketSubscription = z.infer<typeof insertMarketSubscriptionSchema>;
export type Lead = typeof leads.$inferSelect;
export type InsertLead = z.infer<typeof insertLeadSchema>;
