"use client";

import React from "react";
import { Check } from "lucide-react";

interface ProgressIndicatorProps {
  currentStep: number; // 1-4 (profile steps only)
  totalSteps?: number;
}

const STEP_LABELS = ["Basic Info", "Location", "About You", "Final Details"];

export function ProgressIndicator({
  currentStep,
  totalSteps = 4,
}: ProgressIndicatorProps) {
  return (
    <div className="w-full">
      {/* Mobile compact indicator */}
      <div className="sm:hidden mb-6">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-medium">
          <span className="text-indigo-400 font-semibold">Step {currentStep} of {totalSteps}</span>
          <span className="text-slate-200">{STEP_LABELS[currentStep - 1]}</span>
        </div>
        <div className="h-1 w-full bg-[#1c202c] rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-500 rounded-full transition-all duration-200 ease-out"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Desktop step track */}
      <div className="hidden sm:block mb-8">
        <div className="flex items-center justify-between">
          {Array.from({ length: totalSteps }, (_, i) => {
            const stepNum = i + 1;
            const isCompleted = stepNum < currentStep;
            const isCurrent = stepNum === currentStep;

            return (
              <React.Fragment key={stepNum}>
                <div className="flex items-center gap-1.5 md:gap-2 flex-shrink-0">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium transition-colors duration-150 ${
                      isCompleted
                        ? "bg-indigo-600 text-white"
                        : isCurrent
                          ? "bg-indigo-600/20 border border-indigo-500 text-indigo-400 font-bold"
                          : "bg-[#161924] border border-[#232838] text-slate-500"
                    }`}
                  >
                    {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[2.5]" /> : stepNum}
                  </div>
                  <span
                    className={`text-[11px] md:text-xs font-medium ${
                      isCurrent ? "text-slate-100" : isCompleted ? "text-slate-300" : "text-slate-500"
                    }`}
                  >
                    {STEP_LABELS[i]}
                  </span>
                </div>
                {i < totalSteps - 1 && (
                  <div
                    className={`flex-1 h-px mx-1.5 md:mx-3 transition-colors duration-200 ${
                      stepNum < currentStep ? "bg-indigo-600" : "bg-[#212636]"
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
