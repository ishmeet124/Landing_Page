import nodemailer from "nodemailer";

/**
 * Build the Nodemailer transporter from environment variables.
 */
function getTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
}

/**
 * Send OTP verification email with branded HTML template.
 * The OTP is embedded only in the email body — never in logs or browser responses.
 */
export async function sendOtpEmail(email: string, otp: string): Promise<void> {
  const transporter = getTransporter();

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Nubpack Verification</title>
</head>
<body style="margin:0;padding:0;background:#0a0a1a;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a1a;padding:40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#1a1a2e 0%,#16213e 100%);border-radius:16px;overflow:hidden;border:1px solid rgba(139,92,246,0.3);">
          <!-- Header -->
          <tr>
            <td style="padding:32px 32px 16px;text-align:center;">
              <div style="display:inline-block;background:linear-gradient(135deg,#8b5cf6,#a855f7);border-radius:12px;padding:10px 20px;">
                <span style="font-size:24px;font-weight:700;color:#ffffff;letter-spacing:1px;">NUBPACK</span>
              </div>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:16px 32px 8px;text-align:center;">
              <h1 style="margin:0;font-size:22px;font-weight:600;color:#ffffff;">Verify your email</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 32px 24px;text-align:center;">
              <p style="margin:0;font-size:14px;color:#a0a0b0;line-height:1.6;">
                Use the verification code below to continue setting up your Nubpack account.
              </p>
            </td>
          </tr>
          <!-- OTP Code -->
          <tr>
            <td style="padding:0 32px 24px;text-align:center;">
              <div style="background:rgba(139,92,246,0.15);border:2px dashed rgba(139,92,246,0.4);border-radius:12px;padding:20px;display:inline-block;min-width:200px;">
                <span style="font-size:36px;font-weight:700;color:#a855f7;letter-spacing:12px;font-family:monospace;">${otp}</span>
              </div>
            </td>
          </tr>
          <!-- Expiry -->
          <tr>
            <td style="padding:0 32px 24px;text-align:center;">
              <p style="margin:0;font-size:13px;color:#a0a0b0;">
                This code expires in <strong style="color:#f59e0b;">5 minutes</strong>.
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:16px 32px 32px;text-align:center;border-top:1px solid rgba(255,255,255,0.05);">
              <p style="margin:0;font-size:12px;color:#64748b;line-height:1.5;">
                If you didn't request this code, you can safely ignore this email.<br/>
                Do not share this code with anyone.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  await transporter.sendMail({
    from: process.env.SMTP_FROM || "noreply@nubpack.com",
    to: email,
    subject: "Your Nubpack Verification Code",
    html,
    text: `Your Nubpack verification code is: ${otp}. This code expires in 5 minutes.`,
  });
}
