import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Income Tax Calculator 2025-26 — Old vs New Regime Comparison',
    description:
        'Compare old vs new income tax regime for FY 2025-26. See which regime saves you more tax. Free, instant results with detailed breakdown.',
    alternates: { canonical: 'https://laabhmitra.in/calculators/income-tax' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
