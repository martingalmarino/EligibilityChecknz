import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Loan Eligibility Calculator NZ | Personal Loan Score Estimator",
  description:
    "Check your loan eligibility instantly based on NZ bank criteria. Find out your score and likelihood to qualify with ANZ, Westpac, BNZ, and more.",
  icons: {
    icon: '/favicon.svg',
  },
  verification: {
    google: "MvpmBQnAmgWmMLDKmatVYTUtiy3_MXYBlHn0H6MG4OM",
  },
  metadataBase: new URL('https://www.loanfindernz.com'),
  alternates: {
    canonical: 'https://www.loanfindernz.com',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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