'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { eligibilityApi } from '@/lib/api';
import { formatCurrency } from '@/lib/constants';

// Matches the backend EligibilitySchemeMatch schema exactly
interface SchemeMatch {
    id: number;
    name: string;
    name_hi: string | null;
    short_name: string | null;
    slug: string;
    benefit_summary: string | null;
    benefit_summary_hi: string | null;
    benefit_value: number | null;
    benefit_type: string | null;
    category_name: string | null;
    category_slug: string | null;
    category_icon: string | null;
    documents_required: string[] | null;
    application_url: string | null;
    official_url: string | null;
    match_score: number;
}

// Matches the backend EligibilityResult schema exactly
interface EligibilityResult {
    total_schemes: number;
    total_benefit_value: number;
    schemes: SchemeMatch[];
    grouped_by_category: Record<string, SchemeMatch[]>;
    consolidated_documents: string[];
    share_text: string;
}

export default function ResultsPage() {
    const [result, setResult] = useState<EligibilityResult | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const stored = sessionStorage.getItem('eligibility_profile');
                if (!stored) {
                    setError('No profile found. Please fill the eligibility form first.');
                    setLoading(false);
                    return;
                }
                const profile = JSON.parse(stored);
                const data = await eligibilityApi.check(profile) as EligibilityResult;
                setResult(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to check eligibility');
            } finally {
                setLoading(false);
            }
        };
        fetchResults();
    }, []);

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-16 text-center">
                <div className="text-6xl mb-4 animate-bounce">🔍</div>
                <h2 className="text-xl font-semibold mb-2">Checking Your Eligibility...</h2>
                <p className="text-[var(--color-text-secondary)]">Matching your profile against 700+ schemes</p>
                <div className="mt-8 space-y-3 max-w-md mx-auto">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="skeleton h-16 rounded-xl" style={{ animationDelay: `${i * 150}ms` }} />
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-16 text-center">
                <div className="text-6xl mb-4">⚠️</div>
                <h2 className="text-xl font-semibold mb-2">Something Went Wrong</h2>
                <p className="text-[var(--color-text-secondary)] mb-6">{error}</p>
                <Link href="/eligibility" className="inline-flex items-center gap-2 px-6 py-3 gradient-bg text-white font-medium rounded-xl">
                    ← Try Again
                </Link>
            </div>
        );
    }

    if (!result) return null;

    const categories = Object.entries(result.grouped_by_category || {});

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
            {/* Summary header */}
            <div className="text-center mb-8 fade-in">
                <div className="text-5xl mb-3">🎉</div>
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                    You&apos;re Eligible for {result.total_schemes} Schemes!
                </h1>
                <p className="text-lg text-[var(--color-text-secondary)]">
                    Total potential benefit: <strong className="text-[var(--color-primary)]">{formatCurrency(result.total_benefit_value)}</strong>
                </p>
            </div>

            {/* Summary cards */}
            <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-center">
                    <div className="text-2xl font-bold text-green-700">{result.total_schemes}</div>
                    <div className="text-sm text-green-600">Schemes Matched</div>
                </div>
                <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-center">
                    <div className="text-2xl font-bold text-blue-700">{formatCurrency(result.total_benefit_value)}</div>
                    <div className="text-sm text-blue-600">Potential Value</div>
                </div>
            </div>

            {/* Schemes by category */}
            {categories.length > 0 ? (
                categories.map(([categoryName, schemes]) => (
                    <div key={categoryName} className="mb-8 slide-up">
                        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                            {(schemes as SchemeMatch[])[0]?.category_icon && (
                                <span>{(schemes as SchemeMatch[])[0].category_icon}</span>
                            )}
                            {categoryName}
                            <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                                {(schemes as SchemeMatch[]).length}
                            </span>
                        </h2>
                        <div className="space-y-3">
                            {(schemes as SchemeMatch[]).map((scheme) => (
                                <Link
                                    key={scheme.id}
                                    href={`/schemes/${scheme.slug}`}
                                    className="block p-4 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] card-hover shadow-sm"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-sm sm:text-base">{scheme.name}</h3>
                                            {scheme.name_hi && (
                                                <p className="text-xs text-[var(--color-text-light)] mt-0.5">{scheme.name_hi}</p>
                                            )}
                                            <p className="text-sm text-[var(--color-text-secondary)] mt-1">{scheme.benefit_summary}</p>
                                            {scheme.benefit_type && (
                                                <span className="inline-block mt-2 text-xs px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200 capitalize">
                                                    {scheme.benefit_type}
                                                </span>
                                            )}
                                        </div>
                                        {scheme.benefit_value != null && scheme.benefit_value > 0 && (
                                            <div className="text-right shrink-0">
                                                <div className="text-lg font-bold text-[var(--color-primary)]">{formatCurrency(scheme.benefit_value)}</div>
                                                <div className="text-xs text-[var(--color-text-light)]">benefit</div>
                                            </div>
                                        )}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))
            ) : (
                /* Flat list fallback if grouped_by_category is empty but schemes exist */
                result.schemes.length > 0 && (
                    <div className="space-y-3">
                        {result.schemes.map((scheme) => (
                            <Link
                                key={scheme.id}
                                href={`/schemes/${scheme.slug}`}
                                className="block p-4 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] card-hover shadow-sm"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <h3 className="font-semibold">{scheme.name}</h3>
                                        <p className="text-sm text-[var(--color-text-secondary)] mt-1">{scheme.benefit_summary}</p>
                                    </div>
                                    {scheme.benefit_value != null && scheme.benefit_value > 0 && (
                                        <div className="text-lg font-bold text-[var(--color-primary)]">{formatCurrency(scheme.benefit_value)}</div>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                )
            )}

            {/* Consolidated documents */}
            {result.consolidated_documents?.length > 0 && (
                <div className="mt-8 p-5 rounded-xl bg-amber-50 border border-amber-200">
                    <h3 className="font-semibold mb-2 flex items-center gap-2"><span>📄</span> Documents You&apos;ll Need</h3>
                    <div className="flex flex-wrap gap-2">
                        {result.consolidated_documents.map((doc) => (
                            <span key={doc} className="text-xs px-2.5 py-1 rounded-full bg-white border border-amber-200 text-amber-800">
                                {doc}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 pt-8 border-t border-[var(--color-border)]">
                <Link
                    href="/eligibility"
                    className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--color-border)] text-sm font-medium rounded-xl hover:border-gray-300 transition"
                >
                    ← Modify Profile
                </Link>
                <button
                    onClick={() => {
                        if (navigator.share) {
                            navigator.share({
                                title: 'LaabhMitra Results',
                                text: result.share_text || `I'm eligible for ${result.total_schemes} government schemes!`,
                                url: window.location.href,
                            });
                        } else {
                            navigator.clipboard.writeText(result.share_text || '');
                            alert('Copied to clipboard!');
                        }
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 gradient-bg text-white text-sm font-medium rounded-xl shadow-sm hover:shadow-md transition-all"
                >
                    📤 Share Results
                </button>
            </div>
        </div>
    );
}
