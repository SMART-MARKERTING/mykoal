import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { TrendingUp, TrendingDown, Clock, ExternalLink, Building2, DollarSign, Calendar, AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';

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

export default function MarketUpdatesPage() {
  const { data: marketData, isLoading, error } = useQuery<MarketData>({
    queryKey: ['/api/market-updates'],
    refetchInterval: 30 * 60 * 1000, // Refetch every 30 minutes
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading live market data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !marketData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Market Updates</h1>
            <Alert className="mb-8">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Live market data temporarily unavailable. Contact us for current rates and market analysis.
              </AlertDescription>
            </Alert>
            <Card className="bg-white shadow-lg">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-semibold mb-4">Get Current Rates</h2>
                <p className="text-gray-600 mb-6">Mykoal DeShazo • NMLS #1912347 • Scottsdale, Arizona</p>
                <div className="space-y-2">
                  <p className="text-xl font-semibold text-blue-600">(623) 280-8351</p>
                  <p className="text-gray-600">mdeshazo@mykoal.com</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'high': return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'medium': return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default: return <CheckCircle className="w-5 h-5 text-green-500" />;
    }
  };

  const getRateImpactColor = (impact: string) => {
    switch (impact) {
      case 'negative': return 'border-l-red-500 bg-red-50';
      case 'positive': return 'border-l-green-500 bg-green-50';
      default: return 'border-l-blue-500 bg-blue-50';
    }
  };

  return (
    <>
      {/* SEO Meta Tags */}
      <div style={{ display: 'none' }}>
        <title>Live Mortgage Rates & Market Updates | Mykoal DeShazo NMLS #1912347</title>
        <meta name="description" content="Current investment property mortgage rates from Federal Reserve data. Expert market analysis and rate insights for real estate investors in Arizona." />
        <meta property="og:title" content="Live Mortgage Rates & Market Updates | Investment Property Financing" />
        <meta property="og:description" content="Real-time mortgage rates and professional market insights for investment property financing. Lock rates today with NMLS #1912347." />
      </div>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Live Market Updates
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Real-time mortgage rates and expert market insights for investment property financing
            </p>
          </div>

          {/* Rate Disclaimer */}
          <Alert className="mb-8 bg-gray-50 border-gray-200">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-sm leading-relaxed">
              <strong>Rate Disclaimer:</strong> The mortgage rates displayed are pulled live from the Federal Reserve Economic Data (FRED) system hosted by the Economic Research Division of the Federal Reserve Bank of St. Louis. These rates do not represent a loan offer and are provided for informational purposes only. Actual rates may vary based on credit profile, loan-to-value ratio, property type, and market conditions. Contact Mykoal DeShazo (NMLS #1912347) for personalized rate quotes and loan terms.
            </AlertDescription>
          </Alert>

          {/* Current Rates */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
            <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-600">
              <CardHeader className="text-center pb-3">
                <CardTitle className="text-xl md:text-2xl text-blue-600">30-Year Fixed</CardTitle>
              </CardHeader>
              <CardContent className="text-center pt-0">
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {marketData.currentRates.thirtyYear > 0 ? `${marketData.currentRates.thirtyYear}%` : 'Call for Rate'}
                </div>
                <div className="flex items-center justify-center text-xs md:text-sm text-gray-500">
                  <Clock className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                  Updated {formatDate(marketData.currentRates.lastUpdated)}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-green-600">
              <CardHeader className="text-center pb-3">
                <CardTitle className="text-xl md:text-2xl text-green-600">15-Year Fixed</CardTitle>
              </CardHeader>
              <CardContent className="text-center pt-0">
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {marketData.currentRates.fifteenYear > 0 ? `${marketData.currentRates.fifteenYear}%` : 'Call for Rate'}
                </div>
                <div className="flex items-center justify-center text-xs md:text-sm text-gray-500">
                  <Clock className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                  Updated {formatDate(marketData.currentRates.lastUpdated)}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-purple-600">
              <CardHeader className="text-center pb-3">
                <CardTitle className="text-xl md:text-2xl text-purple-600">Jumbo Loans</CardTitle>
              </CardHeader>
              <CardContent className="text-center pt-0">
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {marketData.currentRates.jumbo > 0 ? `${marketData.currentRates.jumbo}%` : 'Call for Rate'}
                </div>
                <div className="flex items-center justify-center text-xs md:text-sm text-gray-500">
                  <Clock className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                  Updated {formatDate(marketData.currentRates.lastUpdated)}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Mykoal's Market Insights */}
          {marketData.insights && marketData.insights.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
                Mykoal's Market Insights
              </h2>
              <div className="grid gap-4 md:gap-6">
                {marketData.insights.map((insight) => (
                  <Card key={insight.id} className={`shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 ${getRateImpactColor(insight.rateImpact)}`}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <CardTitle className="text-lg md:text-xl text-gray-900 flex-1">
                          {insight.title}
                        </CardTitle>
                        <div className="flex items-center gap-2">
                          {getUrgencyIcon(insight.urgency)}
                          <Badge variant="outline" className="text-xs">
                            {insight.urgency.toUpperCase()} PRIORITY
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-gray-700 leading-relaxed mb-4 text-sm md:text-base">
                        {insight.content}
                      </p>
                      <div className="text-xs md:text-sm text-gray-500 italic">
                        Related to: {insight.relatedNews}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Market News */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
              Latest Market News
            </h2>
            
            {marketData.news.length > 0 ? (
              <div className="grid gap-4 md:gap-6">
                {marketData.news.map((article, index) => (
                  <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg md:text-xl mb-2 hover:text-blue-600 transition-colors">
                        <a href={article.url} target="_blank" rel="noopener noreferrer" className="flex items-start">
                          <span className="flex-1">{article.title}</span>
                          <ExternalLink className="w-4 h-4 ml-2 flex-shrink-0 mt-1" />
                        </a>
                      </CardTitle>
                      <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm text-gray-500 flex-wrap">
                        <span className="flex items-center">
                          <Building2 className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                          {article.source}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                          {formatDate(article.publishedAt)}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-gray-700 leading-relaxed text-sm md:text-base">{article.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="bg-white shadow-lg">
                <CardContent className="text-center py-8">
                  <p className="text-gray-600 mb-2">No recent market news available.</p>
                  <p className="text-sm text-gray-500">Contact us for the latest market insights.</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Rate Disclaimer */}
          <Alert className="mb-8 bg-gray-50 border-gray-200">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-sm leading-relaxed">
              <strong>Rate Disclaimer:</strong> The mortgage rates displayed are pulled live from the Federal Reserve Economic Data (FRED) system hosted by the Economic Research Division of the Federal Reserve Bank of St. Louis. These rates do not represent a loan offer and are provided for informational purposes only. Actual rates may vary based on credit profile, loan-to-value ratio, property type, and market conditions. Contact Mykoal DeShazo (NMLS #1912347) for personalized rate quotes and loan terms.
            </AlertDescription>
          </Alert>

          {/* Contact CTA */}
          <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl">
            <CardContent className="text-center py-8 md:py-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Lock Your Rate Today</h2>
              <p className="text-lg md:text-xl mb-6 opacity-90">
                Don't wait for rates to rise. Secure your investment property financing now.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center text-sm md:text-base">
                <div className="flex items-center">
                  <DollarSign className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                  <span className="font-semibold">NMLS #1912347</span>
                </div>
                <div className="text-lg md:text-xl font-bold">(623) 280-8351</div>
                <div>mdeshazo@mykoal.com</div>
              </div>
              <p className="text-xs md:text-sm mt-4 opacity-75">
                Licensed Mortgage Professional • Scottsdale, Arizona
              </p>
            </CardContent>
          </Card>

          {/* Compliance Footer */}
          <div className="mt-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-8 bg-blue-600 text-white rounded flex items-center justify-center text-xs font-bold">
                =
              </div>
              <span className="text-sm font-semibold text-gray-700">Equal Housing Opportunity</span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed max-w-4xl mx-auto">
              Equal Housing Opportunity. All loans subject to credit approval. Rates, terms, and conditions are subject to change without notice. 
              This is not a commitment to lend. Licensed by the Department of Financial Protection and Innovation under the California Residential Mortgage Lending Act. 
              Mykoal DeShazo NMLS #1912347. Company NMLS #1912347.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}