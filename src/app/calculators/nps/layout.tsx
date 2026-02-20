import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'NPS Calculator — How Much Pension Will You Get at 60?',
    description:
        'Plan your retirement with NPS. Calculate total corpus, monthly pension, and lump sum withdrawal. Free NPS pension calculator 2026.',
    alternates: { canonical: 'https://laabhmitra.in/calculators/nps' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
