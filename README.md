# LoanEligibilityCheck.nz 🇳🇿

A professional loan eligibility calculator and lender comparison platform specifically designed for New Zealand borrowers.

## 🌟 Features

### 🧮 **Loan Eligibility Calculator**
- Interactive sliders for age, income, and debt payments
- Dropdown selections for credit history and residency status
- Real-time eligibility scoring (0-100)
- Personalized loan range estimates
- Data persistence across page navigation

### 🏦 **Dynamic Lender Comparison**
- 10+ major NZ lenders including ANZ, ASB, Kiwibank, Westpac
- Alternative lenders: Harmoney, MTF Finance, and more
- Score-based filtering and personalized recommendations
- Detailed lender information with rates and loan ranges
- JSON-based data system for easy updates

### 📈 **Score Improvement Recommendations**
- Personalized improvement tips based on user profile
- High, medium, and low impact categorization
- Actionable steps with realistic timeframes
- NZ-specific financial advice and resources
- Score breakdown analysis

### 🎨 **Modern Design**
- Purple gradient background with glassmorphism effects
- Framer Motion animations for smooth interactions
- Lucide React icons throughout
- Responsive mobile-first design
- Professional fintech aesthetic

## 🚀 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS with custom fintech palette
- **Animations**: Framer Motion for micro-interactions
- **Icons**: Lucide React for professional iconography
- **Data**: JSON-based lender database
- **State**: React hooks with LocalStorage persistence

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/martingalmarino/EligibilityChecknz.git

# Navigate to project directory
cd EligibilityChecknz

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see the application.

### Build for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
├── app/                          # Next.js app directory
│   ├── page.tsx                 # Main calculator page
│   ├── compare-lenders/         # Lender comparison page
│   ├── improve-score/           # Score improvement page
│   ├── layout.tsx               # Root layout
│   └── globals.css              # Global styles
├── lib/                         # Business logic
│   └── calculateEligibility.ts  # Scoring algorithm
├── public/                      # Static assets
│   └── lenders.json            # Lender database
└── .github/                     # GitHub configuration
    └── copilot-instructions.md  # AI development guidelines
```

## 🎯 Key Pages

### 1. **Calculator (`/`)**
- Interactive loan eligibility assessment
- Real-time scoring with visual feedback
- Form validation and error handling
- Results display with next steps

### 2. **Compare Lenders (`/compare-lenders`)**
- Filtered lender recommendations
- Detailed comparison cards
- Application links and contact information
- Score-based personalization

### 3. **Improve Score (`/improve-score`)**
- Personalized improvement strategies
- Categorized tips with impact assessment
- NZ-specific financial resources
- Progress tracking guidance

## 🔧 Configuration

### Environment Variables
No environment variables required - all data is processed client-side for privacy.

### Customization
- **Colors**: Modify `tailwind.config.js` for brand colors
- **Lenders**: Update `public/lenders.json` for lender data
- **Scoring**: Adjust algorithm in `lib/calculateEligibility.ts`

## 📊 Scoring Algorithm

The eligibility score is calculated based on:
- **Age** (15 points): Optimal range 25-55 years
- **Income** (25 points): Higher income = better score
- **Debt-to-Income** (20 points): Lower ratio = better score
- **Credit History** (25 points): Excellent > Good > Average > Poor
- **Residency** (15 points): Citizen > Permanent > Temporary

## 🇳🇿 NZ-Specific Features

- Major bank integration (ANZ, ASB, BNZ, Kiwibank, Westpac)
- Alternative lender options (Harmoney, MTF Finance)
- NZ-specific lending criteria and regulations
- Proper currency formatting (NZD)
- Local financial resources and advice

## 📱 Responsive Design

- **Mobile-first**: Optimized for smartphones
- **Tablet**: Enhanced layout for medium screens
- **Desktop**: Full-featured experience
- **Accessibility**: WCAG compliant design

## 🔒 Privacy & Security

- **Client-side processing**: No data sent to external servers
- **LocalStorage**: Cross-page data persistence
- **No tracking**: Privacy-focused design
- **HTTPS ready**: Secure deployment configuration

## 🚀 Deployment

Ready for deployment on:
- **Vercel** (recommended)
- **Netlify**
- **AWS Amplify**
- Any Node.js hosting provider

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Contact

For questions or feedback about LoanEligibilityCheck.nz, please open an issue in this repository.

---

**Built with ❤️ for New Zealand borrowers**