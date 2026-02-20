import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Home Loan Eligibility Calculator — How Much Loan Can You Get?',
    description:
        'Check your home loan eligibility based on income, existing EMIs, and tenure. Know your maximum loan amount instantly.',
    alternates: { canonical: 'https://laabhmitra.in/calculators/home-loan-eligibility' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
