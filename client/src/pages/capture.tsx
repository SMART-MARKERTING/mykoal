import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useLocation } from "wouter";
import headshotImage from "@assets/IMG_0016_1751000995747.jpeg";

export default function Capture() {
  const [lastName, setLastName] = useState("");
  const [, setLocation] = useLocation();

  const mutation = useMutation({
    mutationFn: async (data: { lastName: string }) => {
      const res = await apiRequest("POST", "/api/leads", data);
      return res.json();
    },
    onSuccess: () => {
      setLocation("/home");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (lastName.trim()) {
      mutation.mutate({ lastName: lastName.trim() });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center">
      <div className="container max-w-md mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="relative inline-block mb-6">
            <img
              src={headshotImage}
              alt="Mykoal DeShazo"
              className="w-28 h-28 rounded-full object-cover shadow-2xl border-4 border-white/20 mx-auto"
            />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Mykoal DeShazo
          </h1>
          <p className="text-blue-200 text-lg mb-1">Branch Manager</p>
          <p className="text-blue-300 text-sm">NMLS #1912347</p>
        </div>

        <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
          <CardContent className="p-6">
            <h2 className="text-white text-xl font-semibold text-center mb-2">
              Welcome!
            </h2>
            <p className="text-blue-200 text-sm text-center mb-6">
              Enter your last name to continue
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="bg-white/10 border-white/30 text-white placeholder:text-blue-300/50 focus:border-blue-400 focus:ring-blue-400"
                required
              />
              <Button
                type="submit"
                disabled={mutation.isPending || !lastName.trim()}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3"
              >
                {mutation.isPending ? "Submitting..." : "Continue"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
