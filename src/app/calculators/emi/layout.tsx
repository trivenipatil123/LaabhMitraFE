import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'EMI Calculator — Calculate Home, Car & Personal Loan EMI',
    description:
        'Calculate monthly EMI for home loan, car loan, or personal loan. See total interest and payment breakdown. Free EMI calculator by LaabhMitra.',
    alternates: { canonical: 'https://laabhmitra.in/calculators/emi' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
