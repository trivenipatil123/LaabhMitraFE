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

export const CALCULATOR_CARDS = [
    {
        slug: 'income-tax',
        title: 'Income Tax Calculator',
        titleHi: 'आयकर कैलकुलेटर',
        description: 'Compare old vs new tax regime. Find which saves you more.',
        icon: '💰',
        color: '#16A34A',
    },
    {
        slug: 'emi',
        title: 'EMI Calculator',
        titleHi: 'EMI कैलकुलेटर',
        description: 'Calculate monthly EMI for home, car, or personal loan.',
        icon: '🏠',
        color: '#2563EB',
    },
    {
        slug: 'sip',
        title: 'SIP Calculator',
        titleHi: 'SIP कैलकुलेटर',
        description: 'See how your monthly SIP investment grows over time.',
        icon: '📈',
        color: '#7C3AED',
    },
    {
        slug: 'gst',
        title: 'GST Calculator',
        titleHi: 'GST कैलकुलेटर',
        description: 'Calculate GST for any amount. Inclusive & exclusive modes.',
        icon: '🧾',
        color: '#D97706',
    },
    {
        slug: 'fd-compare',
        title: 'FD Rate Comparison',
        titleHi: 'FD ब्याज दर तुलना',
        description: 'Compare fixed deposit rates across major banks.',
        icon: '🏦',
        color: '#0891B2',
    },
    {
        slug: 'ppf',
        title: 'PPF Calculator',
        titleHi: 'PPF कैलकुलेटर',
        description: 'Calculate Public Provident Fund returns with yearly breakdown.',
        icon: '🏛️',
        color: '#4F46E5',
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
