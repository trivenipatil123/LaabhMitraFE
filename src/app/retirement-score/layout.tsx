import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Retirement Readiness Score — Are You Financially Ready?',
    description: 'Calculate your retirement readiness score (0-100). Get personalized recommendations for NPS, PPF, EPF. How prepared are you for retirement?',
    alternates: { canonical: 'https://laabhmitra.in/retirement-score' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
