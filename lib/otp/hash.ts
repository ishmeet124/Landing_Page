import crypto from "crypto";

/**
 * Hash an OTP using SHA-256.
 * We never store or compare plain-text OTPs.
 */
export function hashOtp(otp: string): string {
  return crypto.createHash("sha256").update(otp).digest("hex");
}
