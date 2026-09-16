"use client";

import React, { forwardRef } from "react";
import { ChevronDown } from "lucide-react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, placeholder, id, className = "", ...props }, ref) => {
    const selectId = id || label.toLowerCase().replace(/\s+/g, "-");
    const errorId = `${selectId}-error`;

    return (
      <div className="w-full">
        <label
          htmlFor={selectId}
          className="block text-xs font-medium text-slate-300 mb-1.5"
        >
          {label}
        </label>
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
            className={`w-full h-11 appearance-none bg-[#141722] border ${
              error
                ? "border-red-500/80 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                : "border-[#222736] focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            } rounded-lg px-3.5 text-slate-100 text-sm transition-colors duration-150 focus:outline-none pr-10 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
            {...props}
          >
            {placeholder && (
              <option value="" className="bg-[#141722] text-slate-500">
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option
                key={opt.value}
                value={opt.value}
                className="bg-[#141722] text-slate-100"
              >
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>
        {error && (
          <p id={errorId} className="mt-1 text-xs text-red-400 font-medium" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";
