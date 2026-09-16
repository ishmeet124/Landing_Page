import { z } from "zod";

const trimmedString = (fieldName: string) =>
  z
    .string()
    .trim()
    .min(1, `${fieldName} is required`)
    .refine((v) => v.trim().length > 0, `${fieldName} cannot be empty`);

export const profileStep1Schema = z.object({
  name: trimmedString("Name").pipe(
    z.string().max(100, "Name must be 100 characters or fewer")
  ),
  age: z
    .number({ error: "Age must be a number" })
    .int("Age must be a whole number")
    .min(18, "You must be 18 or older to continue.")
    .max(120, "Please enter a valid age"),
  pronouns: trimmedString("Pronouns"),
});

export const profileStep2Schema = z.object({
  state: trimmedString("State"),
  city: trimmedString("City"),
  college: trimmedString("College"),
});

export const profileStep3Schema = z.object({
  bio: z
    .string()
    .trim()
    .max(300, "Bio must be 300 characters or fewer"),
  interests: z
    .array(z.string())
    .min(1, "Select at least one interest")
    .max(10, "You can select up to 10 interests"),
});

export const profileStep4Schema = z.object({
  yearOfStudy: trimmedString("Year of study"),
  degreeProgram: z
    .string()
    .trim()
    .max(150, "Degree must be 150 characters or fewer"),
  instagramUrl: z
    .string()
    .trim()
    .refine(
      (v) =>
        !v ||
        v.startsWith("https://instagram.com/") ||
        v.startsWith("https://www.instagram.com/") ||
        /^@?[\w.]+$/.test(v),
      "Enter a valid Instagram handle or URL"
    ),
  linkedinUrl: z
    .string()
    .trim()
    .refine(
      (v) =>
        !v ||
        v.startsWith("https://linkedin.com/") ||
        v.startsWith("https://www.linkedin.com/") ||
        v.startsWith("https://in.linkedin.com/"),
      "Enter a valid LinkedIn URL"
    ),
});

export const fullProfileSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address"),
  name: trimmedString("Name").pipe(
    z.string().max(100, "Name must be 100 characters or fewer")
  ),
  age: z
    .number({ error: "Age must be a number" })
    .int("Age must be a whole number")
    .min(18, "You must be 18 or older to continue.")
    .max(120, "Please enter a valid age"),
  pronouns: trimmedString("Pronouns"),
  state: trimmedString("State"),
  city: trimmedString("City"),
  college: trimmedString("College"),
  bio: z.string().trim().max(300, "Bio must be 300 characters or fewer"),
  interests: z
    .array(z.string())
    .min(1, "Select at least one interest")
    .max(10, "You can select up to 10 interests"),
  yearOfStudy: trimmedString("Year of study"),
  degreeProgram: z
    .string()
    .trim()
    .max(150, "Degree must be 150 characters or fewer"),
  instagramUrl: z
    .string()
    .trim()
    .refine(
      (v) =>
        !v ||
        v.startsWith("https://instagram.com/") ||
        v.startsWith("https://www.instagram.com/") ||
        /^@?[\w.]+$/.test(v),
      "Enter a valid Instagram handle or URL"
    ),
  linkedinUrl: z
    .string()
    .trim()
    .refine(
      (v) =>
        !v ||
        v.startsWith("https://linkedin.com/") ||
        v.startsWith("https://www.linkedin.com/") ||
        v.startsWith("https://in.linkedin.com/"),
      "Enter a valid LinkedIn URL"
    ),
});

export type ProfileStep1 = z.infer<typeof profileStep1Schema>;
export type ProfileStep2 = z.infer<typeof profileStep2Schema>;
export type ProfileStep3 = z.infer<typeof profileStep3Schema>;
export type ProfileStep4 = z.infer<typeof profileStep4Schema>;
export type FullProfile = z.infer<typeof fullProfileSchema>;
