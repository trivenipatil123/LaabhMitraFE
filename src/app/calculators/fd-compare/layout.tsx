import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'FD Rate Comparison — Compare Fixed Deposit Rates Across Banks',
    description:
        'Compare fixed deposit interest rates from SBI, HDFC, ICICI & other major banks. Filter by amount, tenure & senior citizen status. Updated FD rates 2026.',
    alternates: { canonical: 'https://laabhmitra.in/calculators/fd-compare' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
