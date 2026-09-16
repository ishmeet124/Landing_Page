import { NextRequest, NextResponse } from "next/server";
import { sendOtpSchema } from "@/lib/validation/auth";
import { generateOtp } from "@/lib/otp/generate";
import { hashOtp } from "@/lib/otp/hash";
import { sendOtpEmail } from "@/lib/otp/email";
import { getServiceSupabase } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = sendOtpSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const { email } = result.data;
    const supabase = getServiceSupabase();

    // Invalidate previous active OTPs for this email
    await supabase
      .from("email_otps")
      .update({ verified: true })
      .eq("email", email)
      .eq("verified", false);

    // Generate and hash the OTP
    const otp = generateOtp();
    const otpHash = hashOtp(otp);

    const expiryMinutes = parseInt(process.env.OTP_EXPIRY_MINUTES || "5", 10);
    const expiresAt = new Date(Date.now() + expiryMinutes * 60 * 1000).toISOString();

    // Store hashed OTP in database
    const { error: insertError } = await supabase.from("email_otps").insert({
      email,
      otp_hash: otpHash,
      expires_at: expiresAt,
      attempts: 0,
      verified: false,
    });

    if (insertError) {
      console.error("Failed to store OTP:", insertError.message);
      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: 500 }
      );
    }

    // Create or find profile record
    const { data: existingProfile } = await supabase
      .from("profiles")
      .select("id")
      .eq("email", email)
      .single();

    if (!existingProfile) {
      await supabase.from("profiles").insert({ email });
    }

    // Send OTP via SMTP — the OTP is NEVER logged
    try {
      await sendOtpEmail(email, otp);
    } catch (smtpError) {
      console.error("SMTP error:", (smtpError as Error).message);
      return NextResponse.json(
        { error: "Unable to send verification code. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("send-otp error:", (error as Error).message);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
