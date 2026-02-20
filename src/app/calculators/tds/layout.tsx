import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'TDS Calculator — Know Your TDS Deduction on Income',
    description:
        'Calculate TDS on salary, FD interest, rent, freelance income. Check applicable section and rate. With and without PAN.',
    alternates: { canonical: 'https://laabhmitra.in/calculators/tds' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
