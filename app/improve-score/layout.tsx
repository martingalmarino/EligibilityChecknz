import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Improve Your Loan Score | Personal Finance Tips NZ | LoanFinderNZ",
  description: "Learn how to improve your loan eligibility score in New Zealand. Get personalized tips for better income, credit rating, debt management and more.",
  alternates: {
    canonical: 'https://www.loanfindernz.com/improve-score',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ImproveScoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}