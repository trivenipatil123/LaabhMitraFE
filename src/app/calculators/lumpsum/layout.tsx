import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Lumpsum Investment Calculator — Future Value of One-Time Investment',
    description:
        'Calculate future value of a one-time lumpsum investment. Compare with SIP returns. Free compound interest calculator.',
    alternates: { canonical: 'https://laabhmitra.in/calculators/lumpsum' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
