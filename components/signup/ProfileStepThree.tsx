"use client";

import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useSignup } from "./SignupContext";
import { ProgressIndicator } from "./ProgressIndicator";
import { profileStep3Schema, type ProfileStep3 } from "@/lib/validation/profile";
import { INTERESTS } from "@/lib/data/locations";

export function ProfileStepThree() {
  const { state, dispatch } = useSignup();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<ProfileStep3>({
    resolver: zodResolver(profileStep3Schema),
    defaultValues: {
      bio: state.bio,
      interests: state.interests,
    },
  });

  const bio = useWatch({ control, name: "bio" }) || "";
  const selectedInterests = useWatch({ control, name: "interests" }) || [];

  const toggleInterest = (interest: string) => {
    const current = [...selectedInterests];
    const idx = current.indexOf(interest);
    if (idx >= 0) {
      current.splice(idx, 1);
    } else if (current.length < 10) {
      current.push(interest);
    }
    setValue("interests", current, { shouldValidate: true });
  };

  const onSubmit = (data: ProfileStep3) => {
    dispatch({
      type: "UPDATE_PROFILE",
      data: { bio: data.bio, interests: data.interests },
    });
    dispatch({ type: "GO_FORWARD" });
  };

  const handleBack = () => {
    dispatch({ type: "GO_BACK" });
  };

  return (
    <div className="animate-fade-in">
      <ProgressIndicator currentStep={3} />

      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight mb-1">
          About You
        </h1>
        <p className="text-sm text-slate-400">
          Share a quick intro and select topics you care about.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Bio */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="bio"
              className="block text-xs font-medium text-slate-300"
            >
              Bio <span className="text-slate-500 font-normal">(optional)</span>
            </label>
            <span
              className={`text-[11px] ${
                bio.length > 280 ? "text-amber-400 font-medium" : "text-slate-500"
              }`}
            >
              {bio.length}/300
            </span>
          </div>
          <textarea
            id="bio"
            rows={3}
            maxLength={300}
            placeholder="Tell fellow students a bit about your passions, hobbies, or campus life..."
            className={`w-full bg-[#141722] border ${
              errors.bio
                ? "border-red-500/80 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                : "border-[#222736] focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            } rounded-lg px-3.5 py-2.5 text-slate-100 placeholder-slate-500 text-sm transition-colors duration-150 focus:outline-none resize-none`}
            {...register("bio")}
          />
          {errors.bio && (
            <p className="text-xs text-red-400 font-medium mt-1">{errors.bio.message}</p>
          )}
        </div>

        {/* Interests */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-medium text-slate-300">
              Interests <span className="text-slate-500 font-normal">(select 1 to 10)</span>
            </label>
            <span className="text-[11px] text-slate-400">
              {selectedInterests.length}/10 chosen
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto pr-1 py-1">
            {INTERESTS.map((interest) => {
              const isSelected = selectedInterests.includes(interest);
              return (
                <button
                  key={interest}
                  type="button"
                  onClick={() => toggleInterest(interest)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors duration-150 cursor-pointer select-none touch-manipulation ${
                    isSelected
                      ? "bg-indigo-600 text-white"
                      : "bg-[#141722] text-slate-300 border border-[#222736] hover:border-slate-500 hover:text-slate-100"
                  }`}
                >
                  {interest}
                </button>
              );
            })}
          </div>
          {errors.interests && (
            <p className="text-xs text-red-400 font-medium mt-1.5">
              {errors.interests.message}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2.5 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            className="flex items-center justify-center gap-1.5 px-4 flex-shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <Button type="submit" size="lg" className="flex-1">
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
}
