import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Sukanya Samriddhi (SSY) Calculator — Maturity Amount at Age 21',
    description:
        'Calculate Sukanya Samriddhi Yojana maturity amount. 8.2% interest rate, tax-free returns. Plan your daughter\'s future.',
    alternates: { canonical: 'https://laabhmitra.in/calculators/ssy' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
