/**
 * Document checklist and application process data for key government schemes.
 */

export interface DocumentItem {
    name: string;
    required: boolean;
    note?: string;
}

export interface ApplicationStep {
    step: number;
    title: string;
    description: string;
}

export interface SchemeChecklist {
    slug: string; // matches scheme slug
    documents: DocumentItem[];
    applicationSteps: ApplicationStep[];
    whereToApply: string;
    applyUrl?: string;
    helpline?: string;
}

export const SCHEME_CHECKLISTS: Record<string, SchemeChecklist> = {
    'pm-kisan-samman-nidhi': {
        slug: 'pm-kisan-samman-nidhi',
        documents: [
            { name: 'Aadhaar Card', required: true },
            { name: 'Bank Account Passbook (linked to Aadhaar)', required: true },
            { name: 'Land Ownership Records (Khasra/Khatauni)', required: true },
            { name: 'Self Declaration Form', required: true },
            { name: 'Mobile Number', required: true, note: 'For OTP verification' },
        ],
        applicationSteps: [
            { step: 1, title: 'Visit PM Kisan Portal', description: 'Go to pmkisan.gov.in or visit your nearest CSC center.' },
            { step: 2, title: 'New Registration', description: 'Click "New Farmer Registration" and enter Aadhaar number.' },
            { step: 3, title: 'Fill Details', description: 'Enter personal details, bank account, and land details.' },
            { step: 4, title: 'OTP Verification', description: 'Verify via OTP sent to registered mobile number.' },
            { step: 5, title: 'Submit & Track', description: 'Submit application and note the registration number for tracking.' },
        ],
        whereToApply: 'pmkisan.gov.in or nearest CSC center',
        applyUrl: 'https://pmkisan.gov.in',
        helpline: '155261 / 011-24300606',
    },
    'ayushman-bharat-pmjay': {
        slug: 'ayushman-bharat-pmjay',
        documents: [
            { name: 'Aadhaar Card (of all family members)', required: true },
            { name: 'Ration Card (SECC listed)', required: true },
            { name: 'Income Certificate', required: false, note: 'May be needed for verification' },
            { name: 'Mobile Number', required: true },
            { name: 'Passport Photo', required: true },
        ],
        applicationSteps: [
            { step: 1, title: 'Check Eligibility', description: 'Visit mera.pmjay.gov.in and enter mobile/Aadhaar to check if listed in SECC.' },
            { step: 2, title: 'Visit Empaneled Hospital', description: 'Go to any empaneled hospital with Aadhaar card.' },
            { step: 3, title: 'Arogya Mitra', description: 'Meet the Arogya Mitra at hospital who will verify and create your e-card.' },
            { step: 4, title: 'Get e-Card', description: 'Receive your Ayushman Card for cashless treatment up to ₹5 lakh.' },
        ],
        whereToApply: 'Any empaneled hospital or CSC center',
        applyUrl: 'https://mera.pmjay.gov.in',
        helpline: '14555',
    },
    'pradhan-mantri-awas-yojana': {
        slug: 'pradhan-mantri-awas-yojana',
        documents: [
            { name: 'Aadhaar Card', required: true },
            { name: 'Income Certificate', required: true },
            { name: 'Bank Account Details', required: true },
            { name: 'Address Proof (current residence)', required: true },
            { name: 'Affidavit — no pucca house owned anywhere in India', required: true },
            { name: 'Proof of existing house (for enhancement)', required: false },
            { name: 'Caste Certificate (for BPL/SC/ST)', required: false },
        ],
        applicationSteps: [
            { step: 1, title: 'Visit PMAY Portal', description: 'Go to pmaymis.gov.in or nearest CSC center.' },
            { step: 2, title: 'Check Eligibility', description: 'Enter Aadhaar and verify eligibility based on income category (EWS/LIG/MIG).' },
            { step: 3, title: 'Fill Application', description: 'Complete the online form with personal, income, and property details.' },
            { step: 4, title: 'Upload Documents', description: 'Upload required documents and submit.' },
            { step: 5, title: 'Track Status', description: 'Track application status using application ID.' },
        ],
        whereToApply: 'pmaymis.gov.in or city municipal office/CSC',
        applyUrl: 'https://pmaymis.gov.in',
        helpline: '1800-11-3377',
    },
    'atal-pension-yojana': {
        slug: 'atal-pension-yojana',
        documents: [
            { name: 'Aadhaar Card', required: true },
            { name: 'Savings Bank Account', required: true, note: 'In nationalized/private bank or post office' },
            { name: 'Mobile Number', required: true },
            { name: 'Nominee Details (Aadhaar of spouse/nominee)', required: true },
        ],
        applicationSteps: [
            { step: 1, title: 'Visit Your Bank', description: 'Go to your bank branch where you have a savings account.' },
            { step: 2, title: 'Fill APY Form', description: 'Complete the APY registration form with pension amount preference (₹1,000-₹5,000).' },
            { step: 3, title: 'Provide Aadhaar & Mobile', description: 'Submit Aadhaar for KYC and link mobile number.' },
            { step: 4, title: 'Auto-Debit Setup', description: 'Set up monthly/quarterly auto-debit from your savings account.' },
        ],
        whereToApply: 'Any bank branch with savings account',
        helpline: '1800-889-1030',
    },
    'sukanya-samriddhi-yojana': {
        slug: 'sukanya-samriddhi-yojana',
        documents: [
            { name: 'Birth Certificate of Girl Child', required: true },
            { name: 'Aadhaar Card of Girl Child', required: true },
            { name: 'Aadhaar Card of Parent/Guardian', required: true },
            { name: 'Address Proof', required: true },
            { name: 'Passport Photos (parent + child)', required: true },
            { name: 'PAN Card of Parent', required: false },
        ],
        applicationSteps: [
            { step: 1, title: 'Visit Post Office or Bank', description: 'Go to nearest post office or authorized bank (SBI, PNB, BOI, etc.).' },
            { step: 2, title: 'Fill SSY Account Opening Form', description: 'Complete the form with parent and daughter details.' },
            { step: 3, title: 'Submit Documents', description: 'Submit birth certificate, Aadhaar, address proof, and photos.' },
            { step: 4, title: 'Initial Deposit', description: 'Make initial deposit of minimum ₹250 (max ₹1.5 lakh/year).' },
            { step: 5, title: 'Get Passbook', description: 'Receive SSY account passbook for future deposits and tracking.' },
        ],
        whereToApply: 'Post Office or authorized bank branch',
    },
    'national-pension-system': {
        slug: 'national-pension-system',
        documents: [
            { name: 'Aadhaar Card', required: true },
            { name: 'PAN Card', required: true },
            { name: 'Bank Account (with IFSC)', required: true },
            { name: 'Passport Photo', required: true },
            { name: 'Signature Scan', required: true },
            { name: 'Address Proof', required: true },
        ],
        applicationSteps: [
            { step: 1, title: 'Visit eNPS Portal', description: 'Go to enps.nsdl.com and click "Registration".' },
            { step: 2, title: 'Aadhaar-based Registration', description: 'Verify identity via Aadhaar OTP for instant e-KYC.' },
            { step: 3, title: 'Choose Tier and Fund', description: 'Select Tier I (mandatory), choose fund manager and allocation (Auto/Active).' },
            { step: 4, title: 'Initial Contribution', description: 'Make initial contribution of minimum ₹500 for Tier I.' },
            { step: 5, title: 'Get PRAN', description: 'Receive PRAN (Permanent Retirement Account Number) via email.' },
        ],
        whereToApply: 'enps.nsdl.com (online) or any POP (Point of Presence)',
        applyUrl: 'https://enps.nsdl.com',
    },
};
