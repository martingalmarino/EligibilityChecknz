"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, TrendingUp, RotateCcw, Building2 } from "lucide-react";
import { calculateEligibility, storeLoanData, type LoanData, type EligibilityResult } from "../lib/calculateEligibility";

export default function LoanEligibilityPage() {
  const [mounted, setMounted] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<EligibilityResult | null>(null);
  const [formData, setFormData] = useState<LoanData>({
    age: 30,
    income: 50000,
    debts: 1000,
    credit: "",
    residency: "",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCalculate = () => {
    const calculatedResult = calculateEligibility(
      formData.age,
      formData.income,
      formData.debts,
      formData.credit,
      formData.residency
    );
    
    setResult(calculatedResult);
    setShowResult(true);
    
    // Store in localStorage for compare-lenders page
    storeLoanData({
      ...formData,
      score: calculatedResult.score,
    });
  };

  const handleInputChange = (field: keyof LoanData, value: number | string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    if (showResult) {
      setShowResult(false);
    }
  };

  const resetForm = () => {
    setFormData({
      age: 30,
      income: 50000,
      debts: 1000,
      credit: "",
      residency: "",
    });
    setShowResult(false);
    setResult(null);
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="animate-pulse bg-white rounded-3xl shadow-lg p-8 max-w-3xl w-full mx-4">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded mb-8"></div>
          <div className="space-y-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-16 bg-gray-100 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-purple-gradient">
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-16 pb-20">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-black/5"></div>
        
        <div className="relative max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-2 mb-8"
            >
              <TrendingUp className="w-5 h-5 text-white mr-2" />
              <span className="text-white text-sm font-medium">Smart Loan Eligibility Assessment</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            >
              <span className="block">Loan Eligibility</span>
              <span className="block text-white">
                Check
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-2xl md:text-3xl font-semibold text-white mb-6"
            >
              New Zealand
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed"
            >
              Answer simple questions to get your personalized eligibility score
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap justify-center gap-8 md:gap-12 text-white/80"
            >
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white">10+</div>
                <div className="text-sm md:text-base">NZ Lenders</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white">2min</div>
                <div className="text-sm md:text-base">Quick Assessment</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white">100%</div>
                <div className="text-sm md:text-base">Free Service</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 -mt-10 relative z-10">
        {/* Main Calculator Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-lg p-8 mb-8"
        >
          <div className="grid gap-8">
            {/* Age Slider */}
            <div>
              <label className="block text-lg font-semibold text-[#111827] mb-3">
                Age
              </label>
              <div className="px-3">
                <input
                  type="range"
                  min="18"
                  max="70"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', parseInt(e.target.value))}
                  className="slider w-full"
                  title="Age slider"
                />
                <div className="flex justify-between text-sm text-[#475569] mt-2">
                  <span>18</span>
                  <span className="font-bold text-[#E11D48]">{formData.age} years</span>
                  <span>70</span>
                </div>
              </div>
            </div>

            {/* Annual Income Slider */}
            <div>
              <label className="block text-lg font-semibold text-[#111827] mb-3">
                Annual Income
              </label>
              <div className="px-3">
                <input
                  type="range"
                  min={50000}
                  max={200000}
                  step={5000}
                  value={formData.income}
                  onChange={(e) => handleInputChange('income', parseInt(e.target.value))}
                  className="w-full h-3 bg-gradient-to-r from-[#E11D48] to-[#BE185D] rounded-lg appearance-none cursor-pointer fintech-slider"
                  title="Income slider"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <span>$50,000</span>
                  <span className="font-bold text-[#E11D48]">${formData.income.toLocaleString()}</span>
                  <span>$200,000</span>
                </div>
              </div>
            </div>

            {/* Monthly Debts Slider */}
            <div>
              <label className="block text-lg font-semibold text-[#111827] mb-3">
                Monthly Debt Payments
              </label>
              <div className="px-3">
                <input
                  type="range"
                  min={0}
                  max={5000}
                  step={50}
                  value={formData.debts}
                  onChange={(e) => handleInputChange('debts', parseInt(e.target.value))}
                  className="w-full h-3 bg-gradient-to-r from-[#E11D48] to-[#BE185D] rounded-lg appearance-none cursor-pointer fintech-slider"
                  title="Debt payments slider"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <span>$0</span>
                  <span className="font-bold text-[#E11D48]">${formData.debts.toLocaleString()}</span>
                  <span>$5,000</span>
                </div>
              </div>
            </div>

            {/* Credit History Dropdown */}
            <div>
              <label className="block text-lg font-semibold text-[#111827] mb-3">
                Credit History
              </label>
              <select
                value={formData.credit}
                onChange={(e) => handleInputChange('credit', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#E11D48] focus:border-transparent bg-white text-[#111827]"
                title="Credit history selection"
              >
                <option value="">Select credit history</option>
                <option value="excellent">Excellent (Never missed payments)</option>
                <option value="good">Good (1-2 late payments in last 2 years)</option>
                <option value="average">Average (3-5 late payments in last 2 years)</option>
                <option value="poor">Poor (6+ late payments or defaults)</option>
              </select>
            </div>

            {/* NZ Residency Dropdown */}
            <div>
              <label className="block text-lg font-semibold text-[#111827] mb-3">
                NZ Residency Status
              </label>
              <select
                value={formData.residency}
                onChange={(e) => handleInputChange('residency', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#E11D48] focus:border-transparent bg-white text-[#111827]"
                title="Residency status selection"
              >
                <option value="">Select residency status</option>
                <option value="citizen">NZ Citizen</option>
                <option value="permanent">Permanent Resident</option>
                <option value="temporary">Temporary Visa Holder</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Calculate Button */}
            <div className="text-center pt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCalculate}
                className="bg-gradient-to-r from-[#E11D48] to-[#BE185D] text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2"
                disabled={!formData.credit || !formData.residency}
              >
                Calculate My Score
                <ArrowRight className="w-6 h-6" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetForm}
                className="ml-4 bg-gray-100 text-gray-700 px-6 py-4 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300 inline-flex items-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                Reset
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Results Section */}
        {showResult && result && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl shadow-lg p-8 mb-8"
          >
            <div className="text-center">
              <h2 className="text-3xl font-bold text-[#0B3C6F] mb-8">Your Eligibility Results</h2>
              
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                {/* Score */}
                <div>
                  <h3 className="text-lg font-semibold text-[#475569] mb-2">Eligibility Score</h3>
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="score-animate"
                  >
                    <div
                      className={`text-5xl font-extrabold mb-2 ${
                        result.score >= 70 ? 'text-green-600' : 
                        result.score >= 40 ? 'text-yellow-500' : 
                        'text-red-500'
                      }`}
                    >
                      {result.score}
                    </div>
                    <div className="text-2xl font-bold text-[#475569]">/ 100</div>
                  </motion.div>
                </div>

                {/* Loan Range */}
                <div>
                  <h3 className="text-lg font-semibold text-[#475569] mb-2">Likely Loan Range</h3>
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-3xl font-bold text-[#111827]"
                  >
                    {result.loanRange}
                  </motion.div>
                </div>

                {/* Readiness Message */}
                <div>
                  <h3 className="text-lg font-semibold text-[#475569] mb-2">Loan Readiness</h3>
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-lg text-[#475569] leading-relaxed"
                  >
                    {result.message}
                  </motion.div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/compare-lenders">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-[#E11D48] to-[#BE185D] text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2"
                  >
                    Compare Lenders
                    <ArrowRight className="w-6 h-6" />
                  </motion.button>
                </Link>
                
                <Link href="/improve-score">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border-2 border-[#0B3C6F] text-[#0B3C6F] px-8 py-4 rounded-xl font-bold hover:bg-[#0B3C6F] hover:text-white transition-all duration-300 inline-flex items-center gap-2"
                  >
                    <TrendingUp className="w-6 h-6" />
                    Improve Score
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-3xl shadow-lg p-6 text-center"
        >
          <p className="text-sm text-[#475569] mb-4 leading-relaxed">
            This calculator provides an indicative eligibility score based on public NZ lending criteria 
            from ANZ, BNZ, Westpac, and Kiwibank. It is not a credit decision.
          </p>
          
          <Link href="/compare-lenders">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-6 py-3 border-2 border-[#E11D48] text-[#E11D48] rounded-xl font-semibold hover:bg-[#E11D48] hover:text-white transition-all duration-300 gap-2"
            >
              Compare Lenders
              <Building2 className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>

        {/* AdSense Placeholder */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
       
        </motion.div>
      </div>

      {/* Footer Section */}
      <footer className="mt-16 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center"
          >
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">About</h3>
                <p className="text-white/80 text-sm">
                  Professional loan eligibility assessment for New Zealand borrowers.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Legal</h3>
                <p className="text-white/80 text-sm">
                  This tool is for informational purposes only and does not constitute financial advice.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
                <p className="text-white/80 text-sm">
                  LoanEligibilityCheck.nz
                </p>
              </div>
            </div>
            <div className="pt-6 border-t border-white/20">
              <p className="text-white/60 text-sm">
                © 2025 loanfindernz.com. All rights reserved.
              </p>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}