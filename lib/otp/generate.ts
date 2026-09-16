import crypto from "crypto";

/**
 * Generate a cryptographically secure 6-digit OTP.
 * Uses crypto.randomInt for uniform distribution.
 * The OTP is NEVER logged or returned to the client.
 */
export function generateOtp(): string {
  const otp = crypto.randomInt(100000, 999999).toString();
  return otp;
}
