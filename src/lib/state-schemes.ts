/**
 * State-level government schemes for top Indian states.
 */

export interface StateScheme {
    name: string;
    nameHi: string;
    description: string;
    benefit: string;
    eligibility: string;
    applyUrl?: string;
    category: string;
}

export interface StateData {
    name: string;
    icon: string;
    color: string;
    schemes: StateScheme[];
}

export const STATE_SCHEMES: Record<string, StateData> = {
    maharashtra: {
        name: 'Maharashtra',
        icon: '🏛️',
        color: '#F97316',
        schemes: [
            {
                name: 'Majhi Ladki Bahin Yojana',
                nameHi: 'माझी लाडकी बहीण योजना',
                description: 'Monthly financial assistance of ₹1,500 to women aged 21-65 from low-income families.',
                benefit: '₹1,500/month',
                eligibility: 'Women 21-65 years, annual family income below ₹2.5 lakh',
                category: 'women',
                applyUrl: 'https://ladkibahin.maharashtra.gov.in',
            },
            {
                name: 'Mahatma Jyotiba Phule Jan Arogya Yojana',
                nameHi: 'महात्मा ज्योतिबा फुले जन आरोग्य योजना',
                description: 'Free health insurance cover of ₹1.5 lakh for surgeries and treatments.',
                benefit: '₹1.5 lakh health cover',
                eligibility: 'Yellow/Orange ration card holders',
                category: 'health',
            },
            {
                name: 'Gharkul Yojana',
                nameHi: 'घरकुल योजना',
                description: 'Free housing or financial assistance for construction of house.',
                benefit: '₹1.2-2.5 lakh housing grant',
                eligibility: 'Homeless families, BPL category',
                category: 'housing',
            },
            {
                name: 'Shetkari Sanman Yojana',
                nameHi: 'शेतकरी सन्मान योजना',
                description: 'Direct financial support to farmers for crop cultivation.',
                benefit: '₹6,000/year per farmer',
                eligibility: 'Registered farmers with less than 2 hectare land',
                category: 'agriculture',
            },
            {
                name: 'Ramai Awas Yojana',
                nameHi: 'रमाई आवास योजना',
                description: 'Housing scheme for SC/ST families to build pucca house.',
                benefit: '₹2.5 lakh housing grant',
                eligibility: 'SC/ST families without own house',
                category: 'housing',
            },
            {
                name: 'Abhay Yojana (Loan Waiver)',
                nameHi: 'अभय योजना',
                description: 'One-time settlement scheme for overdue electricity bills with waiver on interest/penalty.',
                benefit: 'Waiver on interest and penalties',
                eligibility: 'Domestic, commercial, agricultural consumers with overdue bills',
                category: 'welfare',
            },
        ],
    },
    up: {
        name: 'Uttar Pradesh',
        icon: '🕌',
        color: '#2563EB',
        schemes: [
            {
                name: 'Kanya Sumangala Yojana',
                nameHi: 'कन्या सुमंगला योजना',
                description: '₹25,000 in 6 installments from birth to graduation for girls.',
                benefit: '₹25,000 total (6 installments)',
                eligibility: 'Girl child, family income below ₹3 lakh/year',
                category: 'women',
                applyUrl: 'https://mksy.up.gov.in',
            },
            {
                name: 'UP Shadi Anudan Yojana',
                nameHi: 'UP शादी अनुदान योजना',
                description: 'Financial assistance of ₹51,000 for marriage of daughters from poor families.',
                benefit: '₹51,000 marriage grant',
                eligibility: 'Rural income < ₹46,080, Urban income < ₹56,460',
                category: 'women',
            },
            {
                name: 'UP Pension Yojana (Vridha/Vidhwa/Divyang)',
                nameHi: 'UP पेंशन योजना',
                description: 'Monthly pension for elderly, widows, and disabled persons.',
                benefit: '₹1,000/month pension',
                eligibility: 'BPL families — age 60+ (old age), widows, disabled',
                category: 'pension',
            },
            {
                name: 'UP Bhagya Laxmi Yojana',
                nameHi: 'UP भाग्य लक्ष्मी योजना',
                description: '₹50,000 bond on birth of girl + ₹2 lakh at class 6.',
                benefit: '₹50,000 bond + ₹2 lakh',
                eligibility: 'BPL families, girl child born after March 2006',
                category: 'women',
            },
            {
                name: 'UP Free Laptop Yojana',
                nameHi: 'UP मुफ्त लैपटॉप योजना',
                description: 'Free tablets/laptops for students who pass class 10/12 with good marks.',
                benefit: 'Free tablet/laptop',
                eligibility: 'Students passing class 10/12 with 65%+ marks',
                category: 'education',
            },
        ],
    },
    karnataka: {
        name: 'Karnataka',
        icon: '🏰',
        color: '#DC2626',
        schemes: [
            {
                name: 'Gruha Lakshmi Yojana',
                nameHi: 'गृह लक्ष्मी योजना',
                description: '₹2,000 monthly to women heads of families.',
                benefit: '₹2,000/month',
                eligibility: 'Woman head of household, no govt job in family',
                category: 'women',
                applyUrl: 'https://sevasindhuservices.karnataka.gov.in',
            },
            {
                name: 'Gruha Jyothi Yojana',
                nameHi: 'गृह ज्योति योजना',
                description: 'Free electricity up to 200 units per month.',
                benefit: 'Free electricity (200 units)',
                eligibility: 'One connection per household',
                category: 'welfare',
            },
            {
                name: 'Anna Bhagya Yojana',
                nameHi: 'अन्न भाग्य योजना',
                description: '10 kg free rice per person per month for BPL families.',
                benefit: '10 kg rice/person/month',
                eligibility: 'BPL/Antyodaya/Priority card holders',
                category: 'welfare',
            },
            {
                name: 'Yuva Nidhi Yojana',
                nameHi: 'युवा निधि योजना',
                description: 'Monthly stipend to unemployed graduates while they search for jobs.',
                benefit: '₹3,000-5,000/month for 2 years',
                eligibility: 'Graduates/Diploma holders aged 18-25, unemployed',
                category: 'education',
            },
            {
                name: 'Shakti Smart Card (Free Bus)',
                nameHi: 'शक्ति स्मार्ट कार्ड',
                description: 'Free bus travel for all women in state-run KSRTC/BMTC buses.',
                benefit: 'Free bus travel',
                eligibility: 'All women in Karnataka',
                category: 'women',
            },
        ],
    },
    tamilnadu: {
        name: 'Tamil Nadu',
        icon: '🛕',
        color: '#7C3AED',
        schemes: [
            {
                name: 'Kalaignar Magalir Urimai Thogai',
                nameHi: 'कलैगनर महिला उरिमई थोगई',
                description: '₹1,000 monthly financial assistance to women heads of families.',
                benefit: '₹1,000/month',
                eligibility: 'Women family heads, annual income below ₹2.5 lakh',
                category: 'women',
            },
            {
                name: 'Tamil Nadu Marriage Assistance',
                nameHi: 'तमिलनाडु विवाह सहायता योजना',
                description: '₹50,000 + 8g gold for marriage of poor girls with education bonus.',
                benefit: '₹25,000-50,000 + 8g gold',
                eligibility: 'Girls from poor families, passed class 10/12/graduate',
                category: 'women',
            },
            {
                name: 'Free Bus Pass for Students',
                nameHi: 'छात्रों के लिए मुफ्त बस पास',
                description: 'Free bus travel for school and college students.',
                benefit: 'Free bus pass',
                eligibility: 'All school & college students',
                category: 'education',
            },
            {
                name: 'Amma Two Wheeler Scheme',
                nameHi: 'अम्मा टू-व्हीलर योजना',
                description: '50% subsidy on purchase of a two-wheeler for working women.',
                benefit: '50% subsidy (max ₹25,000)',
                eligibility: 'Working women with income below ₹2.5 lakh',
                category: 'women',
            },
            {
                name: 'Chief Minister\'s Breakfast Scheme',
                nameHi: 'मुख्यमंत्री नाश्ता योजना',
                description: 'Free nutritious breakfast for government school children (class 1-5).',
                benefit: 'Free daily breakfast',
                eligibility: 'Government school students (class 1-5)',
                category: 'education',
            },
        ],
    },
    bihar: {
        name: 'Bihar',
        icon: '🏛️',
        color: '#059669',
        schemes: [
            {
                name: 'Mukhyamantri Kanya Utthan Yojana',
                nameHi: 'मुख्यमंत्री कन्या उत्थान योजना',
                description: '₹54,100 total from birth to graduation for girls.',
                benefit: '₹54,100 (multiple installments)',
                eligibility: 'All girls in Bihar, from birth to graduation',
                category: 'women',
            },
            {
                name: 'Bihar Student Credit Card',
                nameHi: 'बिहार स्टूडेंट क्रेडिट कार्ड',
                description: 'Up to ₹4 lakh education loan at 0% interest for higher studies.',
                benefit: '₹4 lakh education loan at 0%',
                eligibility: 'Bihar residents, passed class 12, age 25 or below',
                category: 'education',
                applyUrl: 'https://www.7nishchay-yuvaupmission.bihar.gov.in',
            },
            {
                name: 'Bihar Cycle Yojana (Class 9)',
                nameHi: 'बिहार साइकिल योजना',
                description: 'Free bicycle or ₹3,000 to class 9 students to reduce dropouts.',
                benefit: 'Free bicycle or ₹3,000',
                eligibility: 'Government school students entering class 9',
                category: 'education',
            },
            {
                name: 'Laxmibai Social Security Pension',
                nameHi: 'लक्ष्मीबाई सामाजिक सुरक्षा पेंशन',
                description: 'Monthly pension for widows aged 18+.',
                benefit: '₹500/month pension',
                eligibility: 'Widows aged 18+ in Bihar',
                category: 'pension',
            },
            {
                name: 'Mukhyamantri Gramin Awas Yojana',
                nameHi: 'मुख्यमंत्री ग्रामीण आवास योजना',
                description: 'Housing assistance for homeless rural families.',
                benefit: '₹1.2 lakh housing grant',
                eligibility: 'Homeless rural families, SECC listed',
                category: 'housing',
            },
        ],
    },
};

export const STATES_LIST = Object.entries(STATE_SCHEMES).map(([key, data]) => ({
    key,
    ...data,
    schemeCount: data.schemes.length,
}));

export const STATE_SCHEME_CATEGORIES = [
    { key: 'all', label: '🔢 All' },
    { key: 'women', label: '👩 Women' },
    { key: 'education', label: '📚 Education' },
    { key: 'health', label: '🏥 Health' },
    { key: 'housing', label: '🏠 Housing' },
    { key: 'agriculture', label: '🌾 Agriculture' },
    { key: 'welfare', label: '🤝 Welfare' },
    { key: 'pension', label: '🧓 Pension' },
];
