import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Government Scheme Eligibility Checker — Find Schemes You Qualify For',
    description:
        'Check your eligibility for PM Kisan, Ayushman Bharat, PM Awas Yojana & 20+ government schemes in 2 minutes. Free, no login required.',
    alternates: { canonical: 'https://laabhmitra.in/eligibility' },
    openGraph: {
        title: 'Check Your Government Scheme Eligibility — LaabhMitra',
        description: 'Find all government schemes you qualify for in 2 minutes. Free eligibility checker.',
        url: 'https://laabhmitra.in/eligibility',
        images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
    },
};

export default function EligibilityLayout({ children }: { children: React.ReactNode }) {
    return children;
}
