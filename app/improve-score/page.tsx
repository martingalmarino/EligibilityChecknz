"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  ArrowLeft, 
  DollarSign, 
  TrendingDown, 
  BarChart3, 
  Calendar, 
  Home, 
  PiggyBank, 
  Briefcase, 
  Building2,
  Info,
  ExternalLink,
  RotateCcw,
  TrendingUp
} from "lucide-react";
import { getLoanData } from "../../lib/calculateEligibility";

interface ImprovementTip {
  category: string;
  icon: string;
  title: string;
  description: string;
  impact: "High" | "Medium" | "Low";
  timeframe: string;
  actions: string[];
}

const getIconComponent = (iconName: string) => {
  const icons = {
    DollarSign,
    TrendingDown,
    BarChart3,
    Calendar,
    Home,
    PiggyBank,
    Briefcase,
    Building2
  };
  const IconComponent = icons[iconName as keyof typeof icons];
  return IconComponent ? <IconComponent className="w-8 h-8" /> : <BarChart3 className="w-8 h-8" />;
};

export default function ImproveScore() {
  const [loanData, setLoanData] = useState<any>(null);
  const [personalizedTips, setPersonalizedTips] = useState<ImprovementTip[]>([]);
  const [mounted, setMounted] = useState(false);

  const allTips: ImprovementTip[] = [
    {
      category: "Income",
      icon: "DollarSign",
      title: "Increase Your Annual Income",
      description: "Higher income significantly improves loan eligibility and amount",
      impact: "High",
      timeframe: "3-12 months",
      actions: [
        "Ask for a salary increase or promotion",
        "Take on freelance or part-time work",
        "Develop skills for higher-paying roles",
        "Consider changing jobs for better pay"
      ]
    },
    {
      category: "Debt",
      icon: "TrendingDown",
      title: "Reduce Monthly Debt Payments",
      description: "Lower debt-to-income ratio makes you more attractive to lenders",
      impact: "High",
      timeframe: "1-6 months",
      actions: [
        "Pay off high-interest credit cards first",
        "Consolidate multiple debts",
        "Avoid taking on new debt",
        "Consider debt consolidation loans"
      ]
    },
    {
      category: "Credit",
      icon: "BarChart3",
      title: "Improve Your Credit Rating",
      description: "Better credit score unlocks lower rates and higher loan amounts",
      impact: "High",
      timeframe: "3-12 months",
      actions: [
        "Pay all bills on time consistently",
        "Keep credit utilization below 30%",
        "Don&apos;t close old credit accounts",
        "Check and dispute credit report errors"
      ]
    },
    {
      category: "Age",
      icon: "Calendar",
      title: "Age Considerations",
      description: "Lenders prefer borrowers in their prime earning years",
      impact: "Low",
      timeframe: "N/A",
      actions: [
        "If under 25: Build credit history and stable income",
        "If over 55: Consider shorter loan terms",
        "Focus on other factors you can control",
        "Highlight job stability and experience"
      ]
    },
    {
      category: "Residency",
      icon: "Home",
      title: "Strengthen Residency Status",
      description: "Permanent residency improves eligibility with most lenders",
      impact: "Medium",
      timeframe: "Varies",
      actions: [
        "Apply for permanent residency if eligible",
        "Maintain continuous employment",
        "Keep all visa documentation current",
        "Consider specialist lenders for visa holders"
      ]
    },
    {
      category: "Savings",
      icon: "PiggyBank",
      title: "Build Emergency Savings",
      description: "Having savings shows financial stability to lenders",
      impact: "Medium",
      timeframe: "6-12 months",
      actions: [
        "Save at least 3-6 months of expenses",
        "Open a dedicated savings account",
        "Set up automatic transfers to savings",
        "Reduce unnecessary expenses"
      ]
    },
    {
      category: "Employment",
      icon: "Briefcase",
      title: "Stabilize Employment History",
      description: "Consistent employment history improves loan approval chances",
      impact: "Medium",
      timeframe: "6-24 months",
      actions: [
        "Stay in current job for at least 12 months",
        "Avoid job-hopping before applying",
        "Get employment contracts in writing",
        "Document any salary increases"
      ]
    },
    {
      category: "Assets",
      icon: "Building2",
      title: "Build Assets and Equity",
      description: "Assets can be used as security or demonstrate financial stability",
      impact: "Medium",
      timeframe: "12+ months",
      actions: [
        "Save for a property deposit",
        "Build investment portfolio",
        "Consider secured loans if you have assets",
        "Document all valuable assets"
      ]
    }
  ];

  useEffect(() => {
    setMounted(true);
    const data = getLoanData();
    if (data) {
      setLoanData(data);
      generatePersonalizedTips(data);
    } else {
      setPersonalizedTips(allTips);
    }
  }, [allTips]);

  const generatePersonalizedTips = (data: any) => {
    const tips = [...allTips];
    
    // Prioritize based on user data
    if (data.income < 60000) {
      // Move income tip to front
      const incomeTip = tips.find(t => t.category === "Income");
      if (incomeTip) {
        tips.splice(tips.indexOf(incomeTip), 1);
        tips.unshift(incomeTip);
      }
    }

    if (data.debts > (data.income / 12 * 0.3)) {
      // Prioritize debt reduction
      const debtTip = tips.find(t => t.category === "Debt");
      if (debtTip) {
        tips.splice(tips.indexOf(debtTip), 1);
        tips.splice(1, 0, debtTip);
      }
    }

    if (data.credit === "poor" || data.credit === "average") {
      // Prioritize credit improvement
      const creditTip = tips.find(t => t.category === "Credit");
      if (creditTip) {
        tips.splice(tips.indexOf(creditTip), 1);
        tips.splice(2, 0, creditTip);
      }
    }

    setPersonalizedTips(tips);
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] to-[#E2E8F0] flex items-center justify-center">
        <div className="text-xl font-semibold text-gray-600">Loading...</div>
      </div>
    );
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] to-[#E2E8F0]">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-6">
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
                Improve Your Score
              </h1>
              {loanData && (
                <p className="text-gray-600 mt-1">
                  Current score: <span className="font-bold text-[#E11D48]">{loanData.score}%</span> - Here&apos;s how to improve it
                </p>
              )}
            </div>
            <Link
              href="/compare-lenders"
              className="bg-[#E11D48] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#BE185D] transition-colors flex items-center gap-2"
            >
              <Building2 className="w-5 h-5" />
              View Lenders
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {!loanData && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
            <div className="flex items-start space-x-3">
              <Info className="w-6 h-6 text-blue-500 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900">Get Personalized Tips</h3>
                <p className="text-blue-700 mt-1">
                  Complete our <Link href="/" className="underline font-semibold hover:text-blue-900 transition-colors">loan eligibility calculator</Link> to receive personalized improvement recommendations.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Score Breakdown */}
        {loanData && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-8">
            <h2 className="text-xl font-bold text-[#0B3C6F] mb-4">Your Score Breakdown</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#E11D48]">{Math.round((loanData.age >= 25 && loanData.age <= 55 ? 15 : 10) / 15 * 100)}%</div>
                <div className="text-sm text-gray-600">Age Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#E11D48]">
                  {Math.round((loanData.income >= 80000 ? 25 : loanData.income >= 60000 ? 20 : 15) / 25 * 100)}%
                </div>
                <div className="text-sm text-gray-600">Income Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#E11D48]">
                  {Math.round((loanData.debts / (loanData.income / 12) <= 0.2 ? 20 : 10) / 20 * 100)}%
                </div>
                <div className="text-sm text-gray-600">Debt Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#E11D48]">
                  {loanData.credit === "excellent" ? "100%" : loanData.credit === "good" ? "80%" : "40%"}
                </div>
                <div className="text-sm text-gray-600">Credit Score</div>
              </div>
            </div>
          </div>
        )}

        {/* Improvement Tips */}
        <div className="space-y-6">
          {personalizedTips.map((tip, index) => (
            <motion.div
              key={tip.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-[#E11D48]">{getIconComponent(tip.icon)}</div>
                    <div>
                      <h3 className="text-xl font-bold text-[#0B3C6F]">{tip.title}</h3>
                      <p className="text-gray-600">{tip.description}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getImpactColor(tip.impact)}`}>
                      {tip.impact} Impact
                    </span>
                    <span className="text-sm text-gray-500">{tip.timeframe}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Action Steps:</h4>
                  <ul className="space-y-2">
                    {tip.actions.map((action, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-[#E11D48] rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-12 bg-gradient-to-r from-[#E11D48] to-[#BE185D] rounded-xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to Apply?</h2>
          <p className="text-lg mb-6 opacity-90">
            Once you&apos;ve improved your score, check out lenders that match your profile
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              onClick={() => {
                // Clear localStorage when going back to calculator
                if (typeof window !== 'undefined') {
                  localStorage.removeItem('loanEligibility');
                }
              }}
              className="bg-white text-[#E11D48] px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              Retake Calculator
            </Link>
            <Link
              href="/compare-lenders"
              className="bg-white/20 text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/30 transition-colors flex items-center gap-2"
            >
              <Building2 className="w-5 h-5" />
              Compare Lenders
            </Link>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center text-[#0B3C6F] hover:text-[#E11D48] font-medium transition-colors gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Loan Eligibility Calculator
          </Link>
        </div>

        {/* Resources */}
        <div className="mt-8 bg-gray-50 rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Helpful Resources</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a 
              href="https://www.credit-help.co.nz/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#E11D48] hover:text-[#BE185D] font-medium flex items-center gap-2"
            >
              <BarChart3 className="w-5 h-5" />
              Check Your Credit Score (Free)
              <ExternalLink className="w-4 h-4" />
            </a>
            <a 
              href="https://sorted.org.nz/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#E11D48] hover:text-[#BE185D] font-medium flex items-center gap-2"
            >
              <TrendingUp className="w-5 h-5" />
              Financial Education (Sorted.org.nz)
              <ExternalLink className="w-4 h-4" />
            </a>
            <a 
              href="https://www.govt.nz/browse/consumer-rights-and-complaints/debt-and-money-problems/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#E11D48] hover:text-[#BE185D] font-medium flex items-center gap-2"
            >
              <Building2 className="w-5 h-5" />
              Government Debt Help
              <ExternalLink className="w-4 h-4" />
            </a>
            <a 
              href="https://www.moneyhub.co.nz/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#E11D48] hover:text-[#BE185D] font-medium flex items-center gap-2"
            >
              <PiggyBank className="w-5 h-5" />
              Money Tips & Advice
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}