import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Link } from "wouter";
import {
  FileText, ArrowRight, MessageSquare, Sparkles,
  Zap, Database, CheckCircle, AlertTriangle, Coins
} from "lucide-react";
import InstrumentLifecycleExplorer from "../../../components/InstrumentLifecycleExplorer";

export default function Home() {
  const features = [
    {
      icon: FileText,
      title: "17 Instrument Types",
      description: "Support for LC, ILC, ELC, BC, IBC, EBC, SG, SBLC, BG, PG, APG, PBG, BB, RG, WG, CG, DC with variations",
      bg: "bg-blue-600",
      iconColor: "text-blue-100",
      ring: "hover:ring-blue-300",

    },
    {
      icon: ArrowRight,
      title: "MT Message Transformations",
      description: "Dynamic dropdown with all applicable MT messages (707-792 series) based on instrument type",
      bg: "bg-orange-600",
      iconColor: "text-orange-100",
      ring: "hover:ring-orange-300",
    },
    {
      icon: Sparkles,
      title: "AI-Powered Enrichment",
      description: "Azure OpenAI GPT-4o integration for intelligent MT message analysis and enrichment",
      bg: "bg-green-600",
      iconColor: "text-green-100",
      ring: "hover:ring-green-300",
    },
    {
      icon: AlertTriangle,
      title: "Discrepancy Detection",
      description: "Identify issues with concrete cure steps and actionable recommendations",
      bg: "bg-red-600",
      iconColor: "text-red-100",
      ring: "hover:ring-red-300",
    },
    {
      icon: Coins,
      title: "Token Statistics",
      description: "Track prompt, completion, and total tokens for cost and performance monitoring",
      bg: "bg-purple-600",
      iconColor: "text-purple-100",
      ring: "hover:ring-purple-300",
    },
    {
      icon: Database,
      title: "MFC_ Database Tables",
      description: "SQL Server integration with MFC_ prefixed tables and stored procedures",
      bg: "bg-cyan-600",
      iconColor: "text-cyan-100",
      ring: "hover:ring-cyan-300",
    },
  ];


  const mtCategories = [
    { name: "Issuance", color: "bg-green-500", examples: "MT 700, 760, 770" },
    { name: "Amendment", color: "bg-orange-500", examples: "MT 707, 765, 772" },
    { name: "Transfer", color: "bg-amber-700", examples: "MT 720" },
    { name: "Advice", color: "bg-blue-500", examples: "MT 710, 750, 754" },
    { name: "Authorization", color: "bg-purple-500", examples: "MT 740, 752" },
    { name: "Claims", color: "bg-red-500", examples: "MT 742" },
    { name: "Cancellation", color: "bg-gray-500", examples: "MT 792" },
    { name: "Release", color: "bg-cyan-500", examples: "MT 769" },
  ];

  return (
    <div className="min-h-screen p-6 space-y-6 card mt-5">
      {/* Hero Section */}
      <div className=" p-2">
        <div className="text-center">
          <Badge className="mb-4 btn btn-primary btn-outline text-xs">Trade Finance AI Platform</Badge>
          <h1 className="text-4xl md:text-4xl font-bold mb-6">
            MLC - Letter of Credit Validation System
          </h1>
          <p className="text-l max-w-3xl mx-auto mb-8">
            Comprehensive trade finance instrument management with AI-powered processing,
            MT message transformation, and intelligent discrepancy detection.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/mlc/instrument">
              <Button size="lg" className="btn btn-primary btn-outline">
                <FileText className="h-5 w-5 mr-2" />
                Create Instrument
              </Button>
            </Link>
            <Link href="/llm-logs">
              <Button size="lg" variant="outline" className="btn btn-success btn-outline">
                <MessageSquare className="h-5 w-5 mr-2" />
                View LLM Logs
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Instrument Lifecycle Explorer Section - NEW */}
      <section className="py-16 bg-white dark:bg-slate-950">
        <div className="container">
          <InstrumentLifecycleExplorer />
        </div>
      </section>

      {/* Features Section */}
      <section className="card p-4">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {features.map((feature, index) => (
              <Card
                key={index}
                className={cn(
                  "transition-all text-white hover:scale-[1.02] hover:ring-1 hover:ring-offset-2",
                  feature.bg,
                  feature.ring
                )}
              >

                <CardHeader>
                  <feature.icon className={cn("h-10 w-10 mb-2", feature.iconColor)} />
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-white/90">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}

          </div>
        </div>
      </section>

      {/* MT Categories Section */}
      <section className="py-16 bg-white dark:bg-slate-950">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-4">MT Message Categories</h2>
          <p className="text-center text-muted-foreground mb-8">
            Color-coded categorization for easy identification
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {mtCategories.map((cat) => (
              <div key={cat.name} className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg shadow">
                <Badge className={`${cat.color} text-white`}>{cat.name}</Badge>
                <span className="text-sm text-muted-foreground">{cat.examples}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="card p-4  text-center">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Process Your Instruments?</h2>
          <p className="text-xl mb-8">
            Start with the Instrument Screen to load samples and enrich with AI
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/mlc/instrument">
              <Button size="lg" className="btn btn-primary btn-outline">
                <Zap className="h-5 w-5 mr-2" />
                Go to Instrument Screen
              </Button>
            </Link>
            <Link href="/mlc/llm-logs">
              <Button size="lg" variant="outline" className="btn btn-success btn-outline">
                <MessageSquare className="h-5 w-5 mr-2" />
                View LLM Logs
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
