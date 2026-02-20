import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'My Savings Dashboard — Track Your Net Worth & Retirement Corpus',
    description: 'Track all your savings in one place: PF, PPF, FD, NPS, SSY, mutual funds. See net worth, asset allocation, and projected retirement corpus. No login needed.',
    alternates: { canonical: 'https://laabhmitra.in/savings-dashboard' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
