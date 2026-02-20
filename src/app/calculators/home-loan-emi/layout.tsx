import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Home Loan EMI Calculator 2026 — SBI, HDFC, ICICI Rates Comparison',
    description:
        'Calculate your home loan EMI instantly. See year-wise amortization schedule, total interest, and compare rates. Free home loan EMI calculator 2026.',
    alternates: { canonical: 'https://laabhmitra.in/calculators/home-loan-emi' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
