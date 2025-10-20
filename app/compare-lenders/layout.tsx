import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compare NZ Lenders | Personal Loan Rates & Eligibility | LoanFinderNZ",
  description: "Compare personal loan lenders in New Zealand. Find the best rates and eligibility requirements from ANZ, Westpac, BNZ, Kiwibank and more based on your loan score.",
  alternates: {
    canonical: 'https://www.loanfindernz.com/compare-lenders',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CompareLendersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}