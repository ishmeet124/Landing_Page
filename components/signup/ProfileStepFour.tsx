"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { useSignup } from "./SignupContext";
import { ProgressIndicator } from "./ProgressIndicator";
import { useToast } from "@/components/ui/Toast";
import { profileStep4Schema, type ProfileStep4 } from "@/lib/validation/profile";
import { YEARS_OF_STUDY } from "@/lib/data/locations";

export function ProfileStepFour() {
  const router = useRouter();
  const { state, dispatch } = useSignup();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileStep4>({
    resolver: zodResolver(profileStep4Schema),
    defaultValues: {
      yearOfStudy: state.yearOfStudy,
      degreeProgram: state.degreeProgram,
      instagramUrl: state.instagramUrl,
      linkedinUrl: state.linkedinUrl,
    },
  });

  const onSubmit = async (data: ProfileStep4) => {
    setSaving(true);

    // Save locally first
    dispatch({
      type: "UPDATE_PROFILE",
      data: {
        yearOfStudy: data.yearOfStudy,
        degreeProgram: data.degreeProgram || "",
        instagramUrl: data.instagramUrl || "",
        linkedinUrl: data.linkedinUrl || "",
      },
    });

    // Submit full profile to API
    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: state.email,
          name: state.name,
          age: state.age,
          pronouns: state.pronouns,
          state: state.state,
          city: state.city,
          college: state.college,
          bio: state.bio,
          interests: state.interests,
          yearOfStudy: data.yearOfStudy,
          degreeProgram: data.degreeProgram || "",
          instagramUrl: data.instagramUrl || "",
          linkedinUrl: data.linkedinUrl || "",
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        toast("error", result.error || "Unable to save your profile. Please try again.");
        return;
      }

      toast("success", "Profile completed successfully!");

      // Navigate to success page
      router.push("/success");
    } catch {
      toast("error", "Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleBack = () => {
    dispatch({ type: "GO_BACK" });
  };

  return (
    <div className="animate-fade-in">
      <ProgressIndicator currentStep={4} />

      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight mb-1">
          Academic &amp; Socials
        </h1>
        <p className="text-sm text-slate-400">
          Almost there! Add your year, major, and optional social handles.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Select
          label="Year of Study"
          placeholder="Select year of study"
          options={YEARS_OF_STUDY.map((y) => ({ value: y, label: y }))}
          error={errors.yearOfStudy?.message}
          {...register("yearOfStudy")}
        />

        <Input
          label="Degree / Major"
          type="text"
          placeholder="e.g. B.Tech Computer Science, B.Com, Design"
          error={errors.degreeProgram?.message}
          {...register("degreeProgram")}
        />

        <Input
          label="Instagram Handle or Link"
          type="text"
          placeholder="@username or https://instagram.com/username (optional)"
          error={errors.instagramUrl?.message}
          {...register("instagramUrl")}
        />

        <Input
          label="LinkedIn Profile"
          type="text"
          placeholder="https://linkedin.com/in/username (optional)"
          error={errors.linkedinUrl?.message}
          {...register("linkedinUrl")}
        />

        <div className="flex items-center gap-2.5 pt-3">
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            className="flex items-center justify-center gap-1.5 px-4 flex-shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <Button type="submit" size="lg" className="flex-1" loading={saving}>
            {saving ? "Saving profile..." : "Finish & Join Campus"}
          </Button>
        </div>
      </form>
    </div>
  );
}
