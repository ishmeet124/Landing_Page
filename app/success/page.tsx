"use client";

import React from "react";
import Link from "next/link";
import { Check, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-[#0c0e14] text-slate-100 flex flex-col items-center justify-center p-4 sm:p-6">
      {/* Centered Success Card */}
      <div className="w-full max-w-md bg-[#12151f] border border-[#1e2332] rounded-xl p-5 sm:p-9 text-center shadow-sm animate-fade-in">
        {/* Crisp Check Icon */}
        <div className="w-13 h-13 mx-auto mb-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
          <Check className="w-6 h-6 stroke-[2.5]" />
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-bold tracking-tight text-slate-100 mb-2">
          You&apos;re all set!
        </h1>

        <p className="text-sm text-slate-400 leading-relaxed mb-6">
          Your profile has been created and your student identity is verified in Supabase.
        </p>

        {/* Confirmation Pill */}
        <div className="bg-[#161924] border border-[#232838] rounded-lg p-3.5 mb-7 text-left flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 flex-shrink-0">
            <ShieldCheck className="w-4.5 h-4.5" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-200">Verified Campus Profile</div>
            <div className="text-[11px] text-slate-400">Ready to connect with peers &amp; circles</div>
          </div>
        </div>

        {/* Action CTA */}
        <div className="space-y-3">
          <Link href="/">
            <Button size="lg" fullWidth>
              Explore Campus Network
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </Link>
        </div>
      </div>

      <p className="text-xs text-slate-600 mt-8">
        &copy; {new Date().getFullYear()} Nubpack. All rights reserved.
      </p>
    </div>
  );
}
