import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'State Government Schemes 2026 — Maharashtra, UP, Karnataka, Tamil Nadu, Bihar',
    description: 'Find state-level government schemes. Maharashtra, Uttar Pradesh, Karnataka, Tamil Nadu, Bihar — women, education, housing, pension schemes. With eligibility & benefits.',
    alternates: { canonical: 'https://laabhmitra.in/state-schemes' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
