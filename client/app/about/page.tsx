"use client";

import React from 'react';
import { Linkedin, MessageSquare, Send } from 'lucide-react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import { bookmark, bookmarkEmpty } from "@/utils/Icons";

const About = () => {
  return (
    <main className="bg-background min-h-screen">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-foreground mb-8">About JobFindr</h1>
        
        <section className="prose prose-gray dark:prose-invert mb-12">
          <p className="text-muted-foreground text-lg">
            Welcome to JobFindr, your trusted platform for connecting talent with opportunity. 
            Whether you are starting your career or looking for your next challenge, we make job 
            searching effortless and effective.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Extensive Job Listings</h3>
              <p className="text-muted-foreground">Browse through diverse sectors and opportunities</p>
            </div>
            <div className="p-6 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Intuitive Platform</h3>
              <p className="text-muted-foreground">Enjoy a seamless job search experience</p>
            </div>
            <div className="p-6 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Customizable Filters</h3>
              <p className="text-muted-foreground">Tailor your search to find the perfect match</p>
            </div>
            <div className="p-6 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Career Resources</h3>
              <p className="text-muted-foreground">Access tips and insights for job seekers</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Connect With Us</h2>
          <div className="flex flex-col md:flex-row gap-6">
            <a href="#" className="flex items-center gap-2 p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
              <MessageSquare className="h-5 w-5" />
              <span>WhatsApp Community</span>
            </a>
            <a href="#" className="flex items-center gap-2 p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
              <Linkedin className="h-5 w-5" />
              <span>LinkedIn Page</span>
            </a>
            <a href="#" className="flex items-center gap-2 p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
              <Send className="h-5 w-5" />
              <span>Telegram Channel</span>
            </a>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-foreground mb-6">Our Future</h2>
          <p className="text-muted-foreground text-lg">
            We are continuously expanding our reach, improving features, and enhancing user 
            satisfaction to become the leading job portal globally. Our commitment to innovation 
            and user experience drives us forward.
          </p>
        </section>
      </div>

      <Footer />
    </main>
  );
};

export default About;