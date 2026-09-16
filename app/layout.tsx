import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { ToastProvider } from "@/components/ui/Toast";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0c0e14",
};

export const metadata: Metadata = {
  title: "Nubpack — Connect with your campus tribe",
  description:
    "Nubpack is the social platform for college students. Verify your email, build your profile, and connect with your campus community.",
  keywords: ["college", "students", "social", "campus", "nubpack", "community"],
  openGraph: {
    title: "Nubpack — Connect with your campus tribe",
    description:
      "The social platform built for college students. Join your campus community today.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="font-[family-name:var(--font-poppins)] min-h-screen bg-[#0c0e14] text-slate-100 antialiased overflow-x-hidden w-full">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
