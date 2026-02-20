import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Car Loan EMI Calculator — Monthly EMI & Total Interest',
    description:
        'Calculate car loan EMI with down payment. Compare monthly EMI and total interest for your dream car. Free car loan calculator.',
    alternates: { canonical: 'https://laabhmitra.in/calculators/car-loan-emi' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
