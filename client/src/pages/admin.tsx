import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, MessageSquare, FileText, Star, Mail } from "lucide-react";
import { Link } from "wouter";
import { Contact, QuickQuote, PreQualification, MarketSubscription } from "@shared/schema";

export default function AdminPage() {
  const { data: contacts = [], isLoading: contactsLoading } = useQuery<Contact[]>({
    queryKey: ['/api/contacts'],
  });

  const { data: quotes = [], isLoading: quotesLoading } = useQuery<QuickQuote[]>({
    queryKey: ['/api/quick-quotes'],
  });

  const { data: preQuals = [], isLoading: preQualsLoading } = useQuery<PreQualification[]>({
    queryKey: ['/api/pre-qualifications'],
  });

  const { data: subscriptions = [], isLoading: subscriptionsLoading } = useQuery<MarketSubscription[]>({
    queryKey: ['/api/market-subscriptions'],
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Website
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">View all form submissions and lead data</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="w-8 h-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Contact Forms</p>
                  <p className="text-2xl font-bold text-gray-900">{Array.isArray(contacts) ? contacts.length : 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <MessageSquare className="w-8 h-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Quick Quotes</p>
                  <p className="text-2xl font-bold text-gray-900">{quotes?.length || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <FileText className="w-8 h-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pre-Qualifications</p>
                  <p className="text-2xl font-bold text-gray-900">{preQuals?.length || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Mail className="w-8 h-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Email Subscriptions</p>
                  <p className="text-2xl font-bold text-gray-900">{subscriptions?.length || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Forms */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Contact Form Submissions
            </CardTitle>
          </CardHeader>
          <CardContent>
            {contactsLoading ? (
              <p>Loading contact forms...</p>
            ) : contacts && contacts.length > 0 ? (
              <div className="space-y-4">
                {contacts.map((contact: any) => (
                  <div key={contact.id} className="border rounded-lg p-4 bg-white">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {contact.firstName} {contact.lastName}
                        </h3>
                        <p className="text-gray-600">{contact.email} • {contact.phone}</p>
                      </div>
                      <Badge variant="outline">
                        {new Date(contact.createdAt).toLocaleDateString()}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <span className="font-medium">Loan Type:</span> {contact.loanType}
                      </div>
                      <div>
                        <span className="font-medium">Timeline:</span> {contact.timeline}
                      </div>
                    </div>
                    {contact.message && (
                      <div>
                        <span className="font-medium">Message:</span>
                        <p className="text-gray-700 mt-1">{contact.message}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No contact forms submitted yet.</p>
            )}
          </CardContent>
        </Card>

        {/* Quick Quotes */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="w-5 h-5 mr-2" />
              Quick Quote Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            {quotesLoading ? (
              <p>Loading quick quotes...</p>
            ) : quotes && quotes.length > 0 ? (
              <div className="space-y-4">
                {quotes.map((quote: any) => (
                  <div key={quote.id} className="border rounded-lg p-4 bg-white">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{quote.email}</h3>
                      </div>
                      <Badge variant="outline">
                        {new Date(quote.createdAt).toLocaleDateString()}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <span className="font-medium">Loan Amount:</span> ${parseFloat(quote.loanAmount).toLocaleString()}
                      </div>
                      <div>
                        <span className="font-medium">Credit Score:</span> {quote.creditScore}
                      </div>
                      <div>
                        <span className="font-medium">Property Type:</span> {quote.propertyType}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No quick quotes submitted yet.</p>
            )}
          </CardContent>
        </Card>

        {/* Pre-Qualifications */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Pre-Qualification Applications
            </CardTitle>
          </CardHeader>
          <CardContent>
            {preQualsLoading ? (
              <p>Loading pre-qualifications...</p>
            ) : preQuals && preQuals.length > 0 ? (
              <div className="space-y-4">
                {preQuals.map((preQual: any) => (
                  <div key={preQual.id} className="border rounded-lg p-4 bg-white">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {preQual.firstName} {preQual.lastName}
                        </h3>
                        <p className="text-gray-600">{preQual.email} • {preQual.phone}</p>
                      </div>
                      <div className="text-right">
                        <Badge 
                          variant={preQual.status === 'qualified' ? 'default' : 
                                  preQual.status === 'conditional' ? 'secondary' : 'destructive'}
                        >
                          {preQual.status}
                        </Badge>
                        <p className="text-sm text-gray-500 mt-1">
                          {new Date(preQual.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="font-medium">Loan Type:</span> {preQual.loanType}
                      </div>
                      <div>
                        <span className="font-medium">Loan Amount:</span> ${parseFloat(preQual.loanAmount || '0').toLocaleString()}
                      </div>
                      <div>
                        <span className="font-medium">Property Type:</span> {preQual.propertyType}
                      </div>
                      <div>
                        <span className="font-medium">Score:</span> {preQual.score}/100
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No pre-qualification applications submitted yet.</p>
            )}
          </CardContent>
        </Card>

        {/* Email Subscriptions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Mail className="w-5 h-5 mr-2" />
              Market Updates Email Subscriptions
            </CardTitle>
          </CardHeader>
          <CardContent>
            {subscriptionsLoading ? (
              <p>Loading subscriptions...</p>
            ) : subscriptions && subscriptions.length > 0 ? (
              <div className="space-y-4">
                {subscriptions.map((subscription: any) => (
                  <div key={subscription.id} className="border rounded-lg p-4 bg-white">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">{subscription.email}</h3>
                      </div>
                      <Badge variant="outline">
                        {new Date(subscription.createdAt).toLocaleDateString()}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No email subscriptions yet.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}