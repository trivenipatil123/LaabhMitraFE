/**
 * Scheme deadline data — important government deadlines
 * that Indian citizens need to track.
 */

export interface Deadline {
    id: string;
    title: string;
    titleHi: string;
    description: string;
    date: string; // ISO date string
    category: 'tax' | 'scheme' | 'insurance' | 'investment' | 'pension';
    icon: string;
    urgency: 'high' | 'medium' | 'low';
    link?: string;
    linkLabel?: string;
}

// Financial year 2025-26 and upcoming deadlines
export const DEADLINES: Deadline[] = [
    {
        id: 'itr-filing-2026',
        title: 'ITR Filing Deadline (AY 2026-27)',
        titleHi: 'ITR दाखिल करने की अंतिम तिथि',
        description: 'Last date to file Income Tax Return for AY 2026-27 without penalty.',
        date: '2026-07-31',
        category: 'tax',
        icon: '📄',
        urgency: 'high',
        link: '/calculators/income-tax',
        linkLabel: 'Calculate Your Tax',
    },
    {
        id: 'advance-tax-q4',
        title: 'Advance Tax — 4th Instalment',
        titleHi: 'अग्रिम कर — चौथी किस्त',
        description: 'Last date to pay 4th instalment of advance tax for FY 2025-26.',
        date: '2026-03-15',
        category: 'tax',
        icon: '💰',
        urgency: 'high',
    },
    {
        id: 'ppf-investment-fy26',
        title: 'PPF Investment for FY 2025-26',
        titleHi: 'PPF निवेश अंतिम तिथि',
        description: 'Invest in PPF before March 31 to get tax benefit under Section 80C for this financial year.',
        date: '2026-03-31',
        category: 'investment',
        icon: '🏛️',
        urgency: 'high',
        link: '/calculators/ppf',
        linkLabel: 'Calculate PPF Returns',
    },
    {
        id: 'tax-saving-deadline',
        title: 'Tax Saving Investments Deadline',
        titleHi: 'कर बचत निवेश अंतिम तिथि',
        description: 'Last date for 80C, 80D investments (ELSS, NPS, PPF, Insurance) for FY 2025-26.',
        date: '2026-03-31',
        category: 'tax',
        icon: '🧾',
        urgency: 'high',
    },
    {
        id: 'pm-kisan-ekyc',
        title: 'PM Kisan e-KYC Renewal',
        titleHi: 'PM किसान e-KYC नवीनीकरण',
        description: 'Complete e-KYC to continue receiving PM Kisan installments. Required annually.',
        date: '2026-03-31',
        category: 'scheme',
        icon: '🌾',
        urgency: 'high',
        link: '/schemes/pm-kisan-samman-nidhi',
        linkLabel: 'View PM Kisan Details',
    },
    {
        id: 'ayushman-renewal',
        title: 'Ayushman Bharat Card Renewal',
        titleHi: 'आयुष्मान भारत कार्ड नवीनीकरण',
        description: 'Renew your Ayushman Bharat PMJAY card for continued health coverage.',
        date: '2026-06-30',
        category: 'insurance',
        icon: '🏥',
        urgency: 'medium',
        link: '/schemes/ayushman-bharat-pmjay',
        linkLabel: 'View Scheme Details',
    },
    {
        id: 'nps-contribution',
        title: 'NPS Contribution for Tax Benefit',
        titleHi: 'NPS योगदान कर लाभ हेतु',
        description: 'Invest ₹50,000 in NPS for additional 80CCD(1B) deduction before FY ends.',
        date: '2026-03-31',
        category: 'pension',
        icon: '🏦',
        urgency: 'medium',
        link: '/calculators/nps',
        linkLabel: 'Calculate NPS Returns',
    },
    {
        id: 'ssy-annual-deposit',
        title: 'SSY Minimum Annual Deposit',
        titleHi: 'SSY न्यूनतम वार्षिक जमा',
        description: 'Deposit minimum ₹250 in Sukanya Samriddhi Yojana to keep account active.',
        date: '2026-03-31',
        category: 'investment',
        icon: '👧',
        urgency: 'medium',
        link: '/calculators/ssy',
        linkLabel: 'Calculate SSY Returns',
    },
    {
        id: 'epf-nomination',
        title: 'EPF e-Nomination',
        titleHi: 'EPF ई-नामांकन',
        description: 'Complete digital nomination on EPFO portal. Important for PF claim settlement.',
        date: '2026-06-30',
        category: 'pension',
        icon: '🏢',
        urgency: 'low',
    },
    {
        id: 'form-16-download',
        title: 'Download Form 16 from Employer',
        titleHi: 'नियोक्ता से फॉर्म 16 प्राप्त करें',
        description: 'Employers must issue Form 16 by June 15. Collect it for ITR filing.',
        date: '2026-06-15',
        category: 'tax',
        icon: '📋',
        urgency: 'medium',
    },
    {
        id: 'apy-enrollment',
        title: 'Atal Pension Yojana Enrollment',
        titleHi: 'अटल पेंशन योजना नामांकन',
        description: 'Enroll before age 40 for guaranteed pension of ₹1,000-₹5,000/month after 60.',
        date: '2026-09-30',
        category: 'pension',
        icon: '🧓',
        urgency: 'low',
        link: '/schemes/atal-pension-yojana',
        linkLabel: 'View Scheme Details',
    },
    {
        id: 'belated-itr',
        title: 'Belated/Revised ITR Deadline',
        titleHi: 'विलंबित/संशोधित ITR अंतिम तिथि',
        description: 'Last date to file belated or revised return for AY 2026-27.',
        date: '2026-12-31',
        category: 'tax',
        icon: '⚠️',
        urgency: 'low',
    },
];

/** Get deadlines for current and upcoming months */
export function getUpcomingDeadlines(limit?: number): Deadline[] {
    const now = new Date();
    const upcoming = DEADLINES
        .filter((d) => new Date(d.date) >= now)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    return limit ? upcoming.slice(0, limit) : upcoming;
}

/** Count deadlines in the current month */
export function getDeadlinesThisMonth(): number {
    const now = new Date();
    return DEADLINES.filter((d) => {
        const dd = new Date(d.date);
        return dd.getMonth() === now.getMonth() && dd.getFullYear() === now.getFullYear() && dd >= now;
    }).length;
}

/** Days until a deadline */
export function daysUntil(dateStr: string): number {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const target = new Date(dateStr);
    target.setHours(0, 0, 0, 0);
    return Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}
