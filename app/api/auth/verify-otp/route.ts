import { NextRequest, NextResponse } from "next/server";
import { verifyOtpSchema } from "@/lib/validation/auth";
import { hashOtp } from "@/lib/otp/hash";
import { getServiceSupabase } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = verifyOtpSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid verification code." },
        { status: 400 }
      );
    }

    const { email, otp } = result.data;
    const supabase = getServiceSupabase();

    // Find the latest active (non-verified) OTP for this email
    const { data: otpRecord, error: fetchError } = await supabase
      .from("email_otps")
      .select("*")
      .eq("email", email)
      .eq("verified", false)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (fetchError || !otpRecord) {
      return NextResponse.json(
        { error: "No active verification code found. Please request a new one." },
        { status: 400 }
      );
    }

    // Check expiration
    if (new Date(otpRecord.expires_at) < new Date()) {
      return NextResponse.json(
        { error: "Your verification code has expired. Please request a new one." },
        { status: 400 }
      );
    }

    // Check attempt limit
    if (otpRecord.attempts >= 5) {
      return NextResponse.json(
        { error: "Too many attempts. Please request a new verification code." },
        { status: 429 }
      );
    }

    // Hash submitted OTP and compare
    const submittedHash = hashOtp(otp);

    if (submittedHash !== otpRecord.otp_hash) {
      // Increment attempts
      await supabase
        .from("email_otps")
        .update({ attempts: otpRecord.attempts + 1 })
        .eq("id", otpRecord.id);

      const remaining = 4 - otpRecord.attempts;
      return NextResponse.json(
        {
          error:
            remaining > 0
              ? `Incorrect verification code. ${remaining} attempt${remaining === 1 ? "" : "s"} remaining.`
              : "Too many attempts. Please request a new verification code.",
        },
        { status: 400 }
      );
    }

    // Success — mark OTP as verified
    await supabase
      .from("email_otps")
      .update({ verified: true })
      .eq("id", otpRecord.id);

    // Invalidate all other active OTPs for this email
    await supabase
      .from("email_otps")
      .update({ verified: true })
      .eq("email", email)
      .eq("verified", false);

    // Mark profile email as verified
    const { data: profile } = await supabase
      .from("profiles")
      .update({ email_verified: true })
      .eq("email", email)
      .select("id")
      .single();

    return NextResponse.json({
      success: true,
      profileId: profile?.id || null,
    });
  } catch (error) {
    console.error("verify-otp error:", (error as Error).message);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
