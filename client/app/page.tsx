"use client";
import Footer from "@/Components/Footer";
import Header from "@/Components/Header";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { useGlobalContext } from "@/context/globalContext";
import {
  Briefcase,
  Building,
  CheckCircleIcon,
  SearchIcon,
  Users,
} from "lucide-react";
import Link from "next/link";
import { title } from "process";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const features = [
    {
      icon: <Briefcase className="w-6 h-6 text-primary" />,
      title: "Diverse Opportunities",
      description:
        "Access thousands of job listings across various industries and experience levels.",
      benefits: [
        "100,000+ active job listings",
        "50+ job categories",
        "Remote and on-site options",
      ],
      cta: "Explore Jobs",
      ctaLink: "/findwork",
    },
    {
      icon: <Building className="w-6 h-6 text-primary" />,
      title: "Top Companies",
      description:
        "Connect with leading companies, from innovative startups to Fortune 500 corporations.",
      benefits: [
        "500+ verified employers",
        "Exclusive partnerships",
        "Direct application process",
      ],
      cta: "View Companies",
      ctaLink: "/findwork",
    },
    {
      icon: <Users className="w-6 h-6 text-primary" />,
      title: "Talent Pool",
      description:
        "Employers can access a diverse pool of qualified candidates for their open positions.",
      benefits: [
        "1M+ registered job seekers",
        "Advanced search filters",
        "AI-powered matching",
      ],
      cta: "Post a Job",
      ctaLink: "/post",
    },
  ];

  const [isMounted, setIsMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    // Navigate to search results page with the query
    router.push(`/findwork?search=${encodeURIComponent(searchQuery)}`);
  };
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <main className="bg-background min-h-screen">
      <Header />

      <section className="py-20 bg-gradient-to-b from-muted to-background ">
        <div className="container mx-auto px-4 text-center ">
          <h1 className="text-4xl text-[#7263f3] md:text-5xl font-bold mb-6">
            Find Your Dream Job or Perfect Candidate
          </h1>
          <p className="text-xl mb-8 text-foreground">
            Connect with thousands of employers and job seekers on our platform
          </p>
          {/* <div className="max-w-2xl mx-auto flex gap-4">
            <Input
              type="text"
              placeholder="Job title or keyword"
              className="flex-grow bg-white text-black"
              data-has-listeners={isMounted ? "true" : undefined}
            />
            <Button className="bg-[#7263f3] text-white">
              <SearchIcon className="w-6 h-6" />
              Search Jobs
            </Button>
          </div> */}
          <div className="max-w-2xl mx-auto">
            {isMounted && (
              <form onSubmit={handleSearch} className="flex gap-4">
                <Input
                  type="text"
                  name="search"
                  placeholder="Job title or keyword"
                  className="flex-grow bg-background text-foreground"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button
                  type="submit"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <SearchIcon className="w-6 h-6 mr-2" />
                  Search Jobs
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            Why Choose{" "}
            <span className="text-[#7263f3] font-extrabold">JobFindr</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="flex flex-col h-full rounded-xl border-border bg-background"
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl mb-2 text-foreground">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">{feature.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center text-foreground">
                        <CheckCircleIcon className="w-5 h-5 text-green-500 dark:text-green-400 mr-2 flex-shrink-0 mt-0.5" />

                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href={feature.ctaLink}>{feature.cta}</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-20 text-center">
            <Badge
              variant={"outline"}
              className="text-sm font-medium border-border text-foreground"
            >
              Trusted by 10,000+ companies worldwide
            </Badge>
          </div>
        </div>
      </section>

      <section className="py-[3rem] bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8 text-foreground">Ready to Get Started?</h2>

          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Button size={"lg"} asChild>
              <Link href={"/findwork"}>Find Work</Link>
            </Button>
           
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
