"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Users, Sparkles } from "lucide-react";
import { SignupProvider } from "@/components/signup/SignupContext";
import { SignupWizard } from "@/components/signup/SignupWizard";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-[#0c0e14] flex flex-col text-slate-100">
      {/* Top Header */}
      <header className="border-b border-[#1b1f2b] px-4 py-3.5 sm:px-8 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white text-xs">
            N
          </div>
          <span className="text-base font-semibold tracking-tight text-white group-hover:text-slate-200 transition-colors">
            nubpack
          </span>
          <span className="hidden sm:inline-block text-[11px] font-medium text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-full ml-1">
            Campus
          </span>
        </Link>

        <Link
          href="/"
          className="text-xs text-slate-400 hover:text-slate-200 transition-colors"
        >
          Cancel
        </Link>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center p-3 sm:p-6 lg:p-10">
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Context Column (Desktop only) */}
          <div className="hidden lg:flex lg:col-span-5 flex-col justify-center pr-4">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Student Onboarding
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-100 tracking-tight leading-snug mb-3">
              Join your campus network in minutes.
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed mb-8">
              Verify your student email to unlock college circles, discover clubs, and connect with peers from your batch.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-md bg-[#161924] border border-[#232838] flex items-center justify-center flex-shrink-0 text-indigo-400 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-slate-200">Verified student access</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Zero spam or anonymous bots. Every profile is backed by OTP verification.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-md bg-[#161924] border border-[#232838] flex items-center justify-center flex-shrink-0 text-indigo-400 mt-0.5">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-slate-200">Campus &amp; batch circles</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Find classmates in your state, city, and degree program with zero friction.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#1b1f2b] text-[11px] text-slate-500">
              Active across 200+ universities in India.
            </div>
          </div>

          {/* Right Form Column */}
          <div className="w-full lg:col-span-7 flex justify-center">
            <div className="w-full max-w-[460px] bg-[#12151f] border border-[#1e2332] rounded-xl p-4 sm:p-7 shadow-sm">
              <SignupProvider>
                <SignupWizard />
              </SignupProvider>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
