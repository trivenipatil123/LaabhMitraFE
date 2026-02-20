import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'RD Calculator 2026 — Recurring Deposit Maturity & Interest Calculator',
    description:
        'Calculate RD maturity amount with quarterly compounding. See total interest earned on your recurring deposit. Free RD calculator.',
    alternates: { canonical: 'https://laabhmitra.in/calculators/rd' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
