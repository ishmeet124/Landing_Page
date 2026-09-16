"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useSignup } from "./SignupContext";
import { useToast } from "@/components/ui/Toast";

const emailSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .transform((v) => v.toLowerCase()),
});

type EmailFormData = z.infer<typeof emailSchema>;

export function EmailStep() {
  const { state, dispatch } = useSignup();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: state.email },
  });

  const onSubmit = async (data: EmailFormData) => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email }),
      });

      const result = await res.json();

      if (!res.ok) {
        toast("error", result.error || "Unable to send verification code.");
        return;
      }

      dispatch({ type: "SET_EMAIL", email: data.email });
      dispatch({ type: "GO_FORWARD" });
      toast("success", "Verification code sent to your email.");
    } catch {
      toast("error", "Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <span className="inline-block text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-2">
          Step 1 of 2 · Account Setup
        </span>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight mb-2">
          What&apos;s your email?
        </h1>
        <p className="text-sm text-slate-400 leading-relaxed">
          We&apos;ll send you a 6-digit verification code to confirm your account.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="College or Personal Email"
          type="email"
          placeholder="name@college.edu or name@gmail.com"
          autoComplete="email"
          autoFocus
          icon={<Mail className="w-4 h-4" />}
          error={errors.email?.message}
          {...register("email")}
        />

        <div className="pt-2">
          <Button type="submit" fullWidth loading={loading} size="lg">
            Send verification code
          </Button>
        </div>

        <p className="text-xs text-slate-500 text-center pt-2">
          Make sure you have access to this inbox to receive your code.
        </p>
      </form>
    </div>
  );
}
