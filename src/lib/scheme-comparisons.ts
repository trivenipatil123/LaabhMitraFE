/**
 * Pre-built scheme comparison data for side-by-side analysis.
 */

export interface SchemeComparisonColumn {
    name: string;
    icon: string;
    color: string;
    slug?: string; // link to calculator/scheme page
}

export interface ComparisonRow {
    label: string;
    values: string[];
    highlight?: number; // index of best value
}

export interface SchemeComparison {
    id: string;
    title: string;
    description: string;
    schemes: SchemeComparisonColumn[];
    rows: ComparisonRow[];
    verdict: string;
}

export const SCHEME_COMPARISONS: SchemeComparison[] = [
    {
        id: 'ppf-vs-nps-vs-elss',
        title: 'PPF vs NPS vs ELSS',
        description: 'Best tax-saving investment? Compare returns, lock-in, risk.',
        schemes: [
            { name: 'PPF', icon: '🏛️', color: '#4F46E5', slug: '/calculators/ppf' },
            { name: 'NPS', icon: '🏦', color: '#0891B2', slug: '/calculators/nps' },
            { name: 'ELSS', icon: '📈', color: '#7C3AED' },
        ],
        rows: [
            { label: 'Returns (approx.)', values: ['7.1% p.a. (fixed)', '8-10% p.a. (market)', '12-15% p.a. (market)'], highlight: 2 },
            { label: 'Lock-in Period', values: ['15 years', 'Till age 60', '3 years'], highlight: 2 },
            { label: 'Tax Benefit', values: ['80C (₹1.5L)', '80C + 80CCD(1B) (₹2L)', '80C (₹1.5L)'], highlight: 1 },
            { label: 'Risk Level', values: ['Zero Risk', 'Low-Medium', 'Medium-High'], highlight: 0 },
            { label: 'Maturity Tax', values: ['Tax Free (EEE)', 'Partially Taxable', 'LTCG >₹1.25L @12.5%'], highlight: 0 },
            { label: 'Min Investment', values: ['₹500/year', '₹1,000/year', '₹500 (SIP)'], highlight: 1 },
            { label: 'Ideal For', values: ['Conservative savers', 'Retirement planning', 'Wealth creation'] },
        ],
        verdict: 'PPF for safety, NPS for retirement + extra tax deduction, ELSS for highest potential returns with shortest lock-in.',
    },
    {
        id: 'fd-vs-rd-vs-ppf',
        title: 'FD vs RD vs PPF',
        description: 'Which fixed-income option gives the best returns?',
        schemes: [
            { name: 'Fixed Deposit', icon: '🏦', color: '#0891B2', slug: '/calculators/fd-compare' },
            { name: 'RD', icon: '💰', color: '#DB2777', slug: '/calculators/rd' },
            { name: 'PPF', icon: '🏛️', color: '#4F46E5', slug: '/calculators/ppf' },
        ],
        rows: [
            { label: 'Interest Rate', values: ['6.5-7.5% p.a.', '6.5-7.3% p.a.', '7.1% p.a.'], highlight: 0 },
            { label: 'Investment Type', values: ['Lumpsum', 'Monthly', 'Yearly (flexible)'] },
            { label: 'Lock-in', values: ['7 days to 10 years', '6 months to 10 years', '15 years'], highlight: 0 },
            { label: 'Tax on Returns', values: ['Fully Taxable', 'Fully Taxable', 'Tax Free (EEE)'], highlight: 2 },
            { label: '80C Benefit', values: ['Only 5-yr Tax Saver FD', 'No', 'Yes (up to ₹1.5L)'], highlight: 2 },
            { label: 'Premature Withdrawal', values: ['Yes (with penalty)', 'Yes (with penalty)', 'Partial after 6 yrs'] },
            { label: 'Best For', values: ['Lump sum parking', 'Monthly saving habit', 'Long-term tax-free'] },
        ],
        verdict: 'FD for short-term lump sum, RD for disciplined monthly saving, PPF for tax-free long-term growth.',
    },
    {
        id: 'sip-vs-lumpsum',
        title: 'SIP vs Lumpsum Investment',
        description: 'Monthly SIP or one-time investment? Which works better?',
        schemes: [
            { name: 'SIP', icon: '📈', color: '#7C3AED', slug: '/calculators/sip' },
            { name: 'Lumpsum', icon: '💎', color: '#6366F1', slug: '/calculators/lumpsum' },
        ],
        rows: [
            { label: 'Investment Style', values: ['Fixed monthly amount', 'One-time large amount'] },
            { label: 'Market Timing', values: ['No (rupee cost averaging)', 'Matters a lot'], highlight: 0 },
            { label: 'Risk', values: ['Lower (averaged)', 'Higher (single entry)'], highlight: 0 },
            { label: 'Best In Bull Market', values: ['Good', 'Excellent'], highlight: 1 },
            { label: 'Best In Bear Market', values: ['Excellent (buys low)', 'Risky'], highlight: 0 },
            { label: 'Min Amount', values: ['₹500/month', '₹1,000+'] },
            { label: 'Discipline Needed', values: ['High (monthly)', 'Low (one-time)'], highlight: 1 },
            { label: 'Ideal For', values: ['Salaried individuals', 'Bonus/inheritance'] },
        ],
        verdict: 'SIP for regular income earners (safer via averaging). Lumpsum when you have surplus and markets look attractive.',
    },
    {
        id: 'epf-vs-ppf-vs-nps',
        title: 'EPF vs PPF vs NPS',
        description: 'Government retirement schemes compared — which is best?',
        schemes: [
            { name: 'EPF', icon: '🏢', color: '#0284C7', slug: '/calculators/epf' },
            { name: 'PPF', icon: '🏛️', color: '#4F46E5', slug: '/calculators/ppf' },
            { name: 'NPS', icon: '🏦', color: '#0891B2', slug: '/calculators/nps' },
        ],
        rows: [
            { label: 'Interest Rate', values: ['8.25% (FY25-26)', '7.1% p.a.', '8-10% (market)'], highlight: 0 },
            { label: 'Employer Contribution', values: ['Yes (matched)', 'No', 'Optional'], highlight: 0 },
            { label: 'Lock-in', values: ['Till retirement/exit', '15 years', 'Till age 60'] },
            { label: 'Tax on Withdrawal', values: ['Tax-free (if >5 yrs)', 'Tax-free (EEE)', '60% tax-free, 40% annuity'] },
            { label: 'Extra 80CCD Deduction', values: ['No', 'No', 'Yes (₹50,000)'], highlight: 2 },
            { label: 'Voluntary Top-up', values: ['VPF available', 'Up to ₹1.5L/yr', 'Unlimited'] },
        ],
        verdict: 'EPF is automatic for salaried (best rate). Add PPF for tax-free savings. NPS for extra ₹50K tax deduction.',
    },
    {
        id: 'ssy-vs-ppf',
        title: 'Sukanya Samriddhi vs PPF',
        description: 'Best scheme for your daughter\'s future?',
        schemes: [
            { name: 'SSY', icon: '👧', color: '#EC4899', slug: '/calculators/ssy' },
            { name: 'PPF', icon: '🏛️', color: '#4F46E5', slug: '/calculators/ppf' },
        ],
        rows: [
            { label: 'Interest Rate', values: ['8.2% p.a.', '7.1% p.a.'], highlight: 0 },
            { label: 'Eligibility', values: ['Girl child (0-10 yrs)', 'Any Indian citizen'] },
            { label: 'Max Deposit', values: ['₹1.5 lakh/year', '₹1.5 lakh/year'] },
            { label: 'Lock-in', values: ['21 years (from opening)', '15 years'], highlight: 1 },
            { label: 'Tax Status', values: ['EEE (fully tax-free)', 'EEE (fully tax-free)'] },
            { label: 'Partial Withdrawal', values: ['After age 18 (50%)', 'After 6 years'], highlight: 1 },
            { label: 'Best For', values: ['Daughter\'s marriage/education', 'General long-term saving'] },
        ],
        verdict: 'SSY wins on interest rate. Open SSY for daughters and PPF for yourself — maximize tax-free returns.',
    },
];
