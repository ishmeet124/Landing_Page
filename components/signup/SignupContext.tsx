"use client";

import React, { createContext, useContext, useReducer } from "react";

export interface SignupState {
  currentStep: number; // 0=email, 1=otp, 2=step1, 3=step2, 4=step3, 5=step4
  email: string;
  emailVerified: boolean;
  profileId: string | null;
  name: string;
  age: number | null;
  pronouns: string;
  state: string;
  city: string;
  college: string;
  bio: string;
  interests: string[];
  yearOfStudy: string;
  degreeProgram: string;
  instagramUrl: string;
  linkedinUrl: string;
}

type Action =
  | { type: "SET_EMAIL"; email: string }
  | { type: "SET_VERIFIED"; profileId: string | null }
  | { type: "SET_STEP"; step: number }
  | { type: "UPDATE_PROFILE"; data: Partial<SignupState> }
  | { type: "GO_BACK" }
  | { type: "GO_FORWARD" }
  | { type: "RESET" };

const initialState: SignupState = {
  currentStep: 0,
  email: "",
  emailVerified: false,
  profileId: null,
  name: "",
  age: null,
  pronouns: "",
  state: "",
  city: "",
  college: "",
  bio: "",
  interests: [],
  yearOfStudy: "",
  degreeProgram: "",
  instagramUrl: "",
  linkedinUrl: "",
};

function signupReducer(state: SignupState, action: Action): SignupState {
  switch (action.type) {
    case "SET_EMAIL":
      return { ...state, email: action.email };
    case "SET_VERIFIED":
      return {
        ...state,
        emailVerified: true,
        profileId: action.profileId,
      };
    case "SET_STEP":
      return { ...state, currentStep: action.step };
    case "UPDATE_PROFILE":
      return { ...state, ...action.data };
    case "GO_BACK":
      return {
        ...state,
        currentStep: Math.max(0, state.currentStep - 1),
      };
    case "GO_FORWARD":
      return {
        ...state,
        currentStep: Math.min(5, state.currentStep + 1),
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

interface SignupContextValue {
  state: SignupState;
  dispatch: React.Dispatch<Action>;
}

const SignupContext = createContext<SignupContextValue | null>(null);

export function useSignup() {
  const ctx = useContext(SignupContext);
  if (!ctx) throw new Error("useSignup must be used within SignupProvider");
  return ctx;
}

export function SignupProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(signupReducer, initialState);

  return (
    <SignupContext.Provider value={{ state, dispatch }}>
      {children}
    </SignupContext.Provider>
  );
}
