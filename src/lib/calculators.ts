/**
 * Client-side calculator functions for instant slider feedback.
 * These mirror the backend calculations for offline/instant use.
 */

// ── Income Tax ───────────────────────────────────────
const NEW_REGIME_SLABS = [
    [0, 400000, 0],
    [400000, 800000, 5],
    [800000, 1200000, 10],
    [1200000, 1600000, 15],
    [1600000, 2000000, 20],
    [2000000, 2400000, 25],
    [2400000, Infinity, 30],
] as const;

const OLD_REGIME_SLABS = [
    [0, 250000, 0],
    [250000, 500000, 5],
    [500000, 1000000, 20],
    [1000000, Infinity, 30],
] as const;

function computeTax(income: number, slabs: readonly (readonly [number, number, number])[]): number {
    let tax = 0;
    for (const [min, max, rate] of slabs) {
        if (income <= min) break;
        const upper = Math.min(income, max);
        tax += (upper - min) * rate / 100;
    }
    return Math.round(tax);
}

export function calculateIncomeTax(income: number, deductions80c = 0, hra = 0, otherDeductions = 0) {
    // New regime
    const newTaxable = Math.max(0, income - 75000);
    let newTax = computeTax(newTaxable, NEW_REGIME_SLABS);
    if (newTaxable <= 1200000) newTax = Math.max(0, newTax - Math.min(newTax, 60000));
    const newCess = Math.round(newTax * 0.04);
    const newTotal = newTax + newCess;

    // Old regime
    const oldTaxable = Math.max(0, income - deductions80c - hra - otherDeductions - 50000);
    let oldTax = computeTax(oldTaxable, OLD_REGIME_SLABS);
    if (oldTaxable <= 500000) oldTax = Math.max(0, oldTax - Math.min(oldTax, 12500));
    const oldCess = Math.round(oldTax * 0.04);
    const oldTotal = oldTax + oldCess;

    return {
        newRegime: { taxable: newTaxable, tax: newTax, cess: newCess, total: newTotal },
        oldRegime: { taxable: oldTaxable, tax: oldTax, cess: oldCess, total: oldTotal },
        recommendation: newTotal <= oldTotal ? 'new' : 'old',
        savings: Math.abs(newTotal - oldTotal),
    };
}

// ── EMI Calculator ───────────────────────────────────
export function calculateEMI(principal: number, annualRate: number, tenureYears: number) {
    const r = annualRate / 12 / 100;
    const n = tenureYears * 12;
    const emi = r === 0 ? principal / n : principal * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);

    return {
        emi: Math.round(emi),
        totalPayment: Math.round(emi * n),
        totalInterest: Math.round(emi * n - principal),
        tenureMonths: n,
    };
}

// ── SIP Calculator ───────────────────────────────────
export function calculateSIP(monthlyAmount: number, annualReturn: number, years: number) {
    const r = annualReturn / 12 / 100;
    const n = years * 12;
    const fv = r === 0
        ? monthlyAmount * n
        : monthlyAmount * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);

    const totalInvested = monthlyAmount * n;
    return {
        futureValue: Math.round(fv),
        totalInvested: Math.round(totalInvested),
        wealthGained: Math.round(fv - totalInvested),
    };
}

// ── GST Calculator ───────────────────────────────────
export function calculateGST(amount: number, rate: number, type: 'exclusive' | 'inclusive' = 'exclusive') {
    if (type === 'inclusive') {
        const gst = Math.round((amount - amount * 100 / (100 + rate)) * 100) / 100;
        return {
            original: Math.round((amount - gst) * 100) / 100,
            gst,
            cgst: Math.round(gst / 2 * 100) / 100,
            sgst: Math.round(gst / 2 * 100) / 100,
            total: amount,
        };
    }
    const gst = Math.round(amount * rate / 100 * 100) / 100;
    return {
        original: amount,
        gst,
        cgst: Math.round(gst / 2 * 100) / 100,
        sgst: Math.round(gst / 2 * 100) / 100,
        total: Math.round((amount + gst) * 100) / 100,
    };
}

// ── Home Loan EMI Calculator (with Amortization) ─────
export interface AmortizationRow {
    year: number;
    openingBalance: number;
    emiPaid: number;
    interestPaid: number;
    principalPaid: number;
    closingBalance: number;
}

export function calculateHomeLoanEMI(principal: number, annualRate: number, tenureYears: number) {
    const r = annualRate / 12 / 100;
    const n = tenureYears * 12;
    if (principal <= 0 || n <= 0) return { emi: 0, totalPayment: 0, totalInterest: 0, tenureMonths: 0, schedule: [] };

    const emi = r === 0 ? principal / n : principal * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);

    const schedule: AmortizationRow[] = [];
    let balance = principal;

    for (let yr = 1; yr <= tenureYears; yr++) {
        const monthsThisYear = yr === tenureYears ? n - (yr - 1) * 12 : 12;
        const openingBalance = balance;
        let yearInterest = 0;
        let yearPrincipal = 0;

        for (let m = 0; m < monthsThisYear; m++) {
            const intPart = balance * r;
            const princPart = emi - intPart;
            yearInterest += intPart;
            yearPrincipal += princPart;
            balance = Math.max(0, balance - princPart);
        }

        schedule.push({
            year: yr,
            openingBalance: Math.round(openingBalance),
            emiPaid: Math.round(emi * monthsThisYear),
            interestPaid: Math.round(yearInterest),
            principalPaid: Math.round(yearPrincipal),
            closingBalance: Math.round(balance),
        });
    }

    return {
        emi: Math.round(emi),
        totalPayment: Math.round(emi * n),
        totalInterest: Math.round(emi * n - principal),
        tenureMonths: n,
        schedule,
    };
}

// ── HRA Calculator ───────────────────────────────────
export function calculateHRA(
    basicSalary: number,
    da: number,
    hraReceived: number,
    rentPaid: number,
    isMetro: boolean
) {
    const annualBasicDA = (basicSalary + da) * 12;
    const annualHRA = hraReceived * 12;
    const annualRent = rentPaid * 12;

    // Three conditions of HRA exemption (Section 10(13A))
    const condition1 = annualHRA; // Actual HRA received
    const condition2 = Math.max(0, annualRent - 0.1 * annualBasicDA); // Rent paid - 10% of basic+DA
    const condition3 = (isMetro ? 0.5 : 0.4) * annualBasicDA; // 50% metro / 40% non-metro

    const annualExempt = Math.min(condition1, condition2, condition3);
    const annualTaxable = Math.max(0, annualHRA - annualExempt);

    return {
        condition1: Math.round(condition1),
        condition2: Math.round(condition2),
        condition3: Math.round(condition3),
        exempt: Math.round(annualExempt),
        taxable: Math.round(annualTaxable),
        monthlyExempt: Math.round(annualExempt / 12),
        monthlyTaxable: Math.round(annualTaxable / 12),
    };
}

// ── Gratuity Calculator ──────────────────────────────
export function calculateGratuity(
    lastBasicDA: number,
    yearsOfService: number,
    isGovernment: boolean = false
) {
    if (yearsOfService < 5 || lastBasicDA <= 0) {
        return { gratuity: 0, taxFree: 0, taxable: 0, eligible: yearsOfService >= 5 };
    }

    let gratuity: number;
    if (isGovernment) {
        // Government: (Basic+DA) × 15/26 × years, no cap
        gratuity = lastBasicDA * 15 / 26 * yearsOfService;
    } else {
        // Private (Payment of Gratuity Act): (Basic+DA) × 15/26 × years
        gratuity = lastBasicDA * 15 / 26 * yearsOfService;
    }

    gratuity = Math.round(gratuity);
    const TAX_FREE_LIMIT = isGovernment ? 2000000 : 2500000; // ₹20L govt, ₹25L private
    const taxFree = Math.min(gratuity, TAX_FREE_LIMIT);
    const taxable = Math.max(0, gratuity - TAX_FREE_LIMIT);

    return { gratuity, taxFree, taxable, eligible: true };
}

// ── NPS Calculator ───────────────────────────────────
export function calculateNPS(
    monthlyContribution: number,
    currentAge: number,
    retirementAge: number,
    expectedReturn: number,
    annuityPercent: number = 40
) {
    const years = retirementAge - currentAge;
    if (years <= 0 || monthlyContribution <= 0) {
        return { totalCorpus: 0, totalInvested: 0, wealthGained: 0, lumpSum: 0, annuityCorpus: 0, monthlyPension: 0 };
    }

    const r = expectedReturn / 12 / 100;
    const n = years * 12;
    const totalInvested = monthlyContribution * n;

    const corpus = r === 0
        ? totalInvested
        : monthlyContribution * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);

    const annuityFraction = annuityPercent / 100;
    const lumpSum = Math.round(corpus * (1 - annuityFraction));
    const annuityCorpus = Math.round(corpus * annuityFraction);
    // Approx 6% annuity rate for pension calculation
    const monthlyPension = Math.round(annuityCorpus * 0.06 / 12);

    return {
        totalCorpus: Math.round(corpus),
        totalInvested: Math.round(totalInvested),
        wealthGained: Math.round(corpus - totalInvested),
        lumpSum,
        annuityCorpus,
        monthlyPension,
    };
}

// ── Salary (In-Hand / CTC Breakdown) ─────────────────
export interface SalaryComponent {
    label: string;
    monthly: number;
    annual: number;
    type: 'earning' | 'deduction';
}

export function calculateSalary(
    ctc: number,
    includePF: boolean = true,
    isMetro: boolean = true
) {
    if (ctc <= 0) return { components: [], monthlyInHand: 0, annualInHand: 0 };

    // Standard CTC breakdown
    const basic = Math.round(ctc * 0.40);
    const hra = Math.round(basic * 0.50);
    const specialAllowance = ctc - basic - hra - (includePF ? Math.round(basic * 0.12) : 0);

    // Deductions
    const epfEmployee = includePF ? Math.round(basic * 0.12) : 0;
    const epfEmployer = includePF ? Math.round(basic * 0.12) : 0;
    const professionalTax = 2400; // Standard ₹200/month

    // Rough income tax estimate (new regime)
    const taxableIncome = Math.max(0, ctc - 75000);
    let tax = computeTax(taxableIncome, NEW_REGIME_SLABS);
    if (taxableIncome <= 1200000) tax = Math.max(0, tax - Math.min(tax, 60000));
    const cess = Math.round(tax * 0.04);
    const totalTax = tax + cess;

    const totalDeductions = epfEmployee + professionalTax + totalTax;
    const annualInHand = ctc - totalDeductions - epfEmployer;
    const monthlyInHand = Math.round(annualInHand / 12);

    const components: SalaryComponent[] = [
        { label: 'Basic Salary', monthly: Math.round(basic / 12), annual: basic, type: 'earning' },
        { label: 'HRA', monthly: Math.round(hra / 12), annual: hra, type: 'earning' },
        { label: 'Special Allowance', monthly: Math.round(Math.max(0, specialAllowance) / 12), annual: Math.max(0, specialAllowance), type: 'earning' },
        { label: 'EPF (Employee)', monthly: Math.round(epfEmployee / 12), annual: epfEmployee, type: 'deduction' },
        { label: 'EPF (Employer)', monthly: Math.round(epfEmployer / 12), annual: epfEmployer, type: 'deduction' },
        { label: 'Professional Tax', monthly: 200, annual: professionalTax, type: 'deduction' },
        { label: 'Income Tax (Est.)', monthly: Math.round(totalTax / 12), annual: totalTax, type: 'deduction' },
    ];

    return { components, monthlyInHand, annualInHand: Math.round(annualInHand) };
}

// ── RD Calculator (Recurring Deposit) ────────────────
export function calculateRD(monthlyDeposit: number, annualRate: number, years: number) {
    if (monthlyDeposit <= 0 || years <= 0) return { maturityAmount: 0, totalDeposited: 0, interestEarned: 0 };

    const n = years * 12; // total months
    const r = annualRate / 400; // quarterly rate
    const totalDeposited = monthlyDeposit * n;

    // RD uses quarterly compounding — each installment compounds for remaining quarters
    let maturity = 0;
    for (let i = 1; i <= n; i++) {
        const remainingMonths = n - i + 1;
        const quarters = remainingMonths / 3;
        maturity += monthlyDeposit * Math.pow(1 + r, quarters);
    }

    return {
        maturityAmount: Math.round(maturity),
        totalDeposited: Math.round(totalDeposited),
        interestEarned: Math.round(maturity - totalDeposited),
    };
}

// ── Home Loan Eligibility ────────────────────────────
export function calculateHomeLoanEligibility(
    monthlyIncome: number,
    existingEMIs: number,
    tenureYears: number,
    interestRate: number,
) {
    const maxFOIR = 0.5; // Banks allow max 50% of income towards EMIs
    const availableForEMI = Math.max(0, monthlyIncome * maxFOIR - existingEMIs);
    const monthlyRate = interestRate / 100 / 12;
    const months = tenureYears * 12;

    // P = EMI × [(1+r)^n - 1] / [r × (1+r)^n]
    let maxLoan = 0;
    if (monthlyRate > 0 && months > 0) {
        const factor = Math.pow(1 + monthlyRate, months);
        maxLoan = availableForEMI * (factor - 1) / (monthlyRate * factor);
    } else if (months > 0) {
        maxLoan = availableForEMI * months;
    }

    const totalPayable = availableForEMI * months;
    const totalInterest = totalPayable - maxLoan;

    return {
        maxLoan: Math.round(maxLoan),
        emi: Math.round(availableForEMI),
        totalInterest: Math.round(Math.max(0, totalInterest)),
        totalPayable: Math.round(totalPayable),
        foirUsed: monthlyIncome > 0 ? Math.round(((existingEMIs + availableForEMI) / monthlyIncome) * 100) : 0,
    };
}

// ── Car Loan EMI ─────────────────────────────────────
export function calculateCarLoanEMI(
    carPrice: number,
    downPayment: number,
    interestRate: number,
    tenureYears: number,
) {
    const loanAmount = Math.max(0, carPrice - downPayment);
    const monthlyRate = interestRate / 100 / 12;
    const months = tenureYears * 12;

    let emi = 0;
    if (monthlyRate > 0 && months > 0) {
        const factor = Math.pow(1 + monthlyRate, months);
        emi = loanAmount * monthlyRate * factor / (factor - 1);
    } else if (months > 0) {
        emi = loanAmount / months;
    }

    const totalPayable = emi * months;
    const totalInterest = totalPayable - loanAmount;

    return {
        loanAmount: Math.round(loanAmount),
        emi: Math.round(emi),
        totalInterest: Math.round(Math.max(0, totalInterest)),
        totalPayable: Math.round(totalPayable),
        downPaymentPercent: carPrice > 0 ? Math.round((downPayment / carPrice) * 100) : 0,
    };
}

// ── Sukanya Samriddhi (SSY) ──────────────────────────
export function calculateSSY(annualDeposit: number, childAge: number) {
    const rate = 8.2; // Current SSY rate (Q1 2026)
    const depositYears = 15; // Deposit allowed for 15 years
    const maturityYearFromOpen = 21; // Matures when account completes 21 years
    const totalYears = Math.min(21, 21 - childAge + 1); // approx years to maturity

    let balance = 0;
    const yearlyBreakdown: { year: number; deposit: number; interest: number; balance: number }[] = [];

    for (let yr = 1; yr <= totalYears; yr++) {
        const deposit = yr <= depositYears ? annualDeposit : 0;
        balance += deposit;
        const interest = balance * rate / 100;
        balance += interest;
        yearlyBreakdown.push({
            year: yr,
            deposit,
            interest: Math.round(interest),
            balance: Math.round(balance),
        });
    }

    const totalDeposited = annualDeposit * Math.min(depositYears, totalYears);
    return {
        maturityAmount: Math.round(balance),
        totalDeposited: Math.round(totalDeposited),
        interestEarned: Math.round(balance - totalDeposited),
        maturityAge: 21,
        yearlyBreakdown,
    };
}

// ── EPF Calculator ───────────────────────────────────
export function calculateEPF(
    basicSalary: number,
    employeePFPercent: number,
    employerPFPercent: number,
    annualIncrement: number,
    yearsToRetirement: number,
    currentBalance: number,
) {
    const epfInterestRate = 8.25; // FY 2025-26 rate
    let balance = currentBalance;
    let totalEmployeeContrib = 0;
    let totalEmployerContrib = 0;
    let currentBasic = basicSalary;

    const yearlyBreakdown: {
        year: number; basic: number; empContrib: number;
        erContrib: number; interest: number; balance: number;
    }[] = [];

    for (let yr = 1; yr <= yearsToRetirement; yr++) {
        const empContrib = currentBasic * 12 * employeePFPercent / 100;
        const erContrib = currentBasic * 12 * employerPFPercent / 100;
        totalEmployeeContrib += empContrib;
        totalEmployerContrib += erContrib;

        balance += empContrib + erContrib;
        const interest = balance * epfInterestRate / 100;
        balance += interest;

        yearlyBreakdown.push({
            year: yr,
            basic: Math.round(currentBasic),
            empContrib: Math.round(empContrib),
            erContrib: Math.round(erContrib),
            interest: Math.round(interest),
            balance: Math.round(balance),
        });

        currentBasic *= (1 + annualIncrement / 100);
    }

    return {
        totalCorpus: Math.round(balance),
        totalEmployeeContrib: Math.round(totalEmployeeContrib),
        totalEmployerContrib: Math.round(totalEmployerContrib),
        totalInterest: Math.round(balance - totalEmployeeContrib - totalEmployerContrib - currentBalance),
        yearlyBreakdown,
    };
}

// ── TDS Calculator ───────────────────────────────────
export function calculateTDS(
    incomeType: string,
    amount: number,
    hasPAN: boolean,
) {
    // TDS rate lookup (FY 2025-26)
    const TDS_RATES: Record<string, { withPAN: number; withoutPAN: number; threshold: number }> = {
        salary: { withPAN: 0, withoutPAN: 20, threshold: 0 }, // TDS on salary is per slabs, simplified
        fd_interest: { withPAN: 10, withoutPAN: 20, threshold: 40000 },
        rent: { withPAN: 10, withoutPAN: 20, threshold: 240000 },
        freelance: { withPAN: 10, withoutPAN: 20, threshold: 30000 },
        commission: { withPAN: 5, withoutPAN: 20, threshold: 15000 },
        lottery: { withPAN: 30, withoutPAN: 30, threshold: 10000 },
        property_sale: { withPAN: 1, withoutPAN: 20, threshold: 5000000 },
    };

    const config = TDS_RATES[incomeType] || TDS_RATES.freelance;
    const tdsRate = hasPAN ? config.withPAN : config.withoutPAN;

    // For salary, use approximate 10% for simplicity (actual depends on slab)
    const effectiveRate = incomeType === 'salary' && hasPAN ? 10 : tdsRate;

    let tdsAmount = 0;
    if (amount > config.threshold) {
        tdsAmount = incomeType === 'salary'
            ? amount * effectiveRate / 100  // On full salary
            : (amount - (incomeType === 'property_sale' ? 0 : 0)) * effectiveRate / 100; // On full amount for others
    }

    return {
        tdsRate: effectiveRate,
        tdsAmount: Math.round(tdsAmount),
        netAmount: Math.round(amount - tdsAmount),
        threshold: config.threshold,
        section: getSectionForIncomeType(incomeType),
    };
}

function getSectionForIncomeType(type: string): string {
    const sections: Record<string, string> = {
        salary: '192',
        fd_interest: '194A',
        rent: '194I',
        freelance: '194J',
        commission: '194H',
        lottery: '194B',
        property_sale: '194IA',
    };
    return sections[type] || '194J';
}

// ── Lumpsum Calculator ───────────────────────────────
export function calculateLumpsum(
    investmentAmount: number,
    returnRate: number,
    years: number,
) {
    const futureValue = investmentAmount * Math.pow(1 + returnRate / 100, years);
    const totalGains = futureValue - investmentAmount;

    return {
        futureValue: Math.round(futureValue),
        totalGains: Math.round(totalGains),
        investedAmount: Math.round(investmentAmount),
        absoluteReturn: investmentAmount > 0 ? Math.round((totalGains / investmentAmount) * 100) : 0,
        cagr: returnRate,
    };
}
