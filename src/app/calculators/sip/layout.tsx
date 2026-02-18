import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'SIP Calculator — Calculate Mutual Fund Returns Over Time',
    description:
        'See how your monthly SIP investment grows with compound interest. Calculate future value, total invested & wealth gained. Free SIP calculator.',
    alternates: { canonical: 'https://laabhmitra.in/calculators/sip' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
