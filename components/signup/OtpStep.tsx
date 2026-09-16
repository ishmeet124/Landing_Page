"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useSignup } from "./SignupContext";
import { useToast } from "@/components/ui/Toast";

function maskEmail(email: string): string {
  const [local, domain] = email.split("@");
  if (!local || !domain) return email;
  const visible = local.slice(0, Math.min(2, local.length));
  return `${visible}${"*".repeat(Math.max(local.length - 2, 0))}@${domain}`;
}

export function OtpStep() {
  const { state, dispatch } = useSignup();
  const { toast } = useToast();
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(30);
  const [error, setError] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Focus first input on mount
  useEffect(() => {
    if (!state.emailVerified) {
      inputRefs.current[0]?.focus();
    }
  }, [state.emailVerified]);

  // Resend countdown timer
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((p) => Math.max(0, p - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const submitCode = useCallback(async (codeToVerify: string) => {
    if (codeToVerify.length !== 6) {
      setError("Please enter the complete 6-digit code.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: state.email, otp: codeToVerify }),
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.error || "Verification failed.");
        setOtp(Array(6).fill(""));
        inputRefs.current[0]?.focus();
        return;
      }

      dispatch({ type: "SET_VERIFIED", profileId: result.profileId });
      dispatch({ type: "GO_FORWARD" });
      toast("success", "Email verified successfully!");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [state.email, dispatch, toast]);

  const handleChange = (index: number, value: string) => {
    // Only allow digits
    const digit = value.replace(/\D/g, "").slice(-1);
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);
    setError("");

    // Auto-advance
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit if all 6 digits entered
    if (digit && newOtp.every((d) => d !== "")) {
      submitCode(newOtp.join(""));
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    if (pasted.length === 0) return;

    const newOtp = [...otp];
    for (let i = 0; i < 6; i++) {
      newOtp[i] = pasted[i] || "";
    }
    setOtp(newOtp);
    setError("");

    // Focus last filled or the next empty
    const focusIndex = Math.min(pasted.length, 5);
    inputRefs.current[focusIndex]?.focus();

    if (pasted.length === 6) {
      submitCode(pasted);
    }
  };

  const resendOtp = async () => {
    if (resendCooldown > 0 || resending) return;

    setResending(true);
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: state.email }),
      });

      const result = await res.json();

      if (!res.ok) {
        toast("error", result.error || "Failed to resend code.");
        return;
      }

      setOtp(Array(6).fill(""));
      setError("");
      setResendCooldown(30);
      inputRefs.current[0]?.focus();
      toast("success", "New verification code sent.");
    } catch {
      toast("error", "Network error. Please try again.");
    } finally {
      setResending(false);
    }
  };

  const handleBack = () => {
    dispatch({ type: "GO_BACK" });
  };

  // If already verified and navigating backward, allow continuing or changing email
  if (state.emailVerified) {
    return (
      <div className="animate-fade-in text-center py-4">
        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
          <ShieldCheck className="w-6 h-6 text-emerald-400" />
        </div>
        <h2 className="text-xl font-bold text-slate-100 mb-1">
          Email Verified
        </h2>
        <p className="text-xs text-slate-400 mb-1">
          Your email has been successfully confirmed:
        </p>
        <p className="text-sm font-medium text-slate-200 mb-6">
          {state.email}
        </p>
        <div className="space-y-3">
          <Button
            fullWidth
            size="lg"
            onClick={() => dispatch({ type: "GO_FORWARD" })}
          >
            Continue to Profile
          </Button>
          <button
            onClick={() => {
              dispatch({ type: "SET_STEP", step: 0 });
            }}
            className="flex items-center justify-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors w-full cursor-pointer pt-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Use a different email
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <button
        type="button"
        onClick={handleBack}
        className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors mb-5 cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back
      </button>

      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight mb-2">
          Verify your email
        </h1>
        <p className="text-sm text-slate-400 leading-relaxed">
          We sent a 6-digit verification code to{" "}
          <span className="text-slate-200 font-medium">{maskEmail(state.email)}</span>
        </p>
      </div>

      {/* OTP Inputs */}
      <div className="flex justify-center items-center gap-1.5 sm:gap-2.5 mb-4 w-full" onPaste={handlePaste}>
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => { inputRefs.current[index] = el; }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            aria-label={`Digit ${index + 1}`}
            className={`w-9 sm:w-11 h-11 sm:h-13 max-w-[46px] min-w-0 flex-1 text-center text-base sm:text-xl font-mono font-semibold rounded-lg border bg-[#141722] text-slate-100 transition-colors duration-150 focus:outline-none ${
              error
                ? "border-red-500/80 focus:border-red-500 focus:ring-1 focus:ring-red-500 animate-shake"
                : digit
                  ? "border-indigo-500"
                  : "border-[#242938] focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            }`}
          />
        ))}
      </div>

      {error && (
        <p className="text-red-400 text-xs text-center font-medium mb-4" role="alert">
          {error}
        </p>
      )}

      <div className="pt-2">
        <Button
          fullWidth
          size="lg"
          loading={loading}
          onClick={() => submitCode(otp.join(""))}
        >
          Verify Code
        </Button>
      </div>

      {/* Resend & Change Email */}
      <div className="flex flex-col items-center gap-2.5 mt-5">
        <div className="text-xs text-slate-400">
          Didn&apos;t receive it?{" "}
          <button
            onClick={resendOtp}
            disabled={resendCooldown > 0 || resending}
            className={`font-medium transition-colors ${
              resendCooldown > 0 || resending
                ? "text-slate-600 cursor-not-allowed"
                : "text-indigo-400 hover:text-indigo-300 cursor-pointer"
            }`}
          >
            {resending
              ? "Resending..."
              : resendCooldown > 0
                ? `Resend code in ${resendCooldown}s`
                : "Resend code"}
          </button>
        </div>

        <button
          onClick={handleBack}
          className="text-xs text-slate-500 hover:text-slate-400 transition-colors cursor-pointer"
        >
          Entered the wrong email? Change it
        </button>
      </div>
    </div>
  );
}
