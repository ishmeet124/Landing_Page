# Nubpack — Campus Social Onboarding

A production-quality **Next.js** web application recreating the Nubpack app's landing page, Terms & Conditions, and complete 4-step signup/onboarding flow with real email OTP verification.

## Features

- **Landing Page** — Animated hero with gradient backgrounds, floating elements, and CTA
- **Terms & Conditions** — Scrollable content with acceptance checkbox
- **Email OTP Verification** — Real SMTP delivery via Nodemailer, hashed OTP storage
- **4-Step Profile Wizard** — Name/Age/Pronouns → State/City/College → Bio/Interests → Year/Degree/Socials
- **Dependent Dropdowns** — State → City → College cascade with automatic resets
- **Supabase Persistence** — Profiles and OTPs stored in PostgreSQL
- **Full Validation** — Zod + React Hook Form on both client and server
- **Security** — Hashed OTPs, RLS policies, server-only secrets, attempt limiting
- **Responsive Design** — Mobile-first from 320px to 1440px+
- **Loading States & Toasts** — Consistent UX feedback across all interactions
- **Back Navigation** — Data preserved across all steps
- **Success Page** — Animated celebration on profile completion

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Font | Poppins (Google Fonts) |
| Forms | React Hook Form + Zod |
| Database | Supabase PostgreSQL |
| Email | Nodemailer (SMTP) |
| Icons | Lucide React |

## Folder Structure

```
├── app/
│   ├── page.tsx                    # Landing page
│   ├── layout.tsx                  # Root layout (Poppins + Toast)
│   ├── globals.css                 # Design system + animations
│   ├── terms/page.tsx              # Terms & Conditions
│   ├── signup/page.tsx             # Signup wizard host
│   ├── success/page.tsx            # Success page
│   └── api/
│       ├── auth/
│       │   ├── send-otp/route.ts   # POST: generate + send OTP
│       │   └── verify-otp/route.ts # POST: verify OTP
│       └── profile/route.ts        # POST: save profile
│
├── components/
│   ├── signup/
│   │   ├── SignupContext.tsx        # React Context + useReducer
│   │   ├── SignupWizard.tsx         # Step orchestrator
│   │   ├── ProgressIndicator.tsx   # 4-step visual indicator
│   │   ├── EmailStep.tsx           # Email input + send OTP
│   │   ├── OtpStep.tsx             # 6-digit OTP + verify
│   │   ├── ProfileStepOne.tsx      # Name, Age, Pronouns
│   │   ├── ProfileStepTwo.tsx      # State, City, College
│   │   ├── ProfileStepThree.tsx    # Bio, Interests
│   │   └── ProfileStepFour.tsx     # Year, Degree, Socials
│   └── ui/
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── Select.tsx
│       ├── Checkbox.tsx
│       ├── Spinner.tsx
│       └── Toast.tsx
│
├── lib/
│   ├── supabase/
│   │   ├── server.ts               # Service-role client (server only)
│   │   └── client.ts               # Anon key client (browser)
│   ├── otp/
│   │   ├── generate.ts             # Crypto-secure 6-digit OTP
│   │   ├── hash.ts                 # SHA-256 hashing
│   │   └── email.ts                # Nodemailer + HTML template
│   ├── validation/
│   │   ├── auth.ts                 # Zod: email, OTP
│   │   └── profile.ts             # Zod: all profile steps
│   └── data/
│       └── locations.ts            # States → Cities → Colleges
│
├── supabase/
│   └── schema.sql                  # Tables, indexes, RLS, triggers
│
├── .env.example                    # Environment variable template
└── README.md
```

## Setup

### 1. Clone and Install

```bash
git clone <repository-url>
cd nubpack
npm install
```

### 2. Supabase Setup

1. Create a free project at [supabase.com](https://supabase.com)
2. Open the **SQL Editor**
3. Paste and run the contents of `supabase/schema.sql`
4. From **Settings → API**, copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon` (public) key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` (secret) key → `SUPABASE_SERVICE_ROLE_KEY`

### 3. SMTP Setup

Use any SMTP provider (Gmail, SendGrid, Resend, Mailgun, etc.).

**Gmail example:**
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=yourname@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=yourname@gmail.com
```

> **Note:** For Gmail, enable 2FA and create an [App Password](https://myaccount.google.com/apppasswords).

### 4. Environment Variables

Copy the template and fill in your values:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=you@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=you@gmail.com

OTP_EXPIRY_MINUTES=5
```

### 5. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 6. Production Build

```bash
npm run build
npm start
```

## Architecture

```
Browser
  ↓
Next.js Frontend (React components)
  ↓
Next.js API Route Handlers
  ↓
Supabase PostgreSQL

For email:
Next.js API → Nodemailer → SMTP → User's email
```

All privileged database operations use the `service_role` key server-side only. The browser never has direct write access to tables (enforced by RLS).

## Security

| Measure | Implementation |
|---------|---------------|
| OTP Storage | SHA-256 hashed, never plain text |
| OTP Expiry | 5 minutes (configurable) |
| Attempt Limit | 5 attempts per OTP |
| OTP Invalidation | Previous OTPs invalidated on new request |
| Secrets | Service role key server-only, SMTP creds server-only |
| RLS | All tables: service_role only access |
| Validation | Server-side Zod validation on all API routes |
| Error Messages | Generic user-facing messages, no stack traces |

## Database Tables

### `profiles`
| Column | Type | Notes |
|--------|------|-------|
| id | UUID | Primary key |
| email | TEXT | Unique, not null |
| email_verified | BOOLEAN | Default false |
| name, age, pronouns | Various | Step 1 fields |
| state, city, college | TEXT | Step 2 fields |
| bio, interests | TEXT, TEXT[] | Step 3 fields |
| year_of_study, degree_program | TEXT | Step 4 fields |
| instagram_url, linkedin_url | TEXT | Optional socials |
| created_at, updated_at | TIMESTAMPTZ | Auto-managed |

### `email_otps`
| Column | Type | Notes |
|--------|------|-------|
| id | UUID | Primary key |
| email | TEXT | Not null |
| otp_hash | TEXT | SHA-256 hash |
| expires_at | TIMESTAMPTZ | 5-minute expiry |
| attempts | INTEGER | Max 5 |
| verified | BOOLEAN | Default false |
| created_at | TIMESTAMPTZ | Auto |

## Testing

### Complete Signup Flow
1. Open http://localhost:3000
2. Click "Get Started" → Terms page
3. Read terms, check acceptance, click "Continue"
4. Enter email → receive real OTP email
5. Enter 6-digit code → verify
6. Fill Step 1: Name, Age (18+), Pronouns
7. Fill Step 2: State → City → College
8. Fill Step 3: Bio + Interests
9. Fill Step 4: Year, Degree, optional socials → "Complete Profile"
10. Success page shown
11. Verify profile in Supabase dashboard

### Edge Cases to Test
- Invalid/empty email → validation error
- Age under 18 → "You must be 18 or older"
- Wrong OTP → error + remaining attempts
- Expired OTP → "code has expired" message
- 5+ attempts → "too many attempts"
- Resend OTP → 30s cooldown
- Change email from OTP screen
- Back navigation preserves all data
- State change resets city + college
- Mobile layout at 320px–430px
- Desktop layout at 1024px–1440px

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase service role key (server only) |
| `SMTP_HOST` | Yes | SMTP server hostname |
| `SMTP_PORT` | Yes | SMTP port (587 or 465) |
| `SMTP_USER` | Yes | SMTP authentication username |
| `SMTP_PASSWORD` | Yes | SMTP authentication password |
| `SMTP_FROM` | Yes | Sender email address |
| `OTP_EXPIRY_MINUTES` | No | OTP lifetime in minutes (default: 5) |
