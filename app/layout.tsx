import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Loan Eligibility Calculator NZ | Personal Loan Score Estimator",
  description:
    "Check your loan eligibility instantly based on NZ bank criteria. Find out your score and likelihood to qualify with ANZ, Westpac, BNZ, and more.",
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}