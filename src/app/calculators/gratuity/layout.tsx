import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Gratuity Calculator 2026 — How Much Will You Get?',
    description:
        'Calculate your gratuity amount based on salary and years of service. Check tax-free limit (₹25 lakh). Government and private employee support.',
    alternates: { canonical: 'https://laabhmitra.in/calculators/gratuity' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
