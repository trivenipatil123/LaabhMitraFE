import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'EPF Calculator — PF Corpus at Retirement',
    description:
        'Calculate EPF corpus at retirement. See employee + employer contribution and interest earned. Year-wise PF breakdown.',
    alternates: { canonical: 'https://laabhmitra.in/calculators/epf' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
