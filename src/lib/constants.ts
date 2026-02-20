/** Constants for form dropdowns and calculators. */

export const INDIAN_STATES = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
    'Delhi', 'Jammu and Kashmir', 'Ladakh',
    'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
    'Lakshadweep', 'Puducherry',
];

export const OCCUPATIONS = [
    { value: 'farmer', label: 'Farmer / Agricultural Worker', icon: '🌾' },
    { value: 'salaried', label: 'Salaried Employee', icon: '💼' },
    { value: 'self_employed', label: 'Self Employed / Business Owner', icon: '🏪' },
    { value: 'student', label: 'Student', icon: '🎓' },
    { value: 'unemployed', label: 'Unemployed / Homemaker', icon: '🏠' },
    { value: 'retired', label: 'Retired / Senior Citizen', icon: '🧓' },
    { value: 'artisan', label: 'Artisan / Craftsperson', icon: '🛠️' },
];

export const CATEGORIES = [
    { value: 'general', label: 'General' },
    { value: 'obc', label: 'OBC (Other Backward Classes)' },
    { value: 'sc', label: 'SC (Scheduled Caste)' },
    { value: 'st', label: 'ST (Scheduled Tribe)' },
    { value: 'ews', label: 'EWS (Economically Weaker Section)' },
];

export const INCOME_RANGES = [
    { value: 50000, label: 'Up to ₹50,000' },
    { value: 100000, label: '₹50,000 - ₹1,00,000' },
    { value: 200000, label: '₹1,00,000 - ₹2,00,000' },
    { value: 300000, label: '₹2,00,000 - ₹3,00,000' },
    { value: 500000, label: '₹3,00,000 - ₹5,00,000' },
    { value: 800000, label: '₹5,00,000 - ₹8,00,000' },
    { value: 1000000, label: '₹8,00,000 - ₹10,00,000' },
    { value: 1500000, label: '₹10,00,000 - ₹15,00,000' },
    { value: 2500000, label: '₹15,00,000 - ₹25,00,000' },
    { value: 5000000, label: 'Above ₹25,00,000' },
];

export const GENDER_OPTIONS = [
    { value: 'male', label: 'Male', icon: '👨' },
    { value: 'female', label: 'Female', icon: '👩' },
    { value: 'other', label: 'Other', icon: '🧑' },
];

export const AREA_OPTIONS = [
    { value: 'urban', label: 'Urban / City', icon: '🏙️' },
    { value: 'rural', label: 'Rural / Village', icon: '🌳' },
];

export const CALCULATOR_CATEGORIES = [
    { key: 'all', label: '🔢 All', labelHi: '🔢 सभी' },
    { key: 'tax', label: '💰 Tax & Salary', labelHi: '💰 टैक्स और सैलरी' },
    { key: 'loans', label: '🏠 Loans', labelHi: '🏠 लोन' },
    { key: 'savings', label: '📈 Savings & Investment', labelHi: '📈 बचत और निवेश' },
    { key: 'employment', label: '💼 Employment', labelHi: '💼 रोजगार' },
];

export const CALCULATOR_CARDS = [
    // ── Tax & Salary ──
    {
        slug: 'income-tax',
        title: 'Income Tax Calculator',
        titleHi: 'आयकर कैलकुलेटर',
        description: 'Compare old vs new tax regime. Find which saves you more.',
        icon: '💰',
        color: '#16A34A',
        category: 'tax',
    },
    {
        slug: 'salary',
        title: 'Salary (In-Hand) Calculator',
        titleHi: 'सैलरी कैलकुलेटर',
        description: 'CTC to in-hand salary. Know your real take-home pay.',
        icon: '💼',
        color: '#0891B2',
        category: 'tax',
    },
    {
        slug: 'hra',
        title: 'HRA Calculator',
        titleHi: 'HRA कैलकुलेटर',
        description: 'Calculate HRA exemption under Section 10(13A). Save on taxes.',
        icon: '🏠',
        color: '#B45309',
        category: 'tax',
    },
    {
        slug: 'tds',
        title: 'TDS Calculator',
        titleHi: 'TDS कैलकुलेटर',
        description: 'Calculate TDS on salary, FD interest, rent, freelance income.',
        icon: '📋',
        color: '#DC2626',
        category: 'tax',
    },
    {
        slug: 'gst',
        title: 'GST Calculator',
        titleHi: 'GST कैलकुलेटर',
        description: 'Calculate GST for any amount. Inclusive & exclusive modes.',
        icon: '🧾',
        color: '#D97706',
        category: 'tax',
    },
    // ── Loans ──
    {
        slug: 'emi',
        title: 'EMI Calculator',
        titleHi: 'EMI कैलकुलेटर',
        description: 'Calculate monthly EMI for home, car, or personal loan.',
        icon: '🏠',
        color: '#2563EB',
        category: 'loans',
    },
    {
        slug: 'home-loan-emi',
        title: 'Home Loan EMI Calculator',
        titleHi: 'होम लोन EMI कैलकुलेटर',
        description: 'Home loan EMI with year-wise amortization schedule.',
        icon: '🏡',
        color: '#0D9488',
        category: 'loans',
    },
    {
        slug: 'home-loan-eligibility',
        title: 'Home Loan Eligibility',
        titleHi: 'होम लोन पात्रता',
        description: 'Check max home loan amount you qualify for based on income.',
        icon: '🔑',
        color: '#059669',
        category: 'loans',
    },
    {
        slug: 'car-loan-emi',
        title: 'Car Loan EMI Calculator',
        titleHi: 'कार लोन EMI कैलकुलेटर',
        description: 'Car loan EMI with down payment and total interest cost.',
        icon: '🚗',
        color: '#7C3AED',
        category: 'loans',
    },
    // ── Savings & Investment ──
    // Market investments
    {
        slug: 'sip',
        title: 'SIP Calculator',
        titleHi: 'SIP कैलकुलेटर',
        description: 'See how monthly SIP investment grows over time.',
        icon: '📈',
        color: '#7C3AED',
        category: 'savings',
    },
    {
        slug: 'lumpsum',
        title: 'Lumpsum Calculator',
        titleHi: 'एकमुश्त कैलकुलेटर',
        description: 'One-time investment future value. Pairs with SIP calculator.',
        icon: '💎',
        color: '#6366F1',
        category: 'savings',
    },
    // Bank deposits
    {
        slug: 'fd-compare',
        title: 'FD Rate Comparison',
        titleHi: 'FD ब्याज दर तुलना',
        description: 'Compare fixed deposit rates across major banks.',
        icon: '🏦',
        color: '#0891B2',
        category: 'savings',
    },
    {
        slug: 'rd',
        title: 'RD Calculator',
        titleHi: 'RD कैलकुलेटर',
        description: 'Recurring deposit maturity with quarterly compounding.',
        icon: '💰',
        color: '#DB2777',
        category: 'savings',
    },
    // Govt savings & retirement
    {
        slug: 'ppf',
        title: 'PPF Calculator',
        titleHi: 'PPF कैलकुलेटर',
        description: 'Public Provident Fund returns with yearly breakdown.',
        icon: '🏛️',
        color: '#4F46E5',
        category: 'savings',
    },
    {
        slug: 'epf',
        title: 'EPF Calculator',
        titleHi: 'EPF कैलकुलेटर',
        description: 'PF corpus at retirement with employee + employer contribution.',
        icon: '🏢',
        color: '#0284C7',
        category: 'savings',
    },
    {
        slug: 'ssy',
        title: 'Sukanya Samriddhi (SSY)',
        titleHi: 'सुकन्या समृद्धि योजना',
        description: 'SSY maturity amount at age 21. Plan your daughter\'s future.',
        icon: '👧',
        color: '#EC4899',
        category: 'savings',
    },
    {
        slug: 'nps',
        title: 'NPS Calculator',
        titleHi: 'NPS कैलकुलेटर',
        description: 'Plan retirement with NPS. See corpus & monthly pension.',
        icon: '🏦',
        color: '#4F46E5',
        category: 'savings',
    },
    // ── Employment ──
    {
        slug: 'gratuity',
        title: 'Gratuity Calculator',
        titleHi: 'ग्रेच्युटी कैलकुलेटर',
        description: 'Know your gratuity amount. Check tax-free limit instantly.',
        icon: '🎁',
        color: '#7C3AED',
        category: 'employment',
    },
];

export const formatCurrency = (amount: number | null | undefined): string => {
    if (amount == null || isNaN(amount)) return '₹0';
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
    return `₹${amount.toLocaleString('en-IN')}`;
};

export const formatNumber = (num: number): string => {
    return num.toLocaleString('en-IN');
};
