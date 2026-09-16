"use client";

import React, { forwardRef } from "react";
import { Check } from "lucide-react";

interface CheckboxProps {
  label: React.ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
  id?: string;
  error?: string;
}

export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ label, checked, onChange, id, error }, ref) => {
    const checkboxId = id || "checkbox";

    return (
      <div className="w-full">
        <button
          ref={ref}
          type="button"
          role="checkbox"
          id={checkboxId}
          aria-checked={checked}
          onClick={() => onChange(!checked)}
          className="flex items-start gap-3 text-left w-full group focus:outline-none"
        >
          <span
            className={`mt-0.5 flex-shrink-0 w-4.5 h-4.5 rounded-md border flex items-center justify-center transition-colors duration-150 ${
              checked
                ? "bg-indigo-600 border-indigo-600"
                : "border-[#2e3448] bg-[#141722] group-hover:border-slate-400 group-focus:ring-2 group-focus:ring-indigo-500/30"
            }`}
          >
            {checked && <Check className="w-3 h-3 text-white stroke-[2.5]" />}
          </span>
          <span className="text-sm text-slate-300 leading-relaxed select-none">{label}</span>
        </button>
        {error && (
          <p className="mt-1 text-xs text-red-400 font-medium ml-7" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
