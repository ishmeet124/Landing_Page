"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ScrollText } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";

const TERMS_CONTENT = [
  {
    title: "1. Acceptance of Terms",
    content:
      "By creating an account on Nubpack, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree to these terms, you may not use our services.",
  },
  {
    title: "2. Eligibility",
    content:
      "You must be at least 18 years of age and currently enrolled in or affiliated with a recognized educational institution to use Nubpack. By using our platform, you represent and warrant that you meet these eligibility requirements.",
  },
  {
    title: "3. Account Registration",
    content:
      "You agree to provide accurate, current, and complete information during the registration process. You are responsible for maintaining the confidentiality of your account and for all activities that occur under your account. You must notify us immediately of any unauthorized use.",
  },
  {
    title: "4. User Conduct",
    content:
      "You agree not to use Nubpack to: (a) harass, bully, or intimidate other users; (b) post or share content that is offensive, discriminatory, or harmful; (c) impersonate another person or entity; (d) use the platform for any illegal or unauthorized purpose; (e) attempt to gain unauthorized access to other users' accounts or data.",
  },
  {
    title: "5. Content & Intellectual Property",
    content:
      "You retain ownership of the content you post on Nubpack. However, by posting content, you grant Nubpack a non-exclusive, worldwide, royalty-free license to use, display, and distribute your content in connection with our services. Nubpack and its logos are trademarks. You may not use them without prior written consent.",
  },
  {
    title: "6. Privacy & Data",
    content:
      "Your privacy is important to us. We collect and process personal data as described in our Privacy Policy. By using Nubpack, you consent to the collection, use, and storage of your information as outlined in our Privacy Policy. We implement appropriate technical and organizational measures to protect your data.",
  },
  {
    title: "7. Community Guidelines",
    content:
      "Nubpack is a community-driven platform. Users are expected to treat each other with respect and dignity. We reserve the right to remove any content or suspend any account that violates our community guidelines. Repeated violations may result in permanent account termination.",
  },
  {
    title: "8. Limitation of Liability",
    content:
      "Nubpack is provided 'as is' without warranties of any kind. We do not guarantee that the platform will be available at all times or that it will be free of errors. In no event shall Nubpack be liable for any indirect, incidental, or consequential damages arising from your use of the platform.",
  },
  {
    title: "9. Modifications",
    content:
      "We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting. Your continued use of Nubpack after any changes constitutes your acceptance of the revised terms.",
  },
  {
    title: "10. Contact",
    content:
      "If you have any questions about these Terms and Conditions, please contact us at support@nubpack.com.",
  },
];

export default function TermsPage() {
  const [accepted, setAccepted] = useState(false);
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#0c0e14] text-slate-100 flex flex-col">
      {/* Header */}
      <header className="border-b border-[#1c202c] sticky top-0 z-40 bg-[#0c0e14]/90 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="p-1.5 rounded-lg border border-[#262b3a] bg-[#141722] text-slate-400 hover:text-slate-100 hover:bg-[#1a1e2c] transition-colors"
            aria-label="Back to home"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold tracking-tight text-white">
              nubpack
            </span>
            <span className="text-slate-500 text-xs">/</span>
            <span className="text-xs font-medium text-slate-400">Legal</span>
          </div>
        </div>

        <span className="text-xs text-slate-500">Updated for 2026</span>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-100 mb-2">
            Terms &amp; Conditions
          </h1>
          <p className="text-sm text-slate-400 leading-relaxed">
            Please review our community standards and usage agreement before joining Nubpack.
          </p>
        </div>

        {/* Scrollable Terms Content */}
        <div className="bg-[#12151f] border border-[#1e2332] rounded-xl p-5 sm:p-7 mb-6 max-h-[50vh] sm:max-h-[55vh] overflow-y-auto space-y-6">
          {TERMS_CONTENT.map((section) => (
            <div key={section.title} className="space-y-1.5 border-b border-[#1b1f2b] pb-4 last:border-0 last:pb-0">
              <h2 className="text-sm font-semibold text-slate-200">
                {section.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        {/* Accept & Action Section */}
        <div className="bg-[#12151f] border border-[#1e2332] rounded-xl p-4 sm:p-5 space-y-4">
          <Checkbox
            id="accept-terms"
            label={
              <span>
                I agree to the{" "}
                <span className="text-indigo-400 font-medium">Terms of Service</span> and{" "}
                <span className="text-indigo-400 font-medium">Privacy Policy</span>, and confirm I am 18 or older.
              </span>
            }
            checked={accepted}
            onChange={setAccepted}
          />

          <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-3 pt-1">
            <Link href="/" className="flex-shrink-0">
              <Button variant="outline" className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4">
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            </Link>
            <Button
              fullWidth
              size="lg"
              disabled={!accepted}
              onClick={() => router.push("/signup")}
              id="continue-to-signup"
              className="w-full sm:flex-1 text-sm sm:text-base"
            >
              Accept &amp; Continue to Sign Up
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
