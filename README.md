# LoanEligibilityCheck.nz

A professional loan eligibility calculator and lender comparison platform for New Zealand borrowers. Built with Next.js, TypeScript, and Tailwind CSS, featuring a fintech-grade user interface inspired by leading NZ financial services.

## Live Demo

Visit the live application at `http://localhost:3002` (when running locally)

## Features

### Loan Eligibility Calculator (Home Page)
- **Interactive Sliders**: Age, income, and debt inputs with real-time feedback
- **Credit Assessment**: Dropdown selection for credit rating and residency status
- **Real-time Scoring**: Live eligibility calculation with color-coded results
- **Professional UI**: Fintech-grade design with glassmorphism effects and animations
- **Responsive Design**: Mobile-first approach with Tailwind CSS

### Compare Lenders Page
- **Dynamic Data Loading**: Lender information loaded from JSON endpoint for easy updates
- **Personalized Recommendations**: Lender matching based on eligibility score from calculator
- **Comprehensive Database**: 10+ NZ lenders including banks, fintechs, and non-bank lenders
- **Real-time Filtering**: Shows only lenders likely to approve based on user's score
- **Detailed Comparisons**: Interest rates, loan ranges, approval times, and eligibility notes
- **Direct Applications**: External links to actual lender application forms

### Improve Score Page
- **Personalized Tips**: Tailored improvement suggestions based on user data
- **Impact Assessment**: High/Medium/Low impact ratings for each recommendation
- **Action Plans**: Specific steps to improve loan eligibility
- **Resource Links**: NZ-specific financial education resources
- **Score Breakdown**: Visual analysis of current eligibility factors

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript for type safety and interface definitions
- **Styling**: Tailwind CSS with custom fintech color palette
- **Animations**: Framer Motion for smooth transitions and micro-interactions
- **Icons**: Lucide React for professional iconography
- **Font**: Manrope (Google Fonts) for professional typography
- **Data**: Dynamic JSON loading from `/public/lenders.json`
- **Storage**: LocalStorage for cross-page data persistence
- **Architecture**: Client-side data fetching with real-time filtering

## Design System

### Color Palette
- **Primary Red**: `#E11D48` (Rose-600)
- **Secondary Red**: `#BE185D` (Rose-700)
- **Dark Blue**: `#0B3C6F` (Professional headers)
- **Light Gray**: `#F8FAFC` (Background gradients)

### Typography
- **Primary Font**: Manrope (weights: 400, 600, 700, 800)
- **Hierarchy**: Clear typographic scale for readability

### Components
- **Sliders**: Custom webkit styling with gradient backgrounds
- **Buttons**: Gradient effects with hover animations
- **Cards**: Glass morphism with subtle shadows
- **Animations**: Framer Motion for micro-interactions

## Scoring Algorithm

The eligibility calculator uses a comprehensive 100-point scoring system:

### Age (15 points max)
- 25-55 years: 15 points (prime earning years)
- 18-24 years: 12 points (building credit)
- 56-65 years: 10 points (pre-retirement)
- Other: 5 points

### Income (25 points max)
- $80,000+: 25 points
- $60,000+: 20 points
- $40,000+: 15 points
- $30,000+: 10 points
- Below $30,000: 5 points

### Debt-to-Income Ratio (20 points max)
- ≤20%: 20 points (excellent)
- ≤30%: 15 points (good)
- ≤40%: 10 points (moderate)
- >40%: 5 points (high risk)

### Credit Rating (25 points max)
- Excellent: 25 points
- Good: 20 points
- Average: 10 points
- Poor: 0 points

### Residency Status (15 points max)
- Citizen/Resident: 15 points
- Work Visa: 10 points
- Other: 0 points

### Score Tiers
- **80-100**: Excellent eligibility (most lenders)
- **60-79**: Good eligibility (mainstream lenders)
- **40-59**: Moderate eligibility (specialist lenders)
- **0-39**: Poor eligibility (improvement needed)

## Project Structure

```
LoanEligibilityCheck.nz/
├── app/
│   ├── compare-lenders/
│   │   └── page.tsx          # Lender comparison page
│   ├── improve-score/
│   │   └── page.tsx          # Score improvement tips
│   ├── layout.tsx            # Root layout with metadata
│   ├── page.tsx              # Main calculator page
│   └── globals.css           # Global styles
├── lib/
│   └── calculateEligibility.ts   # Core scoring logic
├── public/
│   └── logos/                # Lender logos (placeholder)
├── .github/
│   └── copilot-instructions.md   # Development guidelines
├── package.json              # Dependencies
├── tailwind.config.js        # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
└── README.md                # This file
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone [repository-url]
cd LoanEligibilityCheck.nz

# Install dependencies
npm install

# Start development server
npm run dev
```

### Development
```bash
# Start development server (runs on port 3002)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run type checking
npm run type-check
```

### VS Code Tasks
The project includes VS Code tasks for common operations:
- **Build Project**: Compile TypeScript and build application
- **Start Dev Server**: Launch development server with hot reload

## Configuration

### Environment Variables
Create a `.env.local` file for local development:
```env
# Add any API keys or configuration here
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
```

### Tailwind Customization
The project uses a custom Tailwind configuration with fintech-specific colors and components. Modify `tailwind.config.js` to adjust the design system.

### Dynamic Data System
The application uses a hybrid approach for data management:

#### Static Assets
- Core application logic and UI components
- TypeScript interfaces and type definitions
- Styling and configuration files

#### Dynamic JSON Data
```javascript
// Lender data loaded at runtime from /public/lenders.json
useEffect(() => {
  fetch('/lenders.json')
    .then(res => res.json())
    .then(setLenders)
    .catch(console.error);
}, []);
```

#### TypeScript Configuration
Strict TypeScript settings with comprehensive interface definitions:
- `LoanData`: User input data structure
- `EligibilityResult`: Calculator output with improvement suggestions
- `Lender`: Complete lender information schema
- `ImprovementSuggestion`: Structured improvement recommendations

## Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 768px (single column, stacked elements)
- **Tablet**: 768px - 1024px (two columns where appropriate)
- **Desktop**: > 1024px (full three-column layout)

## Data Privacy

- **No Server Storage**: All data processed client-side
- **LocalStorage Only**: Data persists only in browser
- **No Tracking**: No personal data sent to external services
- **Secure**: HTTPS required in production

## Dynamic Lender Database

The application uses a JSON-based lender database (`/public/lenders.json`) that can be updated without redeploying:

### Lender Categories
- **Banks**: ANZ, BNZ, Kiwibank, Westpac NZ
- **Fintech**: Harmoney, Nectar NZ 
- **Non-Bank**: Finance Now, Avanti Finance, Instant Finance
- **Brokers**: Simplify Loans (alternative lender network)

### Data Structure
Each lender entry includes:
- Name and logo path
- Interest rate range (rateFrom - rateTo)
- Loan amount range
- Approval timeframe
- Lender type (bank/fintech/non-bank/broker)
- Eligibility requirements
- Minimum eligibility score needed
- Direct application URL

### Dynamic Features
- **Real-time Filtering**: Only shows lenders matching user's eligibility score
- **Score-based Sorting**: Lenders ordered by minimum score requirements
- **Easy Updates**: Modify `/public/lenders.json` to add/update lender information
- **Extensible**: Can be easily replaced with API endpoint for live data

## Future Enhancements

### Planned Features
- [ ] Real-time interest rate updates via API
- [ ] Advanced filtering options
- [ ] Loan repayment calculator
- [ ] Email results functionality
- [ ] Mortgage pre-approval integration
- [ ] Credit score monitoring integration

### Technical Improvements
- [ ] Progressive Web App (PWA) support
- [ ] Advanced analytics tracking
- [ ] A/B testing framework
- [ ] Performance monitoring
- [ ] Automated testing suite

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please read our contributing guidelines and submit pull requests to the main branch.

## Support

For support or questions about this application:
- Open an issue on GitHub
- Contact the development team
- Check the documentation

## Version History

- **v1.0.0**: Initial release with calculator and comparison features
  - Professional fintech UI design
  - Three-page experience (Calculator, Compare, Improve)
  - Comprehensive NZ lender database
  - Mobile-responsive design
  - TypeScript and accessibility compliance

---

**Built for New Zealand borrowers**