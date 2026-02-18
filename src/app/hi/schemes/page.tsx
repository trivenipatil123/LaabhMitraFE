import type { Metadata } from 'next';
import Link from 'next/link';
import { HINDI_SCHEMES } from '@/lib/hindi-scheme-data';

export const metadata: Metadata = {
    title: 'सरकारी योजनाएं हिंदी में — पात्रता और लाभ | LaabhMitra',
    description:
        'प्रमुख सरकारी योजनाओं की जानकारी हिंदी में — पीएम किसान, आयुष्मान भारत, पीएम आवास, सुकन्या समृद्धि, मुद्रा लोन। पात्रता जांचें और आवेदन करें।',
    alternates: {
        canonical: 'https://laabhmitra.in/hi/schemes',
        languages: {
            en: 'https://laabhmitra.in/schemes',
            hi: 'https://laabhmitra.in/hi/schemes',
        },
    },
};

export default function HindiSchemesListingPage() {
    return (
        <div lang="hi" className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
            <div className="text-center mb-10">
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">🏛️ सरकारी योजनाएं — हिंदी</h1>
                <p className="text-[var(--color-text-secondary)]">
                    प्रमुख सरकारी योजनाओं की जानकारी हिंदी में पढ़ें
                </p>
                <Link
                    href="/schemes"
                    className="inline-flex items-center gap-1.5 mt-2 text-sm text-[var(--color-primary)] hover:underline"
                >
                    🌐 View in English
                </Link>
            </div>

            <div className="space-y-4">
                {HINDI_SCHEMES.map((scheme) => (
                    <Link
                        key={scheme.slug}
                        href={`/hi/schemes/${scheme.slug}`}
                        className="block p-5 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] card-hover shadow-sm"
                    >
                        <div className="flex items-start gap-3">
                            <span className="text-2xl mt-0.5">{scheme.categoryIcon}</span>
                            <div className="flex-1">
                                <h2 className="font-semibold text-lg">{scheme.name}</h2>
                                <p className="text-xs text-[var(--color-text-light)] mt-0.5">{scheme.nameEn}</p>
                                <p className="text-sm text-[var(--color-text-secondary)] mt-2 line-clamp-2">
                                    {scheme.description}
                                </p>
                                <div className="flex items-center gap-3 mt-3">
                                    <span className="px-3 py-1 text-xs rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium">
                                        {scheme.benefitValue}
                                    </span>
                                    <span className="text-xs text-[var(--color-text-light)]">{scheme.ministry}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* CTA */}
            <div className="text-center mt-10 py-6 bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl px-6">
                <h2 className="text-lg font-bold mb-2">अपनी पात्रता जांचें</h2>
                <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                    700+ सरकारी योजनाओं में से आपके लिए कौन सी योजनाएं हैं — मुफ्त, कोई लॉगिन नहीं।
                </p>
                <Link
                    href="/eligibility"
                    className="inline-flex items-center gap-2 px-6 py-3 gradient-bg text-white font-semibold rounded-xl hover:shadow-lg transition"
                >
                    🎯 पात्रता जांचें — 2 मिनट में
                </Link>
            </div>
        </div>
    );
}
