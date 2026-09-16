"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, User } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { useSignup } from "./SignupContext";
import { ProgressIndicator } from "./ProgressIndicator";
import { profileStep1Schema, type ProfileStep1 } from "@/lib/validation/profile";
import { PRONOUNS } from "@/lib/data/locations";

export function ProfileStepOne() {
  const { state, dispatch } = useSignup();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileStep1>({
    resolver: zodResolver(profileStep1Schema),
    defaultValues: {
      name: state.name,
      age: state.age ?? undefined,
      pronouns: state.pronouns,
    },
  });

  const onSubmit = (data: ProfileStep1) => {
    dispatch({
      type: "UPDATE_PROFILE",
      data: { name: data.name, age: data.age, pronouns: data.pronouns },
    });
    dispatch({ type: "GO_FORWARD" });
  };

  const handleBack = () => {
    dispatch({ type: "GO_BACK" });
  };

  return (
    <div className="animate-fade-in">
      <ProgressIndicator currentStep={1} />

      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight mb-1">
          Basic Info
        </h1>
        <p className="text-sm text-slate-400">
          Tell us how you&apos;ll appear on your campus profile.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Full Name"
          type="text"
          placeholder="e.g. Alex Johnson"
          autoComplete="name"
          autoFocus
          error={errors.name?.message}
          {...register("name")}
        />

        <div>
          <Input
            label="Age"
            type="number"
            placeholder="18"
            inputMode="numeric"
            error={errors.age?.message}
            {...register("age", { valueAsNumber: true })}
          />
          {!errors.age && (
            <p className="text-[11px] text-slate-500 mt-1">Must be 18 or older to join.</p>
          )}
        </div>

        <Select
          label="Pronouns"
          placeholder="Select your pronouns"
          options={PRONOUNS.map((p) => ({ value: p, label: p }))}
          error={errors.pronouns?.message}
          {...register("pronouns")}
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
          <Button type="submit" size="lg" className="flex-1">
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
}
