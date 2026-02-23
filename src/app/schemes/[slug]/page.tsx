'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { schemesApi } from '@/lib/api';
import { formatCurrency } from '@/lib/constants';
import { trackSchemeViewed } from '@/lib/analytics';
import { SchemeJsonLd } from '@/components/SchemeJsonLd';


interface HowToApplyStep {
    step: number;
    text: string;
}

interface SchemeDetail {
    id: number;
    name: string;
    name_hi: string;
    slug: string;
    description: string;
    description_hi: string;
    benefit_summary: string;
    benefit_value: number;
    benefit_type: string;
    ministry: string;
    official_url: string;
    application_url: string;
    helpline: string;
    eligibility_rules: Record<string, unknown>;
    documents_required: string[];
    how_to_apply: HowToApplyStep[];
    is_always_open: boolean;
    deadline: string;
    scope: string;
    state: string;
    category_name: string;
    category_icon: string;
    launched_date: string;
}

export default function SchemeDetailPage() {
    const params = useParams();
    const slug = params.slug as string;
    const [scheme, setScheme] = useState<SchemeDetail | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        schemesApi.getBySlug(slug)
            .then((data) => {
                const scheme = data as SchemeDetail;
                setScheme(scheme);
                trackSchemeViewed(scheme.name, scheme.slug);
            })
            .catch(() => { })
            .finally(() => setLoading(false));
    }, [slug]);

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-12">
                <div className="skeleton h-8 w-2/3 rounded mb-4" />
                <div className="skeleton h-4 w-1/2 rounded mb-8" />
                <div className="skeleton h-40 rounded-xl mb-4" />
                <div className="skeleton h-60 rounded-xl" />
            </div>
        );
    }

    if (!scheme) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-16 text-center">
                <div className="text-5xl mb-4">❌</div>
                <h1 className="text-xl font-bold mb-2">Scheme Not Found</h1>
                <Link href="/schemes" className="text-[var(--color-primary)] hover:underline">← Browse all schemes</Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
            <SchemeJsonLd scheme={scheme} />
            {/* Breadcrumb */}
            <nav className="text-sm text-[var(--color-text-light)] mb-4">
                <Link href="/schemes" className="hover:text-[var(--color-primary)] transition">Schemes</Link>
                {' / '}
                <span className="text-[var(--color-text)]">{scheme.name}</span>
            </nav>

            {/* Language switcher */}
            <div className="flex justify-end mb-4">
                <Link
                    href={`/hi/schemes/${slug}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                >
                    🌐 हिंदी
                </Link>
            </div>

            {/* Header */}
            <div className="mb-8 fade-in">
                <div className="flex items-start gap-3 mb-3">
                    <span className="text-3xl">{scheme.category_icon || '📋'}</span>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold">{scheme.name}</h1>
                        {scheme.name_hi && <p className="text-lg text-[var(--color-text-secondary)]">{scheme.name_hi}</p>}
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-sm">
                    <span className="px-3 py-1 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-medium">
                        {scheme.category_name}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600">{scheme.scope || 'Central'}</span>
                    {scheme.is_always_open && (
                        <span className="px-3 py-1 rounded-full bg-green-50 text-green-700">✅ Always Open</span>
                    )}
                    {scheme.deadline && (
                        <span className="px-3 py-1 rounded-full bg-red-50 text-red-700">📅 {scheme.deadline}</span>
                    )}
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Main content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Benefit box */}
                    <div className="p-5 rounded-xl bg-green-50 border border-green-200">
                        <h3 className="font-semibold text-green-800 mb-1 flex items-center gap-2"><span>💰</span> Benefits</h3>
                        <p className="text-green-700 text-lg font-medium">{scheme.benefit_summary}</p>
                        {scheme.benefit_value > 0 && (
                            <p className="text-sm text-green-600 mt-1">Worth up to {formatCurrency(scheme.benefit_value)}</p>
                        )}
                    </div>

                    {/* Description */}
                    <div className="p-5 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)]">
                        <h3 className="font-semibold mb-2 flex items-center gap-2"><span>📖</span> About this Scheme</h3>
                        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{scheme.description}</p>
                    </div>

                    {/* Documents Required */}
                    {scheme.documents_required && scheme.documents_required.length > 0 && (
                        <div className="p-5 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)]">
                            <h3 className="font-semibold mb-3 flex items-center gap-2"><span>📄</span> Documents Required</h3>
                            <ul className="space-y-2">
                                {scheme.documents_required.map((doc: string, i: number) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]">
                                        <span className="text-[var(--color-primary)] mt-0.5">•</span>
                                        {doc}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* How to Apply */}
                    {scheme.how_to_apply && scheme.how_to_apply.length > 0 && (
                        <div className="p-5 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)]">
                            <h3 className="font-semibold mb-3 flex items-center gap-2"><span>📝</span> How to Apply</h3>
                            <ol className="space-y-3">
                                {scheme.how_to_apply.map((step: { step: number; text: string }) => (
                                    <li key={step.step} className="flex items-start gap-3">
                                        <span className="w-7 h-7 shrink-0 rounded-full gradient-bg text-white text-xs font-bold flex items-center justify-center">
                                            {step.step}
                                        </span>
                                        <span className="text-sm text-[var(--color-text-secondary)] pt-0.5">{step.text}</span>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div className="space-y-4">
                    {/* Apply button */}
                    {scheme.application_url && (
                        <a
                            href={scheme.application_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full text-center px-6 py-3 gradient-bg text-white font-semibold rounded-xl shadow-sm hover:shadow-md transition-all"
                        >
                            Apply Now →
                        </a>
                    )}

                    {/* Quick info */}
                    <div className="p-5 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] space-y-4 text-sm">
                        {scheme.ministry && (
                            <div>
                                <span className="text-[var(--color-text-light)]">Ministry</span>
                                <p className="font-medium">{scheme.ministry}</p>
                            </div>
                        )}
                        {scheme.launched_date && (
                            <div>
                                <span className="text-[var(--color-text-light)]">Launched</span>
                                <p className="font-medium">{scheme.launched_date}</p>
                            </div>
                        )}
                        {scheme.helpline && (
                            <div>
                                <span className="text-[var(--color-text-light)]">Helpline</span>
                                <p className="font-medium text-[var(--color-primary)]">📞 {scheme.helpline}</p>
                            </div>
                        )}
                        {scheme.official_url && (
                            <a
                                href={scheme.official_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block text-[var(--color-primary)] hover:underline"
                            >
                                🔗 Official Website →
                            </a>
                        )}
                    </div>

                    {/* Check eligibility */}
                    <Link
                        href="/eligibility"
                        className="block w-full text-center px-6 py-3 border-2 border-[var(--color-primary)] text-[var(--color-primary)] font-medium rounded-xl hover:bg-[var(--color-primary)]/5 transition"
                    >
                        ✅ Check My Eligibility
                    </Link>
                </div>
            </div>

            {/* Auto-generated FAQ Section for SEO */}
            {(() => {
                const faqs = [
                    {
                        q: `What is ${scheme.name}?`,
                        a: scheme.description || `${scheme.name} is a ${scheme.scope || 'Central'} government scheme under the ${scheme.ministry || 'Government of India'}.`,
                    },
                    {
                        q: `What are the benefits of ${scheme.name}?`,
                        a: scheme.benefit_summary + (scheme.benefit_value > 0 ? ` Worth up to ${formatCurrency(scheme.benefit_value)}.` : ''),
                    },
                    ...(scheme.documents_required?.length > 0
                        ? [{
                            q: `What documents are required for ${scheme.name}?`,
                            a: `The documents required include: ${scheme.documents_required.join(', ')}.`,
                        }]
                        : []),
                    ...(scheme.helpline
                        ? [{
                            q: `What is the helpline number for ${scheme.name}?`,
                            a: `You can reach the ${scheme.name} helpline at ${scheme.helpline}.`,
                        }]
                        : []),
                    {
                        q: `How do I check my eligibility for ${scheme.name}?`,
                        a: `You can check your eligibility for ${scheme.name} instantly on LaabhMitra — visit laabhmitra.in/eligibility. It takes just 2 minutes and requires no login.`,
                    },
                ];

                return (
                    <>
                        <section className="mt-8 p-5 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)]">
                            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <span>❓</span> Frequently Asked Questions
                            </h2>
                            <div className="space-y-4">
                                {faqs.map((faq, i) => (
                                    <div key={i} className={i > 0 ? 'pt-4 border-t border-[var(--color-border)]' : ''}>
                                        <h3 className="font-medium text-[var(--color-text-primary)] mb-1">{faq.q}</h3>
                                        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{faq.a}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* FAQ JSON-LD for Google Rich Results */}
                        <script
                            type="application/ld+json"
                            dangerouslySetInnerHTML={{
                                __html: JSON.stringify({
                                    '@context': 'https://schema.org',
                                    '@type': 'FAQPage',
                                    mainEntity: faqs.map((faq) => ({
                                        '@type': 'Question',
                                        name: faq.q,
                                        acceptedAnswer: {
                                            '@type': 'Answer',
                                            text: faq.a,
                                        },
                                    })),
                                }),
                            }}
                        />
                    </>
                );
            })()}
        </div>
    );
}
