import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Scheme Deadline Tracker 2026 — Important Dates for Tax, PF, Insurance',
    description: 'Never miss a government deadline. Track ITR filing, PM Kisan eKYC, Ayushman renewal, tax-saving investments, and more.',
    alternates: { canonical: 'https://laabhmitra.in/deadlines' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
