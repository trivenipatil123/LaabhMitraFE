import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Compare Schemes — PPF vs NPS vs ELSS, FD vs RD, SIP vs Lumpsum',
    description: 'Side-by-side comparison of government & investment schemes. Compare returns, tax benefits, lock-in periods. Make informed decisions.',
    alternates: { canonical: 'https://laabhmitra.in/compare-schemes' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
