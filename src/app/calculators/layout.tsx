import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Free Financial Calculators 2026 — EMI, Tax, SIP, NPS, HRA, TDS & More',
    description: 'Free online calculators: Income Tax, Home Loan EMI, Car Loan, SIP, Lumpsum, HRA, TDS, EPF, Gratuity, NPS, SSY, Salary In-Hand, RD, GST, FD, PPF. Instant results with charts.',
};

export default function CalculatorsLayout({ children }: { children: React.ReactNode }) {
    return children;
}
