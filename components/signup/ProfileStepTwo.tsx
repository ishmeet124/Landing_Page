"use client";

import React, { useEffect, useRef } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { useSignup } from "./SignupContext";
import { ProgressIndicator } from "./ProgressIndicator";
import { profileStep2Schema, type ProfileStep2 } from "@/lib/validation/profile";
import { STATES, getCities, getColleges } from "@/lib/data/locations";

export function ProfileStepTwo() {
  const { state, dispatch } = useSignup();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<ProfileStep2>({
    resolver: zodResolver(profileStep2Schema),
    defaultValues: {
      state: state.state,
      city: state.city,
      college: state.college,
    },
  });

  const selectedState = useWatch({ control, name: "state" });
  const selectedCity = useWatch({ control, name: "city" });

  const prevStateRef = useRef(selectedState);
  const prevCityRef = useRef(selectedCity);

  // Reset city and college when state changes
  useEffect(() => {
    if (prevStateRef.current !== undefined && prevStateRef.current !== selectedState) {
      setValue("city", "");
      setValue("college", "");
    }
    prevStateRef.current = selectedState;
  }, [selectedState, setValue]);

  // Reset college when city changes
  useEffect(() => {
    if (prevCityRef.current !== undefined && prevCityRef.current !== selectedCity) {
      setValue("college", "");
    }
    prevCityRef.current = selectedCity;
  }, [selectedCity, setValue]);

  const cities = getCities(selectedState);
  const colleges = getColleges(selectedState, selectedCity);

  const onSubmit = (data: ProfileStep2) => {
    dispatch({
      type: "UPDATE_PROFILE",
      data: { state: data.state, city: data.city, college: data.college },
    });
    dispatch({ type: "GO_FORWARD" });
  };

  const handleBack = () => {
    dispatch({ type: "GO_BACK" });
  };

  return (
    <div className="animate-fade-in">
      <ProgressIndicator currentStep={2} />

      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight mb-1">
          Campus Location
        </h1>
        <p className="text-sm text-slate-400">
          Select where you study to discover your campus community.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Select
          label="State"
          placeholder="Select state"
          options={STATES.map((s) => ({ value: s, label: s }))}
          error={errors.state?.message}
          {...register("state")}
        />

        <Select
          label="City"
          placeholder={selectedState ? "Select city" : "Choose a state first"}
          options={cities.map((c) => ({ value: c, label: c }))}
          disabled={!selectedState}
          error={errors.city?.message}
          {...register("city")}
        />

        <Select
          label="College / University"
          placeholder={selectedCity ? "Select college" : "Choose a city first"}
          options={colleges.map((c) => ({ value: c, label: c }))}
          disabled={!selectedCity}
          error={errors.college?.message}
          {...register("college")}
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
