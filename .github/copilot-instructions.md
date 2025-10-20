# LoanEligibilityCheck.nz - GitHub Copilot Instructions

This file provides workspace-specific instructions for GitHub Copilot when working on the LoanEligibilityCheck.nz project.

## Project Overview

LoanEligibilityCheck.nz is a professional loan eligibility calculator and lender comparison platform for New Zealand borrowers, built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## Development Guidelines

### Code Style & Standards
- Follow TypeScript strict mode conventions
- Use functional components with React hooks
- Implement proper error handling and loading states
- Maintain consistent naming conventions (camelCase for variables, PascalCase for components)
- Write descriptive commit messages

### Design System
- **Primary Colors**: #E11D48 (Rose-600), #BE185D (Rose-700), #0B3C6F (Navy Blue)
- **Typography**: Manrope font family (400, 600, 700, 800 weights)
- **Components**: Use Tailwind CSS with custom fintech styling
- **Animations**: Framer Motion for smooth transitions and micro-interactions
- **Responsive**: Mobile-first approach with proper breakpoints

### Architecture Patterns
- **Pages**: Use Next.js 15 App Router structure
- **State Management**: React hooks (useState, useEffect) for local state
- **Data Persistence**: LocalStorage for cross-page data sharing
- **Type Safety**: Comprehensive TypeScript interfaces for all data structures
- **Performance**: Optimize for Core Web Vitals and loading speed

### File Organization
- **Components**: Keep page components in app/ directory
- **Logic**: Business logic in lib/ directory
- **Types**: Define interfaces in appropriate lib files
- **Styles**: Global styles in app/globals.css with Tailwind utilities
- **Assets**: Static files in public/ directory

### NZ Financial Context
- **Lenders**: Focus on major NZ banks (ANZ, ASB, Kiwibank, Westpac) and alternative lenders (Harmoney, MTF Finance)
- **Compliance**: Follow NZ lending criteria and consumer finance regulations
- **Currency**: Always use NZD formatting and appropriate salary ranges
- **Privacy**: Client-side processing only, no external data transmission

### Testing & Quality
- **Build**: Ensure TypeScript compilation without errors
- **Accessibility**: Follow WCAG guidelines for form inputs and navigation
- **Performance**: Optimize images, minimize bundle size, use proper loading states
- **Cross-browser**: Test on modern browsers and mobile devices

### Deployment Considerations
- **Environment**: Optimized for Vercel/Netlify deployment
- **SEO**: Proper meta tags, structured data for financial services
- **Analytics**: Ready for integration with privacy-compliant tracking
- **Security**: HTTPS required, no sensitive data storage

## Key Features to Maintain

1. **Loan Eligibility Calculator**: Interactive sliders with real-time scoring
2. **Compare Lenders**: Personalized recommendations based on eligibility score
3. **Improve Score**: Tailored improvement tips with impact assessment
4. **Cross-page Navigation**: Smooth transitions between calculator, comparison, and improvement pages
5. **Data Persistence**: User data maintained across page navigation via LocalStorage

## Development Commands

- `npm run dev`: Start development server (port 3002)
- `npm run build`: Build for production
- `npm run type-check`: TypeScript compilation check
- VS Code tasks available for common operations

## Contributing Guidelines

- Work through features systematically
- Keep communication concise and focused
- Follow established patterns and conventions
- Test thoroughly before suggesting completion
- Maintain professional fintech aesthetic throughout

---

*This project serves New Zealand borrowers with transparent, educational loan eligibility information.*