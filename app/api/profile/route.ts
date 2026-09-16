import { NextRequest, NextResponse } from "next/server";
import { fullProfileSchema } from "@/lib/validation/profile";
import { getServiceSupabase } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = fullProfileSchema.safeParse(body);

    if (!result.success) {
      const firstError = result.error.issues[0]?.message || "Invalid profile data.";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const data = result.data;
    const supabase = getServiceSupabase();

    // Confirm email has been verified
    const { data: existingProfile, error: lookupError } = await supabase
      .from("profiles")
      .select("id, email_verified")
      .eq("email", data.email)
      .single();

    if (lookupError || !existingProfile) {
      return NextResponse.json(
        { error: "Profile not found. Please verify your email first." },
        { status: 400 }
      );
    }

    if (!existingProfile.email_verified) {
      return NextResponse.json(
        { error: "Email has not been verified. Please verify your email first." },
        { status: 403 }
      );
    }

    // Normalize instagram and linkedin URLs
    let instagram = data.instagramUrl?.trim() || "";
    if (instagram && !instagram.startsWith("http")) {
      const handle = instagram.replace(/^@/, "");
      instagram = `https://instagram.com/${handle}`;
    }

    let linkedin = data.linkedinUrl?.trim() || "";
    if (linkedin && !linkedin.startsWith("http")) {
      linkedin = `https://${linkedin}`;
    }

    // Upsert profile — update the existing record
    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        name: data.name.trim(),
        age: data.age,
        pronouns: data.pronouns.trim(),
        state: data.state.trim(),
        city: data.city.trim(),
        college: data.college.trim(),
        bio: data.bio?.trim() || "",
        interests: Array.from(new Set(data.interests.map((i) => i.trim()))),
        year_of_study: data.yearOfStudy.trim(),
        degree_program: data.degreeProgram?.trim() || "",
        instagram_url: instagram,
        linkedin_url: linkedin,
      })
      .eq("id", existingProfile.id);

    if (updateError) {
      console.error("Profile update error:", updateError.message);
      return NextResponse.json(
        { error: "Unable to save your profile. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, profileId: existingProfile.id });
  } catch (error) {
    console.error("profile error:", (error as Error).message);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
