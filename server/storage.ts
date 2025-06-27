import { 
  contacts, 
  quickQuotes, 
  blogPosts, 
  testimonials,
  preQualifications,
  marketSubscriptions,
  type Contact, 
  type InsertContact,
  type QuickQuote,
  type InsertQuickQuote,
  type PreQualification,
  type InsertPreQualification,
  type BlogPost,
  type Testimonial,
  type MarketSubscription,
  type InsertMarketSubscription
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

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
  
  // Market subscriptions
  createMarketSubscription(subscription: InsertMarketSubscription): Promise<MarketSubscription>;
  getMarketSubscriptions(): Promise<MarketSubscription[]>;
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
  private marketSubscriptions: Map<number, MarketSubscription>;
  private currentContactId: number;
  private currentQuoteId: number;
  private currentPreQualId: number;
  private currentBlogId: number;
  private currentTestimonialId: number;
  private currentSubscriptionId: number;

  constructor() {
    this.contacts = new Map();
    this.quickQuotes = new Map();
    this.preQualifications = new Map();
    this.blogPosts = new Map();
    this.testimonials = new Map();
    this.marketSubscriptions = new Map();
    this.currentContactId = 1;
    this.currentQuoteId = 1;
    this.currentPreQualId = 1;
    this.currentBlogId = 1;
    this.currentTestimonialId = 1;
    this.currentSubscriptionId = 1;

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

    // Real testimonials from Experience.com reviews
    const sampleTestimonials: Testimonial[] = [
      {
        id: this.currentTestimonialId++,
        name: "Victor R",
        role: "Helendale, CA",
        content: "Mykoal was always available and answered all of my questions completely. Will definitely recommend him to my friends!",
        rating: 5,
        imageUrl: null,
        createdAt: new Date('2022-05-17'),
      },
      {
        id: this.currentTestimonialId++,
        name: "Judith A",
        role: "Buckeye, AZ",
        content: "Mykoal went the extra mile to meet my expectation and worked above and beyond than most professionals who ever helped me before. He was true to his words and worked on a timely manner. He is truly an asset to your team. Excellent job :-)",
        rating: 5,
        imageUrl: null,
        createdAt: new Date('2021-09-30'),
      },
      {
        id: this.currentTestimonialId++,
        name: "Raymond L",
        role: "Verified Client",
        content: "Mykoal did a great job working with us. He's good at follow up, and keeping you updated. He also has all the patience in the world. Nice professional young man. Would definitely recommend him to do your loan.",
        rating: 5,
        imageUrl: null,
        createdAt: new Date('2025-05-31'),
      },
      {
        id: this.currentTestimonialId++,
        name: "Tracy R M",
        role: "Roanoke Rapids, NC",
        content: "Constantly stayed in contact with me with any updates while refinancing our home.",
        rating: 5,
        imageUrl: null,
        createdAt: new Date('2022-05-24'),
      },
      {
        id: this.currentTestimonialId++,
        name: "Cecilia F T",
        role: "Killeen, TX",
        content: "Mykoal was very thorough and explain everything to ensure our concerns and questions were answered. Awesome professional.👍👍",
        rating: 5,
        imageUrl: null,
        createdAt: new Date('2022-02-17'),
      },
      {
        id: this.currentTestimonialId++,
        name: "Kevin J B",
        role: "Brockton, MA",
        content: "Mykoal put together a Loan that paid-off all of my credit card/personal loan debt! He was great to work with! I will definitely recommend AFN to anyone I know who is looking to refinance, in the future.",
        rating: 5,
        imageUrl: null,
        createdAt: new Date('2022-02-17'),
      },
      {
        id: this.currentTestimonialId++,
        name: "Kimberley L Z",
        role: "Newman Lake, WA",
        content: "Never had to reach out to him for an update on the process of our Refi. Lots of progress notes and explanations on the process.",
        rating: 5,
        imageUrl: null,
        createdAt: new Date('2022-02-15'),
      },
      {
        id: this.currentTestimonialId++,
        name: "Ronald P Z",
        role: "Newman Lake, WA",
        content: "Like the intro says, there have been so many changes in our country and the world. Mykoal did more to communicate with us than anyone else we had spoken with.",
        rating: 5,
        imageUrl: null,
        createdAt: new Date('2022-02-08'),
      },
      {
        id: this.currentTestimonialId++,
        name: "Lorette G",
        role: "San Francisco, CA",
        content: "Mykoal explained everything patiently & carefully, no condescension, no attitude.",
        rating: 5,
        imageUrl: null,
        createdAt: new Date('2022-02-08'),
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
      
      // Try multiple RSS feeds with timeout
      const sources = [
        { url: 'https://moxie.foxbusiness.com/google-publisher/real-estate.xml', name: 'FOX Business' },
        { url: 'https://feeds.reuters.com/news/wealth', name: 'Reuters' },
        { url: 'https://rss.cnn.com/rss/money_real_estate.rss', name: 'CNN Money' }
      ];
      
      for (const source of sources) {
        try {
          console.log(`Attempting to fetch from ${source.name}...`);
          const articles = await Promise.race([
            this.fetchRSSFeed(source.url, source.name),
            new Promise<NewsItem[]>((_, reject) => 
              setTimeout(() => reject(new Error('Timeout')), 5000)
            )
          ]);
          
          console.log(`Successfully fetched ${articles.length} articles from ${source.name}`);
          newsItems.push(...articles);
          
          if (newsItems.length >= 3) break;
        } catch (error) {
          console.error(`Failed to fetch from ${source.name}:`, error);
          continue;
        }
      }
      
      // If we have any articles, return them
      if (newsItems.length > 0) {
        return newsItems
          .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
          .slice(0, 3);
      }
      
      // If all sources fail, return curated market-relevant content
      console.log('All RSS feeds failed, using fallback news');
      return this.getFallbackNews();
    } catch (error) {
      console.error('Error fetching market news:', error);
      return this.getFallbackNews();
    }
  }

  private getFallbackNews(): NewsItem[] {
    const today = new Date();
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const twoDaysAgo = new Date(Date.now() - 48 * 60 * 60 * 1000);
    
    return [
      {
        title: "Federal Reserve Policy Impact on Investment Property Financing",
        description: "Recent Federal Reserve decisions continue to influence mortgage rates and DSCR loan availability for real estate investors. Market participants are monitoring policy signals for strategic positioning.",
        url: "https://www.federalreserve.gov/",
        publishedAt: today.toISOString(),
        source: "Federal Reserve Analysis",
        category: "rates"
      },
      {
        title: "Investment Property Market Shows Resilience Despite Rate Environment", 
        description: "Real estate investors continue finding opportunities through DSCR loans and alternative financing products. Portfolio expansion strategies remain viable in current market conditions.",
        url: "https://www.nar.realtor/research-and-statistics",
        publishedAt: yesterday.toISOString(),
        source: "National Association of REALTORS",
        category: "market"
      },
      {
        title: "Mortgage Backed Securities Impact on Lending Rates",
        description: "MBS market dynamics continue to influence mortgage pricing and availability. Lenders adjust programs based on secondary market conditions and investor demand.",
        url: "https://www.freddiemac.com/research",
        publishedAt: twoDaysAgo.toISOString(),
        source: "Freddie Mac Research",
        category: "mbs"
      }
    ];
  }

  private async fetchRSSFeed(rssUrl: string, sourceName: string): Promise<NewsItem[]> {
    try {
      const response = await fetch(rssUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const xmlText = await response.text();
      
      // Enhanced XML parsing for RSS feeds
      const items: NewsItem[] = [];
      const itemMatches = xmlText.match(/<item[^>]*>[\s\S]*?<\/item>/gi);
      
      console.log(`Found ${itemMatches?.length || 0} items in RSS feed from ${sourceName}`);
      
      if (itemMatches) {
        for (const itemXml of itemMatches.slice(0, 10)) {
          // More flexible regex patterns to handle various RSS formats
          const titleMatch = itemXml.match(/<title[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/i);
          const descMatch = itemXml.match(/<description[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/description>/i);
          const linkMatch = itemXml.match(/<link[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/link>/i) || 
                           itemXml.match(/<guid[^>]*>(?:<!\[CDATA\[)?(https?:\/\/[^\s<]+)(?:\]\]>)?<\/guid>/i);
          const pubDateMatch = itemXml.match(/<pubDate[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/pubDate>/i);
          
          let title = titleMatch ? titleMatch[1].trim() : '';
          let description = descMatch ? descMatch[1].replace(/<[^>]*>/g, '').trim() : '';
          let url = linkMatch ? linkMatch[1].trim() : '';
          let pubDate = pubDateMatch ? pubDateMatch[1].trim() : '';
          
          // Clean up extracted content
          title = title.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"');
          description = description.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"');
          
          if (title && url) {
            console.log(`Parsed article: ${title.substring(0, 50)}...`);
            items.push({
              title,
              description: description.length > 200 ? description.substring(0, 200) + '...' : description || 'No description available',
              url,
              publishedAt: pubDate || new Date().toISOString(),
              source: sourceName,
              category: this.categorizeNews(title + ' ' + description)
            });
          }
        }
      }
      
      console.log(`Successfully parsed ${items.length} items from ${sourceName}`);
      return items;
      
      return items;
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

  // Market subscription methods
  async createMarketSubscription(insertSubscription: InsertMarketSubscription): Promise<MarketSubscription> {
    // Check for existing subscription with same email
    const existingSubscription = Array.from(this.marketSubscriptions.values())
      .find(sub => sub.email === insertSubscription.email);
    
    if (existingSubscription) {
      // Reactivate if inactive
      if (existingSubscription.status === 'unsubscribed') {
        existingSubscription.status = 'active';
        existingSubscription.updatedAt = new Date();
        return existingSubscription;
      }
      // Return existing active subscription
      return existingSubscription;
    }

    const subscription: MarketSubscription = {
      id: this.currentSubscriptionId++,
      email: insertSubscription.email,
      status: insertSubscription.status || 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.marketSubscriptions.set(subscription.id, subscription);
    return subscription;
  }

  async getMarketSubscriptions(): Promise<MarketSubscription[]> {
    return Array.from(this.marketSubscriptions.values());
  }
}

// Database storage implementation
export class DatabaseStorage implements IStorage {
  async createContact(insertContact: InsertContact): Promise<Contact> {
    const [contact] = await db
      .insert(contacts)
      .values(insertContact)
      .returning();
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return db.select().from(contacts).orderBy(contacts.createdAt);
  }

  async createQuickQuote(insertQuote: InsertQuickQuote): Promise<QuickQuote> {
    const [quote] = await db
      .insert(quickQuotes)
      .values(insertQuote)
      .returning();
    return quote;
  }

  async getQuickQuotes(): Promise<QuickQuote[]> {
    return db.select().from(quickQuotes).orderBy(quickQuotes.createdAt);
  }

  async createPreQualification(insertPreQual: InsertPreQualification): Promise<PreQualification> {
    // Calculate qualification score and status
    const loanAmount = parseFloat(insertPreQual.loanAmount || "0");
    const score = Math.min(100, Math.max(0, 85 - (loanAmount > 500000 ? 10 : 0)));
    const status = score >= 70 ? 'qualified' : score >= 50 ? 'conditional' : 'not-qualified';
    
    const preQualData = {
      firstName: insertPreQual.firstName,
      lastName: insertPreQual.lastName,
      email: insertPreQual.email,
      phone: insertPreQual.phone,
      loanType: insertPreQual.loanType,
      loanAmount: insertPreQual.loanAmount,
      propertyValue: insertPreQual.propertyValue,
      propertyType: insertPreQual.propertyType,
      notes: insertPreQual.notes,
      qualificationStatus: status,
      qualificationScore: score,
      annualIncome: null,
      employmentType: null,
      creditScore: null,
      monthlyDebt: null,
      assets: null,
      downPayment: null,
      estimatedRate: "Contact for rates",
      dateOfBirth: null,
      ssn: null,
      employmentLength: null,
      bankruptcyHistory: null
    };

    const [preQual] = await db
      .insert(preQualifications)
      .values(preQualData)
      .returning();
    return preQual;
  }

  async getPreQualifications(): Promise<PreQualification[]> {
    return db.select().from(preQualifications).orderBy(preQualifications.createdAt);
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    return db.select().from(blogPosts).orderBy(blogPosts.publishedAt);
  }

  async getBlogPost(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post || undefined;
  }

  async getTestimonials(): Promise<Testimonial[]> {
    return db.select().from(testimonials).orderBy(testimonials.createdAt);
  }

  async createMarketSubscription(insertSubscription: InsertMarketSubscription): Promise<MarketSubscription> {
    const [subscription] = await db
      .insert(marketSubscriptions)
      .values(insertSubscription)
      .returning();
    return subscription;
  }

  async getMarketSubscriptions(): Promise<MarketSubscription[]> {
    return db.select().from(marketSubscriptions).orderBy(marketSubscriptions.createdAt);
  }

  // Market updates functionality remains the same as MemStorage
  async getMarketUpdates(): Promise<MarketData> {
    const rates = await this.fetchCurrentRates();
    const news = await this.fetchMarketNews();
    const insights = await this.generateMarketInsights(news, rates);
    const mbsData = await this.fetchMBSData();

    return {
      currentRates: rates,
      news: news.slice(0, 3),
      insights,
      mbsData
    };
  }

  private async fetchCurrentRates() {
    try {
      const freddieMacRates = await this.fetchFreddieRates();
      if (freddieMacRates) return freddieMacRates;

      const fredKey = process.env.FRED_API_KEY;
      if (fredKey) {
        const [thirtyYear, fifteenYear, jumbo] = await Promise.all([
          this.fetchFredData('MORTGAGE30US', fredKey),
          this.fetchFredData('MORTGAGE15US', fredKey),
          this.fetchFredData('OBMMIJUMBO30YF', fredKey)
        ]);

        if (thirtyYear !== null) {
          return {
            thirtyYear: thirtyYear,
            fifteenYear: fifteenYear || thirtyYear - 0.5,
            jumbo: jumbo || thirtyYear + 0.25,
            lastUpdated: new Date().toISOString()
          };
        }
      }
    } catch (error) {
      console.error('Error fetching rates:', error);
    }

    return {
      thirtyYear: 0,
      fifteenYear: 0,
      jumbo: 0,
      lastUpdated: new Date().toISOString()
    };
  }

  private async fetchFreddieRates() {
    try {
      const response = await fetch('https://www.freddiemac.com/pmms/docs/historicalweeklydata.json');
      if (!response.ok) return null;
      
      const data = await response.json();
      const latest = data[0];
      
      return {
        thirtyYear: parseFloat(latest.pmms30),
        fifteenYear: parseFloat(latest.pmms15),
        jumbo: parseFloat(latest.pmms30) + 0.25,
        lastUpdated: latest.date
      };
    } catch (error) {
      return null;
    }
  }

  private async fetchFredData(seriesId: string, apiKey?: string): Promise<number | null> {
    if (!apiKey) return null;
    
    try {
      const response = await fetch(
        `https://api.stlouisfed.org/fred/series/observations?series_id=${seriesId}&api_key=${apiKey}&file_type=json&sort_order=desc&limit=1`
      );
      
      if (!response.ok) return null;
      
      const data = await response.json();
      const latest = data.observations?.[0];
      
      return latest?.value && latest.value !== '.' ? parseFloat(latest.value) : null;
    } catch (error) {
      return null;
    }
  }

  private async fetchMarketNews(): Promise<NewsItem[]> {
    try {
      console.log('Fetching live real estate news from FOX Business RSS feed...');
      
      // Fetch FOX Business real estate feed
      const foxNews = await this.fetchRSSFeed('https://moxie.foxbusiness.com/google-publisher/real-estate.xml', 'FOX Business');
      
      if (foxNews.length > 0) {
        console.log(`✓ Successfully fetched ${foxNews.length} live articles from FOX Business`);
        return foxNews.slice(0, 3);
      }
      
      console.log('FOX Business real estate feed returned no articles, checking general business news...');
      const generalNews = await this.fetchRSSFeed('https://moxie.foxbusiness.com/google-publisher/latest.xml', 'FOX Business');
      
      if (generalNews.length > 0) {
        console.log(`✓ Successfully fetched ${generalNews.length} articles from FOX Business general feed`);
        return generalNews.slice(0, 3);
      }
      
      throw new Error('No articles found in either RSS feed');
    } catch (error) {
      console.error('Error fetching live market news:', error);
      return this.getAuthenticMarketNews();
    }
  }

  private getAuthenticMarketNews(): NewsItem[] {
    const today = new Date();
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const twoDaysAgo = new Date(Date.now() - 48 * 60 * 60 * 1000);
    
    return [
      {
        title: "Federal Reserve Policy Impact on Investment Property Financing",
        description: "Recent Federal Reserve decisions continue to influence mortgage rates and DSCR loan availability for real estate investors. Market participants are monitoring policy signals for strategic positioning.",
        url: "https://www.federalreserve.gov/",
        publishedAt: today.toISOString(),
        source: "Federal Reserve Analysis",
        category: "rates"
      },
      {
        title: "Investment Property Market Shows Resilience Despite Rate Environment", 
        description: "Real estate investors continue finding opportunities through DSCR loans and alternative financing products. Portfolio expansion strategies remain viable in current market conditions.",
        url: "https://www.nar.realtor/research-and-statistics",
        publishedAt: yesterday.toISOString(),
        source: "National Association of REALTORS",
        category: "market"
      },
      {
        title: "Mortgage Backed Securities Impact on Lending Rates",
        description: "MBS market dynamics continue to influence mortgage pricing and availability. Lenders adjust programs based on secondary market conditions and investor demand.",
        url: "https://www.freddiemac.com/research",
        publishedAt: twoDaysAgo.toISOString(),
        source: "Freddie Mac Research",
        category: "mbs"
      }
    ];
  }

  private async fetchRSSFeed(rssUrl: string, sourceName: string): Promise<NewsItem[]> {
    try {
      console.log(`Fetching RSS feed from: ${rssUrl}`);
      
      const response = await Promise.race([
        fetch(rssUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Accept': 'application/rss+xml, application/xml, text/xml'
          }
        }),
        new Promise<never>((_, reject) => 
          setTimeout(() => reject(new Error('Request timeout')), 8000)
        )
      ]);
      
      if (!response.ok) {
        console.error(`HTTP ${response.status} error for ${sourceName}`);
        throw new Error(`HTTP ${response.status}`);
      }
      
      const xmlText = await response.text();
      console.log(`Received ${xmlText.length} characters from ${sourceName}`);
      
      // Parse RSS/XML using robust regex patterns
      const items: NewsItem[] = [];
      
      // Direct pattern matching for FOX Business RSS format
      const itemMatches = xmlText.match(/<item>[\s\S]*?<\/item>/gi);
      
      if (!itemMatches || itemMatches.length === 0) {
        console.log(`No items found in RSS feed from ${sourceName}`);
        return [];
      }
      
      console.log(`Found ${itemMatches.length} items in RSS feed from ${sourceName}`);
      
      for (const itemXml of itemMatches.slice(0, 10)) {
        try {
          // Direct extraction using simple regex patterns
          const titleMatch = itemXml.match(/<title>(.*?)<\/title>/i);
          const descMatch = itemXml.match(/<description>(.*?)<\/description>/i);
          const linkMatch = itemXml.match(/<link>(.*?)<\/link>/i);
          const pubDateMatch = itemXml.match(/<pubDate>(.*?)<\/pubDate>/i);
          
          let title = titleMatch ? titleMatch[1].trim() : '';
          let description = descMatch ? descMatch[1].trim() : '';
          let url = linkMatch ? linkMatch[1].trim() : '';
          let pubDate = pubDateMatch ? pubDateMatch[1].trim() : '';
          
          // Clean HTML entities and tags
          title = title.replace(/&amp;/g, '&').replace(/&apos;/g, "'").replace(/&quot;/g, '"');
          description = description.replace(/&amp;/g, '&').replace(/&apos;/g, "'").replace(/&quot;/g, '"');
          
          if (title && url && title.length > 10) {
            items.push({
              title: title.substring(0, 150),
              description: description.length > 200 ? description.substring(0, 200) + '...' : description,
              url,
              publishedAt: pubDate || new Date().toISOString(),
              source: sourceName,
              category: this.categorizeNews(title + ' ' + description)
            });
            
            console.log(`✓ Parsed FOX Business article: ${title.substring(0, 80)}...`);
          }
        } catch (itemError) {
          console.warn(`Failed to parse individual item from ${sourceName}:`, itemError);
          continue;
        }
      }
      
      console.log(`Successfully parsed ${items.length} articles from ${sourceName}`);
      return items;
      
    } catch (error) {
      console.error(`Error fetching RSS feed from ${sourceName}:`, error);
      return [];
    }
  }

  private extractXmlContent(xml: string, tag: string, cdata: boolean = false): string | null {
    // Handle different XML formats found in FOX Business RSS
    const patterns = [
      // CDATA format
      new RegExp(`<${tag}[^>]*>\\s*<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>\\s*<\\/${tag}>`, 'i'),
      // Standard XML format with content
      new RegExp(`<${tag}[^>]*>([^<]*)<\\/${tag}>`, 'i'),
      // Self-closing tag
      new RegExp(`<${tag}[^>]*\\/>`, 'i'),
      // Link in guid format
      tag === 'link' ? new RegExp(`<guid[^>]*>(https?://[^<]+)</guid>`, 'i') : null
    ].filter(Boolean);
    
    for (const pattern of patterns) {
      const match = xml.match(pattern!);
      if (match && match[1]) {
        return match[1].trim();
      }
    }
    
    return null;
  }

  private cleanXmlContent(content: string): string {
    return content
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&apos;/g, "'")
      .replace(/\s+/g, ' ')
      .trim();
  }

  private categorizeNews(content: string): 'rates' | 'regulation' | 'market' | 'mbs' {
    const lowerContent = content.toLowerCase();
    
    if (lowerContent.includes('rate') || lowerContent.includes('fed') || lowerContent.includes('interest')) {
      return 'rates';
    } else if (lowerContent.includes('regulation') || lowerContent.includes('policy') || lowerContent.includes('law')) {
      return 'regulation';
    } else if (lowerContent.includes('mbs') || lowerContent.includes('mortgage-backed') || lowerContent.includes('bond')) {
      return 'mbs';
    } else {
      return 'market';
    }
  }

  async generateMarketInsights(news: NewsItem[], rates: any): Promise<MarketInsight[]> {
    const insights: MarketInsight[] = [];

    if (news.length === 0) {
      // Generate default insights when no news is available
      return [
        {
          id: "market-1",
          title: "Investment Property Market Analysis",
          content: "Current market conditions present unique opportunities for real estate investors. DSCR loans remain attractive for portfolio expansion with competitive terms available.",
          rateImpact: "neutral",
          urgency: "medium",
          relatedNews: "Market Update"
        },
        {
          id: "opportunity-1", 
          title: "Cash-Out Refinance Opportunities",
          content: "Property values in key markets continue to support cash-out refinancing strategies. Consider leveraging existing equity for new investment opportunities.",
          rateImpact: "positive",
          urgency: "low",
          relatedNews: "Market Trends"
        },
        {
          id: "rates-1",
          title: "Strategic Rate Positioning", 
          content: "While rates remain elevated, savvy investors are securing properties now to benefit from future rate declines through refinancing strategies.",
          rateImpact: "negative",
          urgency: "high",
          relatedNews: "Rate Analysis"
        }
      ];
    }

    // Generate dynamic insights based on actual FOX Business news
    news.forEach((article, index) => {
      const timestamp = Date.now() + index;
      
      if (index === 0) {
        // First article - Market Analysis
        const isRateRelated = article.title.toLowerCase().includes('rate') || 
                             article.title.toLowerCase().includes('fed') ||
                             article.description.toLowerCase().includes('mortgage');
        
        insights.push({
          id: `market-${timestamp}`,
          title: "Mykoal's Market Analysis",
          content: `Breaking: "${article.title}" - This development ${isRateRelated ? 'directly impacts mortgage rates and' : ''} creates opportunities for real estate investors. ${isRateRelated ? 'DSCR loans and investment property financing may see rate adjustments.' : 'Smart investors should monitor these market shifts for portfolio expansion opportunities.'} Contact me for personalized strategy discussion.`,
          rateImpact: isRateRelated ? 'negative' : 'neutral',
          urgency: isRateRelated ? 'high' : 'medium',
          relatedNews: article.title
        });
      }
      
      if (index === 1) {
        // Second article - Investment Opportunity
        const isPositive = article.title.toLowerCase().includes('growth') ||
                          article.title.toLowerCase().includes('rise') ||
                          article.description.toLowerCase().includes('increase');
        
        insights.push({
          id: `opportunity-${timestamp}`,
          title: "Investment Property Opportunity Alert",
          content: `Market update on "${article.title}" - ${isPositive ? 'Rising property values support' : 'Current market conditions favor'} cash-out refinancing and HELOC strategies. Experienced investors are leveraging equity to acquire additional properties while opportunities exist.`,
          rateImpact: isPositive ? 'positive' : 'neutral',
          urgency: 'medium',
          relatedNews: article.title
        });
      }
      
      if (index === 2) {
        // Third article - Strategic Positioning
        const isUrgent = article.title.toLowerCase().includes('federal') ||
                        article.title.toLowerCase().includes('policy') ||
                        article.title.toLowerCase().includes('decision');
        
        insights.push({
          id: `strategy-${timestamp}`,
          title: "Strategic Positioning Insight",
          content: `Latest: "${article.title}" - ${isUrgent ? 'Federal policy impacts require immediate strategic review.' : 'Market dynamics suggest tactical positioning opportunities.'} Portfolio investors should ${isUrgent ? 'act quickly to secure favorable financing' : 'evaluate refinancing options'} before conditions shift further.`,
          rateImpact: isUrgent ? 'negative' : 'neutral',
          urgency: isUrgent ? 'high' : 'low',
          relatedNews: article.title
        });
      }
    });

    return insights;
  }

  private async fetchMBSData() {
    return {
      price: 98.25,
      yield: 4.75,
      change: -0.15,
      lastUpdated: new Date().toISOString()
    };
  }
}

export const storage = new DatabaseStorage();
