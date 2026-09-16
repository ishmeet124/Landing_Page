"use client";

import React from "react";
import { useSignup } from "./SignupContext";
import { EmailStep } from "./EmailStep";
import { OtpStep } from "./OtpStep";
import { ProfileStepOne } from "./ProfileStepOne";
import { ProfileStepTwo } from "./ProfileStepTwo";
import { ProfileStepThree } from "./ProfileStepThree";
import { ProfileStepFour } from "./ProfileStepFour";

export function SignupWizard() {
  const { state } = useSignup();

  const renderStep = () => {
    switch (state.currentStep) {
      case 0:
        return <EmailStep />;
      case 1:
        return <OtpStep />;
      case 2:
        return <ProfileStepOne />;
      case 3:
        return <ProfileStepTwo />;
      case 4:
        return <ProfileStepThree />;
      case 5:
        return <ProfileStepFour />;
      default:
        return <EmailStep />;
    }
  };

  return (
    <div className="w-full">
      {renderStep()}
    </div>
  );
}
