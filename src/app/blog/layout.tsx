import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Blog & Guides — Government Schemes, Tax Tips & Financial Advice',
    description:
        'Latest updates on government schemes, tax-saving tips, and financial planning guides for Indian citizens. Free resources by LaabhMitra.',
    alternates: { canonical: 'https://laabhmitra.in/blog' },
    openGraph: {
        title: 'LaabhMitra Blog — Schemes & Financial Guides',
        description: 'Latest updates on government schemes, tax-saving tips, and financial planning guides.',
        url: 'https://laabhmitra.in/blog',
        images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
    },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return children;
}
