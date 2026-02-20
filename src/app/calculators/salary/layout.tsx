import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'CTC to In-Hand Salary Calculator 2026 — Know Your Real Take-Home',
    description:
        'Convert CTC to in-hand salary instantly. See full breakdown: Basic, HRA, PF, Professional Tax, Income Tax. Free salary calculator for India.',
    alternates: { canonical: 'https://laabhmitra.in/calculators/salary' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
