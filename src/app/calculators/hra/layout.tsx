import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'HRA Exemption Calculator 2026 — How Much Tax Can You Save?',
    description:
        'Calculate your HRA exemption under Section 10(13A). See all 3 conditions, taxable vs exempt HRA. Free HRA calculator for salaried employees.',
    alternates: { canonical: 'https://laabhmitra.in/calculators/hra' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
