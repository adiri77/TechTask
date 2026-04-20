import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TaskTech – Customer Dashboard",
  description:
    "A production-ready SaaS customer dashboard with company activation, milestones, enrichment and CRM integration.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
