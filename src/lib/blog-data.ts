export interface BlogSection {
    heading: string;
    content: string; // HTML string
}

export interface FAQ {
    question: string;
    answer: string;
}

export interface BlogPost {
    slug: string;
    title: string;
    metaTitle: string;
    metaDescription: string;
    excerpt: string;
    publishedAt: string;
    updatedAt: string;
    author: string;
    tags: string[];
    readTime: string;
    sections: BlogSection[];
    faqs: FAQ[];
}

export const BLOG_POSTS: BlogPost[] = [
    // ── Post 1: PM Kisan 2026 ──────────────────────────
    {
        slug: 'pm-kisan-2026-eligibility-status-check',
        title: 'PM Kisan 2026: Eligibility, Status Check & 22nd Installment Date',
        metaTitle: 'PM Kisan 2026: Eligibility, Status Check & 22nd Installment Date',
        metaDescription:
            'Complete guide to PM Kisan Samman Nidhi 2026 — check eligibility, beneficiary status, 22nd installment date, and how to apply. Free eligibility check on LaabhMitra.',
        excerpt:
            'Complete guide to PM Kisan Samman Nidhi Yojana 2026 — eligibility criteria, payment status, installment dates, and step-by-step application guide.',
        publishedAt: '2026-02-18',
        updatedAt: '2026-02-18',
        author: 'LaabhMitra Team',
        tags: ['PM Kisan', 'Agriculture', 'Government Schemes'],
        readTime: '8 min read',
        sections: [
            {
                heading: 'What is PM Kisan Samman Nidhi Yojana?',
                content: `<p>PM Kisan Samman Nidhi Yojana (PM-KISAN) is one of India's largest government welfare schemes. Launched in February 2019, it provides <strong>₹6,000 per year</strong> in direct income support to eligible farmer families across India.</p>
<p>The scheme transfers money directly into farmers' bank accounts in <strong>three equal installments of ₹2,000 each</strong>, every four months. As of 2026, the scheme has benefited over 11 crore farmer families nationwide.</p>
<p>The scheme is fully funded by the Government of India, and the entire amount is transferred through Direct Benefit Transfer (DBT) — meaning there are no middlemen or intermediaries.</p>`,
            },
            {
                heading: 'PM Kisan Eligibility Criteria 2026',
                content: `<p>To be eligible for PM Kisan, a farmer family must meet these criteria:</p>
<ul>
<li><strong>Land Ownership:</strong> The applicant must own cultivable land. There is no minimum or maximum landholding requirement for small and marginal farmers.</li>
<li><strong>Citizenship:</strong> Must be an Indian citizen.</li>
<li><strong>Active Farmer Status:</strong> The land must be used for agricultural purposes.</li>
<li><strong>Bank Account:</strong> Must have a valid bank account linked with Aadhaar.</li>
</ul>
<h3>Who is NOT Eligible?</h3>
<ul>
<li>Institutional landholders (companies, trusts, etc.)</li>
<li>Current or former government employees (excluding Multi-Tasking Staff and Group D)</li>
<li>Income tax payers in the last financial year</li>
<li>Professionals like doctors, engineers, lawyers, CAs, and architects with professional bodies</li>
<li>Retired pensioners receiving ₹10,000+ per month</li>
</ul>
<p>Not sure if you qualify? <a href="/eligibility">Check your PM Kisan eligibility instantly on LaabhMitra</a> — it takes just 2 minutes and requires no login.</p>`,
            },
            {
                heading: 'PM Kisan 22nd Installment: Expected Date',
                content: `<p>The PM Kisan installment schedule follows a predictable pattern:</p>
<table>
<thead><tr><th>Installment Period</th><th>Months</th><th>Expected Release</th></tr></thead>
<tbody>
<tr><td>April – July</td><td>1st installment</td><td>April-May 2026</td></tr>
<tr><td>August – November</td><td>2nd installment</td><td>August-September 2026</td></tr>
<tr><td>December – March</td><td>3rd installment</td><td>December 2025 - January 2026</td></tr>
</tbody>
</table>
<p>The <strong>22nd installment</strong> is expected to be released in <strong>April–May 2026</strong>. However, the exact date is announced by the Prime Minister's Office, often during a public event.</p>
<p><strong>Tip:</strong> Make sure your Aadhaar is linked to your bank account and your eKYC is complete to avoid payment delays.</p>`,
            },
            {
                heading: 'How to Check PM Kisan Status Online',
                content: `<p>You can check your PM Kisan beneficiary status and payment history through these methods:</p>
<h3>Method 1: Official PM Kisan Portal</h3>
<ol>
<li>Visit <a href="https://pmkisan.gov.in" target="_blank" rel="noopener noreferrer">pmkisan.gov.in</a></li>
<li>Click on "Beneficiary Status" in the menu</li>
<li>Enter your Aadhaar number or mobile number</li>
<li>Click "Get Data" to see your payment history</li>
</ol>
<h3>Method 2: PM Kisan Mobile App</h3>
<ol>
<li>Download the "PM Kisan" app from Google Play Store</li>
<li>Register with your mobile number</li>
<li>Check your payment status and installment history</li>
</ol>
<h3>Method 3: Through CSC (Common Service Centre)</h3>
<p>Visit your nearest CSC or Gram Panchayat office and ask them to check your status using your Aadhaar number.</p>`,
            },
            {
                heading: 'How to Apply for PM Kisan',
                content: `<p>If you're eligible but not yet registered, follow these steps:</p>
<ol>
<li><strong>Visit</strong> <a href="https://pmkisan.gov.in" target="_blank" rel="noopener noreferrer">pmkisan.gov.in</a> and click "New Farmer Registration"</li>
<li><strong>Enter</strong> your Aadhaar number and captcha</li>
<li><strong>Fill in</strong> your personal details — name, address, state, district</li>
<li><strong>Add</strong> your land details — survey number, area, type of land</li>
<li><strong>Link</strong> your bank account with IFSC code</li>
<li><strong>Submit</strong> — your application will be verified by local authorities</li>
</ol>
<p><strong>Documents Required:</strong></p>
<ul>
<li>Aadhaar Card</li>
<li>Land ownership documents (Khasra/Khatauni)</li>
<li>Bank account passbook</li>
<li>Mobile number linked with Aadhaar</li>
</ul>`,
            },
            {
                heading: 'PM Kisan eKYC: Why It\u2019s Important',
                content: `<p>Starting from 2022, the government mandated <strong>eKYC (Electronic Know Your Customer)</strong> for all PM Kisan beneficiaries. If your eKYC is not complete, your installment payment will be held.</p>
<h3>How to Complete eKYC</h3>
<ol>
<li>Visit <a href="https://pmkisan.gov.in" target="_blank" rel="noopener noreferrer">pmkisan.gov.in</a></li>
<li>Click "eKYC" option on the homepage</li>
<li>Enter your Aadhaar number</li>
<li>Enter the OTP sent to your Aadhaar-linked mobile</li>
<li>Submit — your eKYC is now complete</li>
</ol>
<p>You can also complete eKYC through your nearest CSC center using biometric authentication.</p>`,
            },
        ],
        faqs: [
            {
                question: 'How much money do farmers get in PM Kisan?',
                answer: 'Eligible farmers receive ₹6,000 per year, paid in three installments of ₹2,000 each, directly into their bank accounts.',
            },
            {
                question: 'When is the PM Kisan 22nd installment expected?',
                answer: 'The 22nd installment is expected to be released in April–May 2026. The exact date will be announced by the Prime Minister\'s Office.',
            },
            {
                question: 'Can tenant farmers apply for PM Kisan?',
                answer: 'PM Kisan is primarily for land-owning farmers. Tenant farmers and sharecroppers may not be eligible unless they have land ownership documents.',
            },
            {
                question: 'What happens if eKYC is not done?',
                answer: 'If eKYC is not completed, your PM Kisan installment payment will be withheld until you complete the verification process.',
            },
            {
                question: 'Can I check PM Kisan status with just my mobile number?',
                answer: 'Yes, you can check your PM Kisan beneficiary status using your registered mobile number on the official pmkisan.gov.in portal.',
            },
        ],
    },

    // ── Post 2: Income Tax Calculator ────────────────────
    {
        slug: 'income-tax-calculator-2025-26-old-vs-new-regime',
        title: 'Income Tax Calculator 2025-26: Old vs New Regime — Which Saves More?',
        metaTitle: 'Income Tax Calculator 2025-26: Old vs New Regime Comparison',
        metaDescription:
            'Compare old vs new income tax regime for FY 2025-26. Detailed slab-wise breakdown, exemptions comparison, and free calculator to find which regime saves you more tax.',
        excerpt:
            'Confused between old and new tax regime? Complete comparison with slab rates, exemptions, and a free calculator to find which saves you more for FY 2025-26.',
        publishedAt: '2026-02-18',
        updatedAt: '2026-02-18',
        author: 'LaabhMitra Team',
        tags: ['Income Tax', 'Tax Planning', 'Financial Tools'],
        readTime: '10 min read',
        sections: [
            {
                heading: 'Old vs New Tax Regime: What Changed in 2025-26?',
                content: `<p>The Union Budget 2025-26 made the <strong>new tax regime the default option</strong> for all taxpayers. However, you can still opt for the old regime if it benefits you. Understanding the differences is crucial for tax planning.</p>
<p>The key change is that the <strong>new regime now offers a standard deduction of ₹75,000</strong> (up from ₹50,000) and has revised slabs that benefit middle-income earners. But the old regime still allows deductions under Section 80C, 80D, HRA, and other sections.</p>
<p>Use our <a href="/calculators/income-tax">free Income Tax Calculator</a> to instantly compare both regimes with your actual numbers.</p>`,
            },
            {
                heading: 'Tax Slabs 2025-26: Side-by-Side Comparison',
                content: `<h3>New Tax Regime Slabs (Default)</h3>
<table>
<thead><tr><th>Income Range</th><th>Tax Rate</th></tr></thead>
<tbody>
<tr><td>Up to ₹3,00,000</td><td>Nil</td></tr>
<tr><td>₹3,00,001 – ₹7,00,000</td><td>5%</td></tr>
<tr><td>₹7,00,001 – ₹10,00,000</td><td>10%</td></tr>
<tr><td>₹10,00,001 – ₹12,00,000</td><td>15%</td></tr>
<tr><td>₹12,00,001 – ₹15,00,000</td><td>20%</td></tr>
<tr><td>Above ₹15,00,000</td><td>30%</td></tr>
</tbody>
</table>
<h3>Old Tax Regime Slabs</h3>
<table>
<thead><tr><th>Income Range</th><th>Tax Rate</th></tr></thead>
<tbody>
<tr><td>Up to ₹2,50,000</td><td>Nil</td></tr>
<tr><td>₹2,50,001 – ₹5,00,000</td><td>5%</td></tr>
<tr><td>₹5,00,001 – ₹10,00,000</td><td>20%</td></tr>
<tr><td>Above ₹10,00,000</td><td>30%</td></tr>
</tbody>
</table>
<p><strong>Note:</strong> A 4% Health and Education Cess is applicable on the total tax amount in both regimes.</p>`,
            },
            {
                heading: 'Deductions Available in Old Regime',
                content: `<p>The old regime's biggest advantage is the wide range of deductions:</p>
<ul>
<li><strong>Section 80C (up to ₹1.5 lakh):</strong> EPF, PPF, ELSS mutual funds, NSC, life insurance premium, home loan principal repayment, children's tuition fees</li>
<li><strong>Section 80D (up to ₹75,000):</strong> Health insurance premium — ₹25,000 for self/family + ₹50,000 for senior citizen parents</li>
<li><strong>HRA Exemption:</strong> If you pay rent and receive HRA, a portion is tax-exempt based on a formula</li>
<li><strong>Section 80E:</strong> Interest on education loan — full deduction with no limit</li>
<li><strong>Section 24(b):</strong> Home loan interest up to ₹2 lakh for self-occupied property</li>
<li><strong>Section 80CCD(1B):</strong> NPS contribution up to ₹50,000 over and above 80C</li>
<li><strong>Standard Deduction:</strong> ₹50,000 flat deduction for salaried employees</li>
</ul>
<p>If your total deductions exceed ₹3-4 lakhs, the old regime likely saves you more tax. <a href="/calculators/income-tax">Try our calculator</a> with your actual numbers to be sure.</p>`,
            },
            {
                heading: 'When to Choose New Regime',
                content: `<p>The new regime is better for you if:</p>
<ul>
<li>You don't have significant tax-saving investments (80C, 80D)</li>
<li>You don't pay rent or receive HRA</li>
<li>You don't have a home loan</li>
<li>Your salary is below ₹12 lakh (effectively zero tax under new regime with rebate)</li>
<li>You prefer simplicity over tax planning</li>
</ul>
<p><strong>Big Benefit:</strong> Under the new regime, if your total income is up to ₹12,00,000, you pay <strong>zero tax</strong> thanks to the Section 87A rebate. This makes it very attractive for entry-level and mid-level professionals.</p>`,
            },
            {
                heading: 'When to Choose Old Regime',
                content: `<p>The old regime saves more tax when:</p>
<ul>
<li>You invest ₹1.5 lakh+ in EPF/PPF/ELSS (Section 80C)</li>
<li>You pay health insurance premiums (Section 80D)</li>
<li>You pay significant rent and get HRA from your employer</li>
<li>You have a home loan with interest payments (Section 24)</li>
<li>Your annual deductions exceed ₹3-4 lakhs</li>
</ul>
<p><strong>Example:</strong> A person earning ₹15 lakh with ₹1.5 lakh in 80C, ₹50,000 in 80D, ₹1.8 lakh in HRA, and ₹2 lakh home loan interest saves approximately ₹1.2 lakh more in the old regime.</p>`,
            },
            {
                heading: 'How to Calculate Your Tax — Step by Step',
                content: `<p>Instead of manual calculation, use our <a href="/calculators/income-tax">Income Tax Calculator</a> which does this instantly. Here's what it calculates:</p>
<ol>
<li><strong>Gross Income:</strong> Your total salary or income</li>
<li><strong>Deductions:</strong> 80C, 80D, HRA, home loan interest, NPS</li>
<li><strong>Taxable Income:</strong> Gross income minus all applicable deductions</li>
<li><strong>Tax Amount:</strong> Apply the slab rates to your taxable income</li>
<li><strong>Cess:</strong> Add 4% Health and Education Cess</li>
<li><strong>Final Tax:</strong> Total tax payable after rebate (if applicable)</li>
</ol>
<p>Our calculator shows you the tax under <strong>both regimes side by side</strong>, so you can instantly see which one saves you more.</p>`,
            },
        ],
        faqs: [
            {
                question: 'Which tax regime is better for salary of ₹10 lakh?',
                answer: 'For a ₹10 lakh salary, the new regime is usually better if you don\'t have significant deductions. Under the new regime, with the standard deduction, your effective tax could be as low as ₹30,000. Use our Income Tax Calculator to compare with your exact deductions.',
            },
            {
                question: 'Can I switch between old and new regime every year?',
                answer: 'Yes, salaried employees can switch between old and new regime every financial year. Self-employed individuals can switch once from new to old, but then it becomes permanent.',
            },
            {
                question: 'Is the ₹12 lakh zero tax really true?',
                answer: 'Yes, under the new regime for FY 2025-26, income up to ₹12 lakh is effectively tax-free due to the Section 87A rebate of ₹60,000. The standard deduction of ₹75,000 makes it even more beneficial.',
            },
            {
                question: 'What is Section 87A rebate?',
                answer: 'Section 87A provides a rebate that effectively makes your tax zero if your taxable income is within the specified limit. For FY 2025-26, under the new regime, the rebate is up to ₹60,000 for taxable income up to ₹12 lakh.',
            },
        ],
    },

    // ── Post 3: Ayushman Bharat ──────────────────────────
    {
        slug: 'ayushman-bharat-card-apply-eligibility-hospital-list',
        title: 'Ayushman Bharat Card: How to Apply, Check Eligibility & Hospital List',
        metaTitle: 'Ayushman Bharat Card 2026: Apply Online, Eligibility & Hospital List',
        metaDescription:
            'How to apply for Ayushman Bharat card online, check eligibility, download ABHA card, and find empanelled hospitals. Complete guide with step-by-step instructions.',
        excerpt:
            'Complete guide to Ayushman Bharat PMJAY — free ₹5 lakh health insurance. Learn how to apply, check eligibility, and find hospitals near you.',
        publishedAt: '2026-02-18',
        updatedAt: '2026-02-18',
        author: 'LaabhMitra Team',
        tags: ['Ayushman Bharat', 'Health', 'Government Schemes'],
        readTime: '9 min read',
        sections: [
            {
                heading: 'What is Ayushman Bharat Pradhan Mantri Jan Arogya Yojana?',
                content: `<p>Ayushman Bharat PM-JAY is the world's largest government-funded healthcare program. It provides <strong>free health insurance of up to ₹5 lakh per family per year</strong> for secondary and tertiary hospitalization.</p>
<p>Launched in September 2018, the scheme covers over <strong>12 crore poor and vulnerable families</strong> (approximately 55 crore individuals) across India. The coverage includes:</p>
<ul>
<li>Pre-hospitalization expenses (up to 3 days)</li>
<li>Hospitalization charges — room, nursing, doctor fees, medicines</li>
<li>Post-hospitalization expenses (up to 15 days)</li>
<li>Over 1,900 medical procedures including surgeries, diagnostics, and treatments</li>
</ul>
<p>The best part? <strong>There is no premium to pay</strong> — the entire cost is borne by the government. <a href="/eligibility">Check if you're eligible on LaabhMitra</a>.</p>`,
            },
            {
                heading: 'Ayushman Bharat Eligibility Criteria',
                content: `<p>Eligibility for PM-JAY is based on the <strong>Socio-Economic Caste Census (SECC) 2011</strong> data. The scheme targets:</p>
<h3>In Rural Areas — Families with:</h3>
<ul>
<li>Only one room with kucha walls and kucha roof</li>
<li>No adult member between age 16-59</li>
<li>Female-headed households with no adult male member aged 16-59</li>
<li>Disabled member with no able-bodied adult</li>
<li>SC/ST households</li>
<li>Landless households earning from manual casual labor</li>
</ul>
<h3>In Urban Areas — Occupations including:</h3>
<ul>
<li>Domestic workers, street vendors, ragpickers</li>
<li>Cobblers, hawkers, construction workers</li>
<li>Plumbers, masons, painters, security guards</li>
<li>Transport workers, sweepers, sanitation workers</li>
<li>Home-based artisans and handicraft workers</li>
</ul>
<p><strong>Quick Check:</strong> <a href="/eligibility">Use our free eligibility checker</a> to see if you qualify for Ayushman Bharat and other health schemes.</p>`,
            },
            {
                heading: 'How to Check Your Ayushman Bharat Eligibility',
                content: `<ol>
<li>Visit <a href="https://beneficiary.nha.gov.in" target="_blank" rel="noopener noreferrer">beneficiary.nha.gov.in</a></li>
<li>Enter your mobile number — you'll receive an OTP</li>
<li>Select your state</li>
<li>Search by name, Aadhaar, mobile, or ration card number</li>
<li>If eligible, your name and family details will appear</li>
</ol>
<p>You can also check eligibility by calling the <strong>Ayushman Bharat helpline: 14555</strong> (toll-free) or visiting your nearest CSC center.</p>`,
            },
            {
                heading: 'How to Apply for Ayushman Bharat Card',
                content: `<h3>Method 1: Online via ABHA App</h3>
<ol>
<li>Download the "Ayushman Bharat" (ABHA) app from Google Play Store</li>
<li>Register using your mobile number and Aadhaar</li>
<li>Complete eKYC with OTP verification</li>
<li>Your digital Ayushman card will be generated</li>
</ol>
<h3>Method 2: Visit a CSC/Empanelled Hospital</h3>
<ol>
<li>Visit your nearest Common Service Centre (CSC) or an empanelled hospital</li>
<li>Carry Aadhaar card and ration card</li>
<li>The operator will verify your details in the SECC database</li>
<li>Biometric authentication will be done</li>
<li>Your Ayushman Bharat Golden Card will be printed on the spot</li>
</ol>
<h3>Method 3: PMJAY Helpdesk</h3>
<p>Call <strong>14555</strong> to find the nearest enrollment center and get assistance with the application process.</p>`,
            },
            {
                heading: 'How to Find Empanelled Hospitals',
                content: `<p>Only hospitals empanelled under PM-JAY provide cashless treatment. Here's how to find them:</p>
<ol>
<li>Visit <a href="https://hospitals.pmjay.gov.in" target="_blank" rel="noopener noreferrer">hospitals.pmjay.gov.in</a></li>
<li>Select your <strong>state and district</strong></li>
<li>Choose hospital type — public or private</li>
<li>View the list of empanelled hospitals with their specialties</li>
</ol>
<p>As of 2026, over <strong>30,000 hospitals</strong> across India are empanelled under PM-JAY, including major private hospital chains.</p>`,
            },
            {
                heading: 'Treatment and Procedures Covered',
                content: `<p>The scheme covers a wide range of treatments:</p>
<ul>
<li><strong>Cardiology:</strong> Bypass surgery, angioplasty, pacemaker implantation</li>
<li><strong>Orthopedics:</strong> Knee replacement, hip replacement, spine surgery</li>
<li><strong>Oncology:</strong> Chemotherapy, radiation therapy, cancer surgeries</li>
<li><strong>Neurosurgery:</strong> Brain tumor surgery, spine procedures</li>
<li><strong>General Surgery:</strong> Appendectomy, hernia repair, gallbladder removal</li>
<li><strong>Eye Care:</strong> Cataract surgery, corneal transplant</li>
<li><strong>Maternity:</strong> Normal and C-section delivery, newborn care</li>
</ul>
<p>Pre-existing diseases are covered from day one — there is <strong>no waiting period</strong>.</p>`,
            },
        ],
        faqs: [
            {
                question: 'Is Ayushman Bharat card free?',
                answer: 'Yes, the Ayushman Bharat card is completely free. There is no premium or enrollment fee. You can get it made at CSC centers or empanelled hospitals.',
            },
            {
                question: 'Can I use Ayushman Bharat in private hospitals?',
                answer: 'Yes, you can use your Ayushman Bharat card at any private hospital that is empanelled under PM-JAY. Over 13,000 private hospitals across India are empanelled.',
            },
            {
                question: 'What is the maximum coverage under Ayushman Bharat?',
                answer: 'Ayushman Bharat provides coverage of up to ₹5 lakh per family per year for hospitalization. This is a floating cover shared among all family members.',
            },
            {
                question: 'Can I check Ayushman Bharat eligibility by Aadhaar number?',
                answer: 'Yes, you can check your eligibility by entering your Aadhaar number on the official PM-JAY beneficiary portal at beneficiary.nha.gov.in or by calling 14555.',
            },
        ],
    },

    // ── Post 4: Women Schemes ────────────────────────────
    {
        slug: 'top-5-government-schemes-for-women-2026',
        title: 'Top 5 Government Schemes for Women in 2026',
        metaTitle: 'Top 5 Government Schemes for Women in India 2026 — Benefits & Eligibility',
        metaDescription:
            'Best government schemes for women in 2026 — Sukanya Samriddhi, Ujjwala, Matru Vandana, Lakhpati Didi & PM Awas. Benefits, eligibility & how to apply.',
        excerpt:
            'Discover the top 5 government schemes that empower Indian women in 2026 — from savings accounts for daughters to free LPG connections and housing.',
        publishedAt: '2026-02-18',
        updatedAt: '2026-02-18',
        author: 'LaabhMitra Team',
        tags: ['Women Schemes', 'Government Schemes', 'Financial Empowerment'],
        readTime: '9 min read',
        sections: [
            {
                heading: 'Why Government Schemes for Women Matter',
                content: `<p>The Indian government has launched numerous schemes specifically designed to empower women — from financial independence to health, housing, and education. These schemes collectively benefit <strong>crores of women</strong> across the country.</p>
<p>Yet many eligible women don't know about these benefits or how to apply. Here are the <strong>top 5 most impactful schemes</strong> every Indian woman (or family with daughters) should know about.</p>
<p><a href="/eligibility">Check your eligibility for all women's schemes on LaabhMitra</a> — free, no login required.</p>`,
            },
            {
                heading: '1. Sukanya Samriddhi Yojana (SSY) — For Your Daughter\u2019s Future',
                content: `<p><strong>₹74 lakh+ on maturity</strong> — that's what you can accumulate for your daughter with this scheme.</p>
<h3>Key Benefits</h3>
<ul>
<li><strong>Interest Rate:</strong> 8.2% per annum (highest among all government small savings schemes)</li>
<li><strong>Investment:</strong> Minimum ₹250/year, Maximum ₹1.5 lakh/year</li>
<li><strong>Maturity:</strong> 21 years from account opening, or on daughter's marriage after age 18</li>
<li><strong>Tax Benefits:</strong> Triple tax-exempt — investment (80C), interest, and maturity amount are all tax-free</li>
</ul>
<h3>Eligibility</h3>
<ul>
<li>Girl child must be below 10 years of age</li>
<li>Maximum 2 accounts (one per daughter, max 2 daughters)</li>
<li>Account can be opened at any post office or authorized bank</li>
</ul>
<h3>How to Open</h3>
<ol>
<li>Visit your nearest post office or bank (SBI, PNB, BOB, etc.)</li>
<li>Fill the account opening form</li>
<li>Submit birth certificate, parent's Aadhaar and PAN</li>
<li>Make the initial deposit (minimum ₹250)</li>
</ol>
<p>Want to see how much your investment will grow? <a href="/calculators/ppf">Use our PPF/savings calculator</a> to estimate returns.</p>`,
            },
            {
                heading: '2. Pradhan Mantri Ujjwala Yojana — Free LPG Connection',
                content: `<p>Ujjwala Yojana provides <strong>free LPG gas connections</strong> to women from Below Poverty Line (BPL) families, replacing unhealthy cooking fuels like wood, coal, and cow dung.</p>
<h3>Key Benefits</h3>
<ul>
<li>Free LPG connection and security deposit waiver</li>
<li>₹1,600 subsidy for the first gas refill</li>
<li>Option to get stove and first refill on loan (EMI deducted from subsidy)</li>
</ul>
<h3>Eligibility</h3>
<ul>
<li>Women from BPL families</li>
<li>Age 18 years or above</li>
<li>No existing LPG connection in the household</li>
<li>SECC-2011 beneficiary, PM Awas Yojana beneficiary, or SC/ST household</li>
</ul>
<h3>How to Apply</h3>
<p>Visit your nearest LPG distributor with your Aadhaar card, BPL card, passport-size photo, and bank account details.</p>`,
            },
            {
                heading: '3. Pradhan Mantri Matru Vandana Yojana (PMMVY) — Maternity Benefit',
                content: `<p>This scheme provides <strong>₹11,000 cash benefit</strong> to pregnant women and new mothers for their first child.</p>
<h3>Key Benefits</h3>
<ul>
<li>₹3,000 on registration of pregnancy</li>
<li>₹3,000 after at least one antenatal check-up (after 6 months)</li>
<li>₹5,000 after child birth registration and first cycle of vaccination</li>
</ul>
<h3>Eligibility</h3>
<ul>
<li>First-time pregnant women and lactating mothers</li>
<li>Must register at an Anganwadi Centre or health facility</li>
<li>Delivery must be in a government or accredited private hospital</li>
</ul>
<h3>How to Apply</h3>
<ol>
<li>Visit your nearest Anganwadi Centre or health facility</li>
<li>Fill the registration form (Form A)</li>
<li>Submit Aadhaar, bank passbook, and MCH card</li>
<li>Money is transferred directly to your bank account in installments</li>
</ol>`,
            },
            {
                heading: '4. Lakhpati Didi Scheme — Making Women Entrepreneurs',
                content: `<p>Under the Lakhpati Didi initiative, the government aims to help <strong>3 crore women in Self-Help Groups (SHGs)</strong> earn ₹1 lakh or more annually through skill training and livelihood support.</p>
<h3>Key Benefits</h3>
<ul>
<li>Skill training in areas like plumbing, LED bulb making, drone operation, and more</li>
<li>Access to micro-credit through SHGs</li>
<li>Marketing support and linkage with markets</li>
<li>Financial literacy and digital payment training</li>
</ul>
<h3>Eligibility</h3>
<ul>
<li>Women who are members of Self-Help Groups (SHGs)</li>
<li>Connected through DAY-NRLM (National Rural Livelihoods Mission)</li>
</ul>
<h3>How to Join</h3>
<p>Join or form a Self-Help Group through your local Block Development Office or NRLM facilitator. The training and support come through the SHG network.</p>`,
            },
            {
                heading: '5. PM Awas Yojana (Gramin) — Housing for Women',
                content: `<p>Under PM Awas Yojana, special priority is given to <strong>women-headed households</strong>. The house is registered in the woman's name or jointly with a male member.</p>
<h3>Key Benefits</h3>
<ul>
<li><strong>₹1.20 lakh</strong> financial assistance in plain areas</li>
<li><strong>₹1.30 lakh</strong> in hilly/difficult/IAP areas</li>
<li>Additional support for toilet construction (₹12,000 from SBM)</li>
<li>90 days of unskilled labor wages under MGNREGA</li>
</ul>
<h3>Eligibility</h3>
<ul>
<li>Houseless families or living in kutcha/dilapidated houses</li>
<li>Prioritized: Women-headed households, SC/ST, minorities, disabled</li>
<li>Family should not own a pucca house anywhere in India</li>
</ul>
<p><a href="/eligibility">Check if you qualify for PM Awas Yojana</a> — use our free eligibility checker.</p>`,
            },
        ],
        faqs: [
            {
                question: 'Which government scheme gives the most money to women?',
                answer: 'PM Awas Yojana provides the highest direct financial benefit — up to ₹1.30 lakh for housing construction. Sukanya Samriddhi Yojana can grow to ₹74+ lakh over 21 years with regular investment.',
            },
            {
                question: 'Can working women apply for these schemes?',
                answer: 'Most of these schemes target economically weaker sections. Working women may be eligible for Sukanya Samriddhi (for daughters) and some state-specific schemes. Check your eligibility using our free tool.',
            },
            {
                question: 'How do I find all government schemes I am eligible for?',
                answer: 'Use LaabhMitra\'s free eligibility checker. Enter your basic details (age, income, state, gender) and instantly see all schemes you qualify for — no login or phone number needed.',
            },
            {
                question: 'Are these schemes available in all states?',
                answer: 'The 5 schemes listed here are central government schemes available across India. Many states also offer additional women-specific schemes on top of these.',
            },
        ],
    },

    // ── Post 5: FD Rates Comparison ─────────────────────
    {
        slug: 'fd-interest-rates-comparison-2026-sbi-hdfc-post-office',
        title: 'FD Interest Rates Comparison 2026: SBI vs HDFC vs Post Office',
        metaTitle: 'FD Interest Rates 2026: SBI vs HDFC vs Post Office — Compare & Earn More',
        metaDescription:
            'Compare fixed deposit interest rates for 2026 across SBI, HDFC, ICICI, PNB, and Post Office. Find the best FD rates for your money. Updated February 2026.',
        excerpt:
            'Compare fixed deposit interest rates across major banks and Post Office for 2026. Find who offers the best returns for your money — with detailed rate tables.',
        publishedAt: '2026-02-18',
        updatedAt: '2026-02-18',
        author: 'LaabhMitra Team',
        tags: ['Fixed Deposit', 'Banking', 'Financial Planning'],
        readTime: '8 min read',
        sections: [
            {
                heading: 'Why Compare FD Rates Before Investing?',
                content: `<p>Fixed Deposits remain India's most popular savings instrument — trusted by crores of Indians for safe, guaranteed returns. But here's what most people don't realize: <strong>FD rates vary significantly between banks</strong>, and choosing the wrong bank can cost you lakhs in lost interest over time.</p>
<p>For example, on a ₹10 lakh deposit for 5 years, the difference between a 7% and 7.5% rate is over <strong>₹30,000 in additional interest</strong>. That's why comparing rates matters.</p>
<p>Use our <a href="/calculators/fd-compare">FD Rate Comparison tool</a> to compare rates across all major banks instantly.</p>`,
            },
            {
                heading: 'FD Interest Rates Comparison — February 2026',
                content: `<p>Here are the latest FD rates from major banks for general citizens (below 60 years):</p>
<table>
<thead><tr><th>Bank</th><th>1 Year</th><th>2 Years</th><th>3 Years</th><th>5 Years</th></tr></thead>
<tbody>
<tr><td><strong>SBI</strong></td><td>6.80%</td><td>7.00%</td><td>6.75%</td><td>6.50%</td></tr>
<tr><td><strong>HDFC Bank</strong></td><td>6.60%</td><td>7.00%</td><td>7.00%</td><td>7.00%</td></tr>
<tr><td><strong>ICICI Bank</strong></td><td>6.70%</td><td>7.00%</td><td>7.00%</td><td>6.90%</td></tr>
<tr><td><strong>PNB</strong></td><td>6.80%</td><td>7.00%</td><td>6.50%</td><td>6.50%</td></tr>
<tr><td><strong>Post Office TD</strong></td><td>6.90%</td><td>7.00%</td><td>7.10%</td><td>7.50%</td></tr>
<tr><td><strong>Axis Bank</strong></td><td>6.70%</td><td>7.10%</td><td>7.10%</td><td>7.00%</td></tr>
</tbody>
</table>
<p><strong>Note:</strong> Rates are indicative and subject to change. Senior citizens typically get <strong>0.25–0.50% higher rates</strong>. Always check the latest rates on the bank's official website before investing.</p>`,
            },
            {
                heading: 'Senior Citizen FD Rates — Extra Benefits',
                content: `<p>If you're 60 years or older, you get higher FD rates across all banks:</p>
<table>
<thead><tr><th>Bank</th><th>Extra Rate (Senior)</th><th>Best Tenure Rate</th></tr></thead>
<tbody>
<tr><td>SBI</td><td>+0.50%</td><td>7.50% (2-3 years)</td></tr>
<tr><td>HDFC Bank</td><td>+0.50%</td><td>7.75% (Special tenures)</td></tr>
<tr><td>ICICI Bank</td><td>+0.50%</td><td>7.50% (Special tenures)</td></tr>
<tr><td>Post Office</td><td>+0.40%</td><td>7.90% (5 years)</td></tr>
</tbody>
</table>
<p><strong>Tip for seniors:</strong> Post Office 5-year FD often gives the best rates for senior citizens, plus it qualifies for Section 80C tax deduction.</p>
<p>Compare rates based on your deposit amount using our <a href="/calculators/fd-compare">FD Comparison Calculator</a>.</p>`,
            },
            {
                heading: 'Post Office FD vs Bank FD: Which is Better?',
                content: `<p>Here's a straightforward comparison:</p>
<h3>Post Office FD Advantages</h3>
<ul>
<li>Backed by Government of India — sovereign guarantee</li>
<li>Often higher interest rates, especially for 5-year tenure</li>
<li>5-year TD qualifies for Section 80C tax deduction</li>
<li>Available in every pincode through India Post</li>
</ul>
<h3>Bank FD Advantages</h3>
<ul>
<li>More flexible tenure options (7 days to 10 years)</li>
<li>Online management and premature withdrawal</li>
<li>Higher limits — banks accept larger deposits</li>
<li>Auto-renewal and sweep-in facilities</li>
<li>DICGC insurance up to ₹5 lakh per depositor per bank</li>
</ul>
<p><strong>Verdict:</strong> For long-term deposits (5 years), Post Office often wins on rates. For flexibility and convenience, bank FDs are better.</p>`,
            },
            {
                heading: 'Tax-Saving FD: What You Should Know',
                content: `<p>Tax-saving FDs are 5-year fixed deposits that qualify for <strong>Section 80C deduction up to ₹1.5 lakh</strong>. Key points:</p>
<ul>
<li>Minimum lock-in period: 5 years (no premature withdrawal allowed)</li>
<li>Maximum investment for tax benefit: ₹1.5 lakh per year</li>
<li>Available at all scheduled banks and Post Office</li>
<li><strong>Interest is taxable</strong> — TDS applies if interest exceeds ₹40,000 per year (₹50,000 for seniors)</li>
</ul>
<p><strong>Pro tip:</strong> If you've exhausted your 80C limit with EPF and insurance, you don't need a tax-saving FD. Instead, go for a regular FD with the best rate for your preferred tenure.</p>
<p>Calculate how much tax you save with our <a href="/calculators/income-tax">Income Tax Calculator</a>.</p>`,
            },
            {
                heading: 'Tips to Maximize Your FD Returns',
                content: `<ul>
<li><strong>Ladder your FDs:</strong> Instead of one ₹10 lakh FD, create 5 FDs of ₹2 lakh each with different maturities (1, 2, 3, 4, 5 years). This gives you liquidity while earning higher rates on longer tenures.</li>
<li><strong>Choose cumulative option:</strong> If you don't need regular income, choose cumulative FD where interest is compounded and paid at maturity — this earns you 10-15% more than monthly/quarterly interest payout.</li>
<li><strong>Compare before investing:</strong> Small differences in rates add up. A 0.5% difference on ₹10 lakh over 5 years = ₹30,000+ extra.</li>
<li><strong>Consider small finance banks:</strong> Banks like AU, Ujjivan, and Jana often offer 0.5-1% higher rates than big banks, with the same DICGC insurance protection.</li>
</ul>`,
            },
        ],
        faqs: [
            {
                question: 'Which bank gives the highest FD interest rate in 2026?',
                answer: 'For general citizens, Post Office tends to offer the highest rates for 5-year FDs (7.50%). Among banks, small finance banks like AU, Ujjivan, and Jana Small Finance Bank often offer rates above 8%. Use our FD comparison tool to find the best current rates.',
            },
            {
                question: 'Is Post Office FD safer than bank FD?',
                answer: 'Post Office FDs are backed by the Government of India (sovereign guarantee), making them among the safest investments. Bank FDs are insured by DICGC up to ₹5 lakh per depositor per bank.',
            },
            {
                question: 'Is FD interest taxable?',
                answer: 'Yes, FD interest is fully taxable as "Income from Other Sources" and is added to your total income. TDS of 10% is deducted if annual interest exceeds ₹40,000 (₹50,000 for senior citizens).',
            },
            {
                question: 'Can I break an FD before maturity?',
                answer: 'Regular bank FDs can be broken prematurely, but the bank charges a penalty of 0.5-1% on the applicable rate. Tax-saving 5-year FDs cannot be broken before maturity.',
            },
        ],
    },
];

export function getBlogPost(slug: string): BlogPost | undefined {
    return BLOG_POSTS.find((post) => post.slug === slug);
}

export function getAllBlogSlugs(): string[] {
    return BLOG_POSTS.map((post) => post.slug);
}
