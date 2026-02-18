import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'All Government Schemes in India 2026 — Complete List',
    description:
        'Browse 700+ central and state government schemes. Filter by category — agriculture, health, housing, education, business & more. Check eligibility free.',
    alternates: { canonical: 'https://laabhmitra.in/schemes' },
    openGraph: {
        title: 'Government Schemes in India 2026 — Complete List',
        description: 'Browse 700+ central and state government schemes. Filter by category.',
        url: 'https://laabhmitra.in/schemes',
        images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
    },
};

export default function SchemesLayout({ children }: { children: React.ReactNode }) {
    return children;
}
