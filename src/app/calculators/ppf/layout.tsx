import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'PPF Calculator — Calculate Public Provident Fund Returns',
    description:
        'Calculate PPF maturity amount with year-wise breakdown at current 7.1% rate. See total deposits, interest earned & tax benefits. Free PPF calculator.',
    alternates: { canonical: 'https://laabhmitra.in/calculators/ppf' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
