"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Building2, ExternalLink, Info } from "lucide-react";
import { getLoanData, type Lender } from "../../lib/calculateEligibility";

export default function CompareLenders() {
  const [loanData, setLoanData] = useState<any>(null);
  const [lenders, setLenders] = useState<Lender[]>([]);
  const [filteredLenders, setFilteredLenders] = useState<Lender[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const data = getLoanData();
    if (data) {
      setLoanData(data);
    }

    // Fetch lenders from JSON file
    fetch('/lenders.json')
      .then(res => res.json())
      .then((lendersData: Lender[]) => {
        setLenders(lendersData);
        
        if (data && data.score) {
          // Filter lenders based on score
          const eligible = lendersData.filter(lender => data.score >= lender.minScoreNeeded);
          // Sort by minimum score requirements (highest first)
          eligible.sort((a, b) => b.minScoreNeeded - a.minScoreNeeded);
          setFilteredLenders(eligible);
        } else {
          // If no score data, show all lenders
          setFilteredLenders(lendersData);
        }
      })
      .catch(error => {
        console.error('Error loading lenders:', error);
        setFilteredLenders([]);
      });
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] to-[#E2E8F0] flex items-center justify-center">
        <div className="text-xl font-semibold text-gray-600">Loading...</div>
      </div>
    );
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "bank": return "bg-blue-100 text-blue-800";
      case "fintech": return "bg-green-100 text-green-800";
      case "non-bank": return "bg-yellow-100 text-yellow-800";
      case "broker": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] to-[#E2E8F0]">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
            <div>
              <Link
                href="/"
                className="text-[#E11D48] hover:text-[#BE185D] font-semibold text-lg transition-colors flex items-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Calculator
              </Link>
              <h1 className="text-3xl font-bold text-[#0B3C6F] mt-2">
                Compare NZ Lenders
              </h1>
              {loanData && (
                <p className="text-gray-600 mt-1">
                  Based on your eligibility score of <span className="font-bold text-[#E11D48]">{loanData.score}%</span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Lenders Grid */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {!loanData && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
            <div className="flex items-start space-x-3">
              <Info className="w-6 h-6 text-blue-500 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900">Complete the Calculator First</h3>
                <p className="text-blue-700 mt-1">
                  For personalized recommendations, complete our <Link href="/" className="underline font-semibold">loan eligibility calculator</Link> first.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLenders.map((lender, index) => (
            <motion.div
              key={lender.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* Lender Header */}
              <div className="p-6 pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-gray-600" />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(lender.type)}`}>
                    {lender.type}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#0B3C6F] mb-2">
                  {lender.name}
                </h3>
                <p className="text-sm text-gray-600">{lender.approval}</p>
              </div>

              {/* Loan Details */}
              <div className="px-6 pb-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Loan Range:</span>
                  <span className="font-bold text-[#E11D48]">
                    {lender.range}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Interest Rate:</span>
                  <span className="font-semibold">{lender.rateFrom} - {lender.rateTo}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Min Score:</span>
                  <span className="font-semibold">{lender.minScoreNeeded}%</span>
                </div>
              </div>

              {/* Eligibility Notes */}
              <div className="px-6 pb-4">
                <h4 className="font-semibold text-gray-900 mb-2">Eligibility:</h4>
                <p className="text-sm text-gray-600">{lender.eligibilityNotes}</p>
              </div>

              {/* Apply Button */}
              <div className="px-6 pb-6">
                <a
                  href={lender.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gradient-to-r from-[#E11D48] to-[#BE185D] text-white px-6 py-3 rounded-xl font-semibold hover:from-[#BE185D] hover:to-[#9F1239] transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  Apply Now
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredLenders.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Matching Lenders
            </h3>
            <p className="text-gray-600">
              Consider improving your eligibility score or try alternative lenders.
            </p>
            <Link
              href="/improve-score"
              className="inline-block mt-4 bg-[#E11D48] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#BE185D] transition-colors"
            >
              Improve Your Score
            </Link>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-12 text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/"
              className="text-[#0B3C6F] hover:text-[#E11D48] font-medium transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Calculator
            </Link>
            <span className="hidden sm:block text-gray-400">|</span>
            <Link
              href="/improve-score"
              className="text-[#E11D48] hover:text-[#BE185D] font-medium transition-colors flex items-center gap-2"
            >
              Improve Your Score
              <ArrowLeft className="w-5 h-5 rotate-180" />
            </Link>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 bg-gray-50 rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 mb-2">Important Disclaimer</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            These are indicative rates and loan amounts. Actual offers may vary based on your full financial assessment. 
            Always read the terms and conditions before applying. Interest rates are subject to change. 
            This comparison is for educational purposes and does not constitute financial advice.
          </p>
        </div>
      </div>
    </div>
  );
}