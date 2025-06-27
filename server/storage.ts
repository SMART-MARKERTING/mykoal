import { 
  contacts, 
  quickQuotes, 
  blogPosts, 
  testimonials,
  preQualifications,
  type Contact, 
  type InsertContact,
  type QuickQuote,
  type InsertQuickQuote,
  type PreQualification,
  type InsertPreQualification,
  type BlogPost,
  type Testimonial
} from "@shared/schema";

export interface IStorage {
  // Contact management
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  
  // Quick quotes
  createQuickQuote(quote: InsertQuickQuote): Promise<QuickQuote>;
  getQuickQuotes(): Promise<QuickQuote[]>;
  
  // Pre-qualifications
  createPreQualification(preQual: InsertPreQualification): Promise<PreQualification>;
  getPreQualifications(): Promise<PreQualification[]>;
  
  // Blog posts
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(slug: string): Promise<BlogPost | undefined>;
  
  // Testimonials
  getTestimonials(): Promise<Testimonial[]>;
  
  // Market updates
  getMarketUpdates(): Promise<MarketData>;
  generateMarketInsights(news: NewsItem[], rates: any): Promise<MarketInsight[]>;
}

interface NewsItem {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  source: string;
  category: 'rates' | 'regulation' | 'market' | 'mbs';
}

interface MarketInsight {
  id: string;
  title: string;
  content: string;
  rateImpact: 'positive' | 'negative' | 'neutral';
  urgency: 'low' | 'medium' | 'high';
  relatedNews: string;
}

interface MarketData {
  currentRates: {
    thirtyYear: number;
    fifteenYear: number;
    jumbo: number;
    lastUpdated: string;
  };
  news: NewsItem[];
  insights: MarketInsight[];
  mbsData: {
    price: number;
    yield: number;
    change: number;
    lastUpdated: string;
  };
}

export class MemStorage implements IStorage {
  private contacts: Map<number, Contact>;
  private quickQuotes: Map<number, QuickQuote>;
  private preQualifications: Map<number, PreQualification>;
  private blogPosts: Map<number, BlogPost>;
  private testimonials: Map<number, Testimonial>;
  private currentContactId: number;
  private currentQuoteId: number;
  private currentPreQualId: number;
  private currentBlogId: number;
  private currentTestimonialId: number;

  constructor() {
    this.contacts = new Map();
    this.quickQuotes = new Map();
    this.preQualifications = new Map();
    this.blogPosts = new Map();
    this.testimonials = new Map();
    this.currentContactId = 1;
    this.currentQuoteId = 1;
    this.currentPreQualId = 1;
    this.currentBlogId = 1;
    this.currentTestimonialId = 1;

    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Sample blog posts
    const sampleBlogPosts: BlogPost[] = [
      {
        id: this.currentBlogId++,
        title: "First-Time Homebuyer Guide: Everything You Need to Know",
        slug: "first-time-homebuyer-guide",
        category: "First-Time Buyers",
        excerpt: "Learn about down payment assistance programs, credit requirements, and the step-by-step process...",
        content: "Complete guide content here...",
        imageUrl: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        publishedAt: new Date("2024-12-15"),
      },
      {
        id: this.currentBlogId++,
        title: "When Should You Refinance Your Mortgage?",
        slug: "when-to-refinance-mortgage",
        category: "Refinancing",
        excerpt: "Discover the key factors that determine if refinancing is right for you and how much you could save...",
        content: "Complete refinancing guide content here...",
        imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        publishedAt: new Date("2024-12-12"),
      },
      {
        id: this.currentBlogId++,
        title: "2024 Housing Market Forecast: What to Expect",
        slug: "2024-housing-market-forecast",
        category: "Market Update",
        excerpt: "Our expert analysis of current market trends, interest rate predictions, and timing strategies...",
        content: "Complete market forecast content here...",
        imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
        publishedAt: new Date("2024-12-10"),
      },
    ];

    // Sample testimonials
    const sampleTestimonials: Testimonial[] = [
      {
        id: this.currentTestimonialId++,
        name: "Mike & Jessica Chen",
        role: "First-time Homebuyers",
        content: "Sarah made our first home purchase so easy! She explained everything clearly and got us the best rate possible. We closed in just 3 weeks!",
        rating: 5,
        imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        createdAt: new Date(),
      },
      {
        id: this.currentTestimonialId++,
        name: "Robert Martinez",
        role: "Refinance Client",
        content: "Refinancing saved us $400 per month! The process was smooth and Sarah kept us informed every step of the way. Highly recommend!",
        rating: 5,
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        createdAt: new Date(),
      },
      {
        id: this.currentTestimonialId++,
        name: "James Thompson",
        role: "VA Loan Client",
        content: "As a veteran, Sarah helped us navigate the VA loan process perfectly. Zero down payment and great service throughout!",
        rating: 5,
        imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100",
        createdAt: new Date(),
      },
    ];

    sampleBlogPosts.forEach(post => this.blogPosts.set(post.id, post));
    sampleTestimonials.forEach(testimonial => this.testimonials.set(testimonial.id, testimonial));
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = this.currentContactId++;
    const contact: Contact = {
      ...insertContact,
      message: insertContact.message || null,
      id,
      createdAt: new Date(),
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values()).sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async createQuickQuote(insertQuote: InsertQuickQuote): Promise<QuickQuote> {
    const id = this.currentQuoteId++;
    const quote: QuickQuote = {
      ...insertQuote,
      id,
      createdAt: new Date(),
    };
    this.quickQuotes.set(id, quote);
    return quote;
  }

  async getQuickQuotes(): Promise<QuickQuote[]> {
    return Array.from(this.quickQuotes.values()).sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async createPreQualification(insertPreQual: InsertPreQualification): Promise<PreQualification> {
    const id = this.currentPreQualId++;
    
    // Calculate qualification score and status
    const loanAmount = parseFloat(insertPreQual.loanAmount || "0");
    const score = Math.min(100, Math.max(0, 85 - (loanAmount > 500000 ? 10 : 0)));
    const status = score >= 70 ? 'qualified' : score >= 50 ? 'conditional' : 'not-qualified';
    
    const preQual: PreQualification = {
      id,
      firstName: insertPreQual.firstName,
      lastName: insertPreQual.lastName,
      email: insertPreQual.email,
      phone: insertPreQual.phone,
      loanType: insertPreQual.loanType,
      loanAmount: insertPreQual.loanAmount,
      // Provide defaults for removed sensitive fields
      annualIncome: "0", // Will be collected during actual application
      employmentType: "To be determined", // Will be collected during actual application  
      creditScore: "To be determined", // Will be collected during actual application
      qualificationStatus: status,
      qualificationScore: score,
      dateOfBirth: insertPreQual.dateOfBirth || null,
      ssn: insertPreQual.ssn || null,
      employmentLength: insertPreQual.employmentLength || null,
      monthlyDebt: insertPreQual.monthlyDebt || null,
      assets: insertPreQual.assets || null,
      propertyValue: insertPreQual.propertyValue || null,
      propertyType: insertPreQual.propertyType || null,
      downPayment: insertPreQual.downPayment || null,
      bankruptcyHistory: insertPreQual.bankruptcyHistory || null,
      notes: insertPreQual.notes || null,
      estimatedRate: insertPreQual.estimatedRate || null,
      createdAt: new Date(),
    };
    this.preQualifications.set(id, preQual);
    return preQual;
  }

  async getPreQualifications(): Promise<PreQualification[]> {
    return Array.from(this.preQualifications.values()).sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values()).sort((a, b) => 
      b.publishedAt.getTime() - a.publishedAt.getTime()
    );
  }

  async getBlogPost(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find(post => post.slug === slug);
  }

  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values()).sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getMarketUpdates(): Promise<MarketData> {
    try {
      // Fetch current mortgage rates from multiple sources
      const ratesData = await this.fetchCurrentRates();
      
      // Fetch latest news from RSS feeds
      const newsData = await this.fetchMarketNews();
      
      // MBS data is optional for now
      const mbsData = {
        price: 0,
        yield: 0,
        change: 0,
        lastUpdated: new Date().toISOString()
      };
      
      // Generate AI insights based on news and current rates
      const insights = await this.generateMarketInsights(newsData, ratesData);

      return {
        currentRates: ratesData,
        news: newsData,
        insights: insights,
        mbsData: mbsData
      };
    } catch (error) {
      console.error('Error fetching market updates:', error);
      // Return fallback data structure when rates fail
      return {
        currentRates: {
          thirtyYear: 0,
          fifteenYear: 0,
          jumbo: 0,
          lastUpdated: new Date().toISOString()
        },
        news: [],
        insights: [],
        mbsData: {
          price: 0,
          yield: 0,
          change: 0,
          lastUpdated: new Date().toISOString()
        }
      };
    }
  }

  private async fetchCurrentRates() {
    try {
      // Use FRED API for current mortgage rates
      const fredApiKey = process.env.FRED_API_KEY;
      console.log('FRED API Key available:', !!fredApiKey);
      
      if (!fredApiKey) {
        console.log('No FRED API key, falling back to Freddie Mac');
        // When no API key is available, fetch from Freddie Mac's public data
        const freddieRates = await this.fetchFreddieRates();
        return freddieRates;
      }
      
      const thirtyYearSeries = 'MORTGAGE30US';
      const fifteenYearSeries = 'MORTGAGE15US';
      
      const [thirtyYear, fifteenYear] = await Promise.all([
        this.fetchFredData(thirtyYearSeries, fredApiKey),
        this.fetchFredData(fifteenYearSeries, fredApiKey)
      ]);
      
      console.log('Final rate values:', { thirtyYear, fifteenYear });
      
      const rates = {
        thirtyYear: thirtyYear || 6.84,
        fifteenYear: fifteenYear || 6.12,
        jumbo: (thirtyYear || 6.84) + 0.25,
        lastUpdated: new Date().toISOString()
      };
      
      console.log('Returning rates object:', rates);
      return rates;
    } catch (error) {
      console.error('Error fetching rates:', error);
      // Fallback to Freddie Mac data
      return await this.fetchFreddieRates();
    }
  }

  private async fetchFreddieRates() {
    try {
      // Fetch from Freddie Mac's public RSS feed
      const response = await fetch('https://www.freddiemac.com/pmms/pmms_archives');
      if (response.ok) {
        // Parse the latest rates from Freddie Mac
        const text = await response.text();
        
        // Extract current rates from the HTML content
        const thirtyYearMatch = text.match(/30-Year Fixed Rate Mortgage.*?(\d+\.\d+)%/i);
        const fifteenYearMatch = text.match(/15-Year Fixed Rate Mortgage.*?(\d+\.\d+)%/i);
        
        const thirtyYear = thirtyYearMatch ? parseFloat(thirtyYearMatch[1]) : 6.84;
        const fifteenYear = fifteenYearMatch ? parseFloat(fifteenYearMatch[1]) : 6.12;
        
        return {
          thirtyYear,
          fifteenYear,
          jumbo: thirtyYear + 0.25,
          lastUpdated: new Date().toISOString()
        };
      }
      
      throw new Error('Unable to fetch Freddie Mac rates');
    } catch (error) {
      console.error('Error fetching Freddie Mac rates:', error);
      throw new Error('Rate data temporarily unavailable - please check back shortly');
    }
  }

  private async fetchFredData(seriesId: string, apiKey?: string): Promise<number | null> {
    if (!apiKey) {
      console.log(`No API key provided for ${seriesId}`);
      return null;
    }
    
    try {
      const url = `https://api.stlouisfed.org/fred/series/observations?series_id=${seriesId}&api_key=${apiKey}&file_type=json&limit=1&sort_order=desc`;
      console.log(`Fetching FRED data from: ${url}`);
      const response = await fetch(url);
      const data = await response.json();
      
      console.log(`FRED response for ${seriesId}:`, JSON.stringify(data, null, 2));
      
      if (data.observations && data.observations.length > 0) {
        const value = parseFloat(data.observations[0].value);
        console.log(`Parsed value for ${seriesId}: ${value}`);
        return value;
      }
      console.log(`No observations found for ${seriesId}`);
      return null;
    } catch (error) {
      console.error(`Error fetching FRED data for ${seriesId}:`, error);
      return null;
    }
  }

  private async fetchMarketNews(): Promise<NewsItem[]> {
    try {
      const newsItems: NewsItem[] = [];
      
      // Fetch from FOX Business RSS feed
      const foxBusinessNews = await this.fetchRSSFeed('https://moxie.foxbusiness.com/google-publisher/real-estate.xml', 'FOX Business');
      newsItems.push(...foxBusinessNews);
      
      // Sort by date and return top 3 most recent
      return newsItems
        .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
        .slice(0, 3);
    } catch (error) {
      console.error('Error fetching market news:', error);
      return [];
    }
  }

  private async fetchRSSFeed(rssUrl: string, sourceName: string): Promise<NewsItem[]> {
    try {
      // Convert RSS to JSON using rss2json API
      const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}&api_key=${process.env.RSS2JSON_API_KEY || ''}&count=10`;
      
      const response = await fetch(apiUrl);
      const data = await response.json();
      
      if (data.status === 'ok' && data.items) {
        return data.items.map((item: any) => ({
          title: item.title,
          description: item.description?.replace(/<[^>]*>/g, '').substring(0, 200) + '...',
          url: item.link,
          publishedAt: item.pubDate,
          source: sourceName,
          category: this.categorizeNews(item.title + ' ' + item.description)
        }));
      }
      return [];
    } catch (error) {
      console.error(`Error fetching RSS feed ${rssUrl}:`, error);
      return [];
    }
  }

  private categorizeNews(content: string): 'rates' | 'regulation' | 'market' | 'mbs' {
    const lowerContent = content.toLowerCase();
    
    if (lowerContent.includes('rate') || lowerContent.includes('mortgage rate') || lowerContent.includes('interest rate')) {
      return 'rates';
    } else if (lowerContent.includes('regulation') || lowerContent.includes('federal') || lowerContent.includes('policy')) {
      return 'regulation';
    } else if (lowerContent.includes('mbs') || lowerContent.includes('mortgage-backed') || lowerContent.includes('securities')) {
      return 'mbs';
    } else {
      return 'market';
    }
  }

  async generateMarketInsights(news: NewsItem[], rates: any): Promise<MarketInsight[]> {
    const insights: MarketInsight[] = [];

    // Generate insights for each news item
    news.forEach((article, index) => {
      const title = article.title.toLowerCase();
      const description = article.description.toLowerCase();
      
      let insight: MarketInsight;

      // Housing affordability crisis - focus on market opportunity
      if (title.includes('housing crisis') || title.includes('affordability') || description.includes('30% of income')) {
        insight = {
          id: `insight-${index + 1}`,
          title: "Affordability Crisis Creates Investment Opportunities",
          content: `The affordability challenge in 47 metro areas signals a shift toward rental demand. This presents strong opportunities for investment properties, especially in markets where homeownership becomes less accessible. Current ${rates.thirtyYear}% rates are reasonable for cash-flowing rental properties. Consider markets with strong rental yields and employment growth.`,
          rateImpact: 'neutral',
          urgency: 'medium',
          relatedNews: article.title
        };
      }
      // Buyer-friendly markets - only rate lock mention
      else if (title.includes('buyer-friendly') || title.includes('price cuts') || description.includes('inventory')) {
        insight = {
          id: `insight-${index + 1}`,
          title: "Buyer-Friendly Markets: Timing and Rate Strategy",
          content: `Markets with price cuts and increased inventory create negotiating power for investors. With current ${rates.thirtyYear}% rates, this may be an optimal time to secure financing and make strategic acquisitions. Consider getting pre-approved to move quickly when the right property emerges. These market conditions typically don't last long.`,
          rateImpact: 'positive',
          urgency: 'high',
          relatedNews: article.title
        };
      }
      // Investor activity - focus on market dynamics
      else if (title.includes('investor') || title.includes('small real estate') || description.includes('investor purchases')) {
        insight = {
          id: `insight-${index + 1}`,
          title: "Small Investor Trend: Market Evolution",
          content: `The rise of small investors to 59% of purchases reflects a fundamental shift in real estate markets. This trend often indicates strong rental fundamentals and cash flow opportunities. As competition increases, focus on off-market deals, emerging neighborhoods, and property types that institutional investors might overlook. Building relationships with local agents becomes increasingly valuable.`,
          rateImpact: 'neutral',
          urgency: 'medium',
          relatedNews: article.title
        };
      }
      // General market insights - wealth building focus
      else if (title.includes('wealth') || title.includes('luxury') || description.includes('wealthy')) {
        insight = {
          id: `insight-${index + 1}`,
          title: "Wealth Migration Patterns: Strategic Considerations",
          content: `Wealthy buyer movements often signal emerging high-growth markets. These patterns can indicate future property appreciation potential and rental demand from high-income tenants. Consider the economic factors driving these moves - tax advantages, business opportunities, or lifestyle preferences. Early positioning in these markets can yield strong long-term returns.`,
          rateImpact: 'positive',
          urgency: 'low',
          relatedNews: article.title
        };
      }
      // Default insight - market analysis
      else {
        insight = {
          id: `insight-${index + 1}`,
          title: "Market Analysis: Strategic Investment Perspective",
          content: `Current market dynamics present both challenges and opportunities for property investors. At ${rates.thirtyYear}% interest rates, focus on properties with strong cash flow potential and growth fundamentals. Consider markets with diverse economic drivers, population growth, and rental demand sustainability. Due diligence on local market conditions remains crucial.`,
          rateImpact: 'neutral',
          urgency: 'medium',
          relatedNews: article.title
        };
      }

      insights.push(insight);
    });

    return insights;
  }

  private async fetchMBSData() {
    try {
      // Fetch MBS data from Mortgage News Daily API
      const response = await fetch('https://www.mortgagenewsdaily.com/mbs');
      if (response.ok) {
        const mbsText = await response.text();
        
        // Extract MBS pricing from the page content
        const priceMatch = mbsText.match(/FNMA 30yr.*?(\d+\.\d+)/i);
        const yieldMatch = mbsText.match(/yield.*?(\d+\.\d+)%/i);
        const changeMatch = mbsText.match(/([\+\-]?\d+\.\d+).*?basis/i);
        
        const price = priceMatch ? parseFloat(priceMatch[1]) : null;
        const yieldValue = yieldMatch ? parseFloat(yieldMatch[1]) : null;
        const change = changeMatch ? parseFloat(changeMatch[1]) / 100 : null;
        
        if (!price || !yieldValue) {
          throw new Error('Unable to parse MBS data');
        }
        
        return {
          price: Math.round(price * 100) / 100,
          yield: Math.round(yieldValue * 100) / 100,
          change: change ? Math.round(change * 100) / 100 : 0,
          lastUpdated: new Date().toISOString()
        };
      }
      
      throw new Error('Unable to fetch MBS data from source');
    } catch (error) {
      console.error('Error fetching MBS data:', error);
      throw new Error('MBS data source currently unavailable - please try again later');
    }
  }
}

export const storage = new MemStorage();
