import type { Metadata } from 'next';
import { schemesApi } from '@/lib/api';

interface SchemeBasic {
    name: string;
    slug: string;
    description: string;
    benefit_summary: string;
    ministry: string;
    category_name: string;
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;

    try {
        const scheme = (await schemesApi.getBySlug(slug)) as SchemeBasic;

        const title = `${scheme.name} 2026 — Eligibility, Benefits, Apply Online`;
        const description = `Check if you're eligible for ${scheme.name}. ${scheme.benefit_summary || scheme.description?.slice(0, 120)}. Free eligibility check on LaabhMitra.`;

        return {
            title,
            description,
            alternates: { canonical: `https://laabhmitra.in/schemes/${slug}` },
            openGraph: {
                title: `${scheme.name} — Eligibility & Benefits`,
                description,
                url: `https://laabhmitra.in/schemes/${slug}`,
                siteName: 'LaabhMitra',
                locale: 'en_IN',
                type: 'article',
                images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
            },
            twitter: {
                card: 'summary_large_image',
                title: `${scheme.name} — Eligibility & Benefits`,
                description: `Check if you're eligible for ${scheme.name} on LaabhMitra.`,
            },
        };
    } catch {
        return {
            title: 'Government Scheme Details',
            description: 'View scheme eligibility, benefits, and how to apply on LaabhMitra.',
        };
    }
}

export default function SchemeDetailLayout({ children }: { children: React.ReactNode }) {
    return children;
}
