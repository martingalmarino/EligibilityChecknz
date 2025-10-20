export interface LoanData {
  age: number;
  income: number;
  debts: number;
  credit: string;
  residency: string;
  score?: number;
}

export interface ImprovementSuggestion {
  category: string;
  suggestion: string;
  impact: 'High' | 'Medium' | 'Low';
}

export interface EligibilityResult {
  score: number;
  tier: string;
  message: string;
  loanRange: string;
  color: string;
  improvements?: ImprovementSuggestion[];
}

export interface Lender {
  name: string;
  logo: string;
  rateFrom: string;
  rateTo: string;
  range: string;
  approval: string;
  url: string;
  type: 'bank' | 'fintech' | 'non-bank' | 'broker';
  eligibilityNotes: string;
  minScoreNeeded: number;
}

export const calculateEligibility = (
  age: number,
  income: number,
  debts: number,
  credit: string,
  residency: string
): EligibilityResult => {
  let score = 0;
  const improvements: ImprovementSuggestion[] = [];

  // Age scoring (15%)
  if (age >= 25 && age <= 55) {
    score += 15;
  } else if (age >= 18 && age < 25) {
    score += 12;
    improvements.push({
      category: "Age",
      suggestion: "Age 25+ typically gets better loan terms",
      impact: "Medium"
    });
  } else if (age > 55 && age <= 65) {
    score += 10;
    improvements.push({
      category: "Age",
      suggestion: "Consider applying before retirement age",
      impact: "Low"
    });
  } else {
    score += 5;
    improvements.push({
      category: "Age",
      suggestion: "Age may affect loan eligibility",
      impact: "Low"
    });
  }

  // Income scoring (25%)
  if (income >= 80000) {
    score += 25;
  } else if (income >= 60000) {
    score += 20;
  } else if (income >= 40000) {
    score += 15;
  } else if (income >= 30000) {
    score += 10;
    improvements.push({
      category: "Income",
      suggestion: "Increase income to $40K+ for better rates",
      impact: "High"
    });
  } else {
    score += 5;
    improvements.push({
      category: "Income", 
      suggestion: "Most lenders require minimum $35K income",
      impact: "High"
    });
  }

  // Debt-to-income scoring (20%)
  const monthlyIncome = income / 12;
  const debtRatio = debts / monthlyIncome;
  if (debtRatio <= 0.2) {
    score += 20;
  } else if (debtRatio <= 0.3) {
    score += 15;
  } else if (debtRatio <= 0.4) {
    score += 10;
    improvements.push({
      category: "Debt",
      suggestion: "Reduce monthly debts to under 30% of income",
      impact: "High"
    });
  } else {
    score += 5;
    improvements.push({
      category: "Debt",
      suggestion: "High debt-to-income ratio - consider debt consolidation",
      impact: "High"
    });
  }

  // Credit rating scoring (25%)
  const creditMap: Record<string, number> = {
    'Excellent': 25,
    'Good': 20,
    'Average': 10,
    'Poor': 0,
  };
  score += creditMap[credit] || 0;
  
  if (credit === 'Average' || credit === 'Poor') {
    improvements.push({
      category: "Credit",
      suggestion: "Improve credit score by paying bills on time",
      impact: "High"
    });
  }

  // Residency scoring (15%)
  if (residency === 'Citizen' || residency === 'Resident') {
    score += 15;
  } else if (residency === 'Work Visa') {
    score += 10;
    improvements.push({
      category: "Residency",
      suggestion: "Permanent residency improves loan eligibility",
      impact: "Medium"
    });
  } else {
    score += 5;
    improvements.push({
      category: "Residency",
      suggestion: "NZ residency or citizenship required for best rates",
      impact: "High"
    });
  }

  // Determine tier and messaging
  let tier: 'High' | 'Moderate' | 'Low';
  let message: string;
  let loanRange: string;
  let color: string;

  if (score >= 80) {
    tier = 'High';
    message = "You're likely to qualify with most NZ banks";
    loanRange = `Up to $${Math.min(income * 0.8, 70000).toLocaleString()}`;
    color = "#22C55E";
  } else if (score >= 60) {
    tier = 'Moderate';
    message = "Moderate chance with some lenders";
    loanRange = `Up to $${Math.min(income * 0.5, 40000).toLocaleString()}`;
    color = "#F59E0B";
  } else {
    tier = 'Low';
    message = "Consider improving your financial position";
    loanRange = `Up to $${Math.min(income * 0.3, 20000).toLocaleString()}`;
    color = "#EF4444";
  }

  return {
    score: Math.min(Math.round(score), 100),
    message,
    loanRange,
    color,
    tier,
    improvements,
  };
};

export const storeLoanData = (data: LoanData & { score: number }) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('loanEligibility', JSON.stringify(data));
  }
};

export const getLoanData = (): (LoanData & { score: number }) | null => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem('loanEligibility');
    return data ? JSON.parse(data) : null;
  }
  return null;
};