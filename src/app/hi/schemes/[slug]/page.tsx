import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { HINDI_SCHEMES, getHindiScheme, getAllHindiSchemeSlugs } from '@/lib/hindi-scheme-data';

export function generateStaticParams() {
    return getAllHindiSchemeSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const scheme = getHindiScheme(slug);

    if (!scheme) return { title: 'योजना नहीं मिली' };

    return {
        title: scheme.metaTitle,
        description: scheme.metaDescription,
        alternates: {
            canonical: `https://laabhmitra.in/hi/schemes/${slug}`,
            languages: {
                en: `https://laabhmitra.in/schemes/${scheme.englishSlug}`,
                hi: `https://laabhmitra.in/hi/schemes/${slug}`,
            },
        },
        openGraph: {
            title: scheme.metaTitle,
            description: scheme.metaDescription,
            url: `https://laabhmitra.in/hi/schemes/${slug}`,
            siteName: 'LaabhMitra',
            locale: 'hi_IN',
            type: 'article',
            images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
        },
    };
}

export default async function HindiSchemeDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const scheme = getHindiScheme(slug);

    if (!scheme) notFound();

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'GovernmentService',
        name: scheme.name,
        description: scheme.description,
        provider: {
            '@type': 'GovernmentOrganization',
            name: scheme.ministry,
        },
        areaServed: { '@type': 'Country', name: 'India' },
        url: `https://laabhmitra.in/hi/schemes/${slug}`,
        inLanguage: 'hi',
    };

    return (
        <div lang="hi" className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Breadcrumb */}
            <nav className="text-sm text-[var(--color-text-light)] mb-4">
                <Link href="/hi/schemes" className="hover:text-[var(--color-primary)] transition">योजनाएं</Link>
                {' / '}
                <span className="text-[var(--color-text)]">{scheme.name}</span>
            </nav>

            {/* Language switcher */}
            <div className="flex justify-end mb-4">
                <Link
                    href={`/schemes/${scheme.englishSlug}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                >
                    🌐 English
                </Link>
            </div>

            {/* Header */}
            <div className="mb-8">
                <div className="flex items-start gap-3 mb-3">
                    <span className="text-3xl">{scheme.categoryIcon}</span>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold">{scheme.name}</h1>
                        <p className="text-sm text-[var(--color-text-light)] mt-1">{scheme.nameEn}</p>
                    </div>
                </div>
                <p className="text-[var(--color-text-secondary)] mt-3 leading-relaxed">{scheme.description}</p>
            </div>

            {/* Benefit */}
            <div className="mb-6 p-5 rounded-2xl bg-emerald-50 border border-emerald-200">
                <h2 className="text-lg font-semibold text-emerald-800 mb-2">💰 लाभ</h2>
                <p className="text-emerald-700 font-medium text-lg">{scheme.benefitValue}</p>
                <p className="text-sm text-emerald-600 mt-1">{scheme.benefitSummary}</p>
            </div>

            {/* Eligibility */}
            <section className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl p-6 mb-6">
                <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <span>✅</span> पात्रता
                </h2>
                <ul className="space-y-2">
                    {scheme.eligibility.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-[var(--color-text-secondary)]">
                            <span className="text-[var(--color-primary)] mt-1">•</span>
                            {item}
                        </li>
                    ))}
                </ul>
                <div className="mt-4">
                    <Link
                        href="/eligibility"
                        className="inline-flex items-center gap-2 px-5 py-2.5 gradient-bg text-white text-sm font-medium rounded-xl hover:shadow-lg transition"
                    >
                        🎯 अपनी पात्रता जांचें — 2 मिनट में
                    </Link>
                </div>
            </section>

            {/* Documents Required */}
            <section className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl p-6 mb-6">
                <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <span>📄</span> आवश्यक दस्तावेज
                </h2>
                <ul className="grid sm:grid-cols-2 gap-2">
                    {scheme.documentsRequired.map((doc, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                            <span className="text-orange-500">📋</span> {doc}
                        </li>
                    ))}
                </ul>
            </section>

            {/* How to Apply */}
            <section className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl p-6 mb-6">
                <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <span>📝</span> आवेदन कैसे करें
                </h2>
                <ol className="space-y-3">
                    {scheme.howToApply.map((step, i) => (
                        <li key={i} className="flex items-start gap-3 text-[var(--color-text-secondary)]">
                            <span className="flex-shrink-0 w-7 h-7 rounded-full gradient-bg text-white text-xs font-bold flex items-center justify-center">
                                {i + 1}
                            </span>
                            {step}
                        </li>
                    ))}
                </ol>
            </section>

            {/* Official Links */}
            <section className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl p-6 mb-6">
                <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <span>🔗</span> आधिकारिक लिंक
                </h2>
                <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                        <span>🌐</span>
                        <a href={scheme.officialUrl} target="_blank" rel="noopener noreferrer"
                            className="text-[var(--color-primary)] hover:underline"
                        >
                            आधिकारिक वेबसाइट: {scheme.officialUrl}
                        </a>
                    </div>
                    <div className="flex items-center gap-2">
                        <span>📞</span>
                        <span className="text-[var(--color-text-secondary)]">हेल्पलाइन: {scheme.helpline}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span>🏛️</span>
                        <span className="text-[var(--color-text-secondary)]">{scheme.ministry}</span>
                    </div>
                </div>
            </section>

            {/* Other Hindi Schemes */}
            <section className="border-t border-[var(--color-border)] pt-8">
                <h2 className="text-lg font-semibold mb-4">📋 अन्य योजनाएं (हिंदी में)</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                    {HINDI_SCHEMES.filter((s) => s.slug !== slug).map((s) => (
                        <Link
                            key={s.slug}
                            href={`/hi/schemes/${s.slug}`}
                            className="flex items-center gap-3 p-4 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] card-hover"
                        >
                            <span className="text-2xl">{s.categoryIcon}</span>
                            <div>
                                <h3 className="font-medium text-sm">{s.name}</h3>
                                <p className="text-xs text-[var(--color-text-light)]">{s.benefitValue}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}
