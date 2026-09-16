"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  GraduationCap,
  Sparkles,
  MapPin,
  CheckCircle2,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0c0e14] text-slate-100 flex flex-col selection:bg-indigo-500/30 selection:text-white">
      {/* Navigation Header */}
      <header className="border-b border-[#1c202c] sticky top-0 z-50 bg-[#0c0e14]/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm tracking-wider shadow-xs">
              N
            </div>
            <span className="text-lg font-bold tracking-tight text-white">
              nubpack
            </span>
            <span className="hidden sm:inline-block text-[11px] font-medium text-slate-400 border border-[#262b3a] bg-[#141722] px-2 py-0.5 rounded-md">
              Student Network
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/terms"
              className="text-xs sm:text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors px-1.5 sm:px-2 py-1"
            >
              Terms &amp; Safety
            </Link>
            <Link href="/terms" id="cta-header">
              <Button size="sm" className="px-3 sm:px-3.5">
                Get Started
                <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="pt-8 pb-12 sm:pt-16 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
            {/* Hero Text */}
            <div className="lg:col-span-7 text-left">
              <div className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1 rounded-md bg-[#161924] border border-[#242a3a] text-indigo-400 text-xs font-semibold mb-5 sm:mb-6 max-w-full">
                <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="truncate sm:overflow-visible">Verified Student Platform · 200+ Colleges</span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-100 leading-[1.2] sm:leading-[1.15] mb-4 sm:mb-5">
                Your campus tribe, <br className="hidden sm:inline" />
                all in one verified place.
              </h1>

              <p className="text-sm sm:text-lg text-slate-400 leading-relaxed max-w-xl mb-6 sm:mb-8">
                Connect with batchmates, join student circles by major and passion, and discover events at your university — with zero spam or anonymous noise.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6 sm:mb-8">
                <Link href="/terms" id="cta-get-started" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto text-sm sm:text-base px-6 sm:px-7">
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
                <Link href="/terms" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto text-sm sm:text-base">
                    Read Community Guidelines
                  </Button>
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500 pt-3 border-t border-[#1a1e2a]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Real SMTP Email OTP</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                  <span>Strict 18+ Student Verification</span>
                </div>
              </div>
            </div>

            {/* Product Feature Mock Card */}
            <div className="lg:col-span-5 w-full">
              <div className="bg-[#12151f] border border-[#212636] rounded-xl p-4 sm:p-6 shadow-sm">
                {/* Mock Card Header */}
                <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 pb-4 border-b border-[#1c202d] mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-bold text-sm flex-shrink-0">
                      AJ
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-semibold text-slate-100">Alex Johnson</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      </div>
                      <span className="text-xs text-slate-400">IIT Delhi · Class of &apos;26</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-medium text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20 self-start sm:self-center">
                    Active Student
                  </span>
                </div>

                {/* Mock Card Body */}
                <div className="space-y-3 mb-4 sm:mb-5 text-left">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                    <span className="truncate">New Delhi, Delhi · B.Tech Computer Science</span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed bg-[#161924] p-3 rounded-lg border border-[#222736]">
                    &ldquo;Building web apps, weekend hackathons, and searching for campus jam band members! 🎸&rdquo;
                  </p>

                  <div>
                    <div className="text-[11px] font-medium text-slate-400 mb-1.5">Interests:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {["Coding", "Music", "Gaming", "Startups"].map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-[#1a1e2b] text-slate-300 border border-[#282e40]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Mock Card Footer Interaction */}
                <div className="pt-3 border-t border-[#1c202d] flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 text-xs text-slate-400">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                    <span>Email OTP Verified</span>
                  </div>
                  <span className="text-[11px] text-slate-500">Joined today</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pillars Section */}
        <section className="py-12 sm:py-16 border-t border-[#181c26] bg-[#0e1017]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
              <h2 className="text-xl sm:text-3xl font-bold tracking-tight text-slate-100 mb-2 sm:mb-3">
                Built specifically for college life
              </h2>
              <p className="text-xs sm:text-base text-slate-400 leading-relaxed">
                A social platform tailored to campuses — structured by your actual state, city, and degree.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              <div className="bg-[#12151f] border border-[#212636] rounded-xl p-5 sm:p-6 text-left">
                <div className="w-9 h-9 rounded-lg bg-[#181b26] border border-[#282d3e] flex items-center justify-center text-indigo-400 mb-3 sm:mb-4">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-sm sm:text-base font-semibold text-slate-100 mb-1.5 sm:mb-2">
                  Verified Student Identity
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Every account verifies ownership via cryptographic 6-digit email OTP. Real peers, real conversations.
                </p>
              </div>

              <div className="bg-[#12151f] border border-[#212636] rounded-xl p-5 sm:p-6 text-left">
                <div className="w-9 h-9 rounded-lg bg-[#181b26] border border-[#282d3e] flex items-center justify-center text-indigo-400 mb-3 sm:mb-4">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h3 className="text-sm sm:text-base font-semibold text-slate-100 mb-1.5 sm:mb-2">
                  Campus &amp; Degree Matching
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Dependent location mapping pairs you directly with students studying in your university, year, and program.
                </p>
              </div>

              <div className="bg-[#12151f] border border-[#212636] rounded-xl p-5 sm:p-6 text-left">
                <div className="w-9 h-9 rounded-lg bg-[#181b26] border border-[#282d3e] flex items-center justify-center text-indigo-400 mb-3 sm:mb-4">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-sm sm:text-base font-semibold text-slate-100 mb-1.5 sm:mb-2">
                  Common Interest Circles
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Discover students with shared hobbies — from sports and coding to theatre, design, and competitive debate.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-10 sm:py-14 border-t border-[#181c26] px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
          <div className="bg-[#12151f] border border-[#212636] rounded-xl p-6 sm:p-10">
            <h2 className="text-xl sm:text-3xl font-bold tracking-tight text-slate-100 mb-2 sm:mb-3">
              Ready to find your campus circle?
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto mb-6 leading-relaxed">
              Complete your profile in less than two minutes and start connecting with students from your college.
            </p>
            <Link href="/terms" className="inline-block w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto px-6 sm:px-8">
                Create Student Account
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#181c26] py-6 px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>&copy; {new Date().getFullYear()} Nubpack. All rights reserved.</span>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/terms" className="hover:text-slate-300 transition-colors py-1">
              Terms &amp; Conditions
            </Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors py-1">
              Privacy Policy
            </Link>
            <Link href="/signup" className="hover:text-slate-300 transition-colors py-1">
              Sign Up
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
