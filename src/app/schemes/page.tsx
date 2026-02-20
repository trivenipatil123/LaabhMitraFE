'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { schemesApi } from '@/lib/api';
import { formatCurrency } from '@/lib/constants';
import { STATES_LIST, STATE_SCHEMES, STATE_SCHEME_CATEGORIES } from '@/lib/state-schemes';

interface Scheme {
    id: number;
    name: string;
    slug: string;
    short_name: string;
    benefit_summary: string;
    benefit_value: number;
    category_name: string;
    category_icon: string;
    scope: string;
    is_always_open: boolean;
}

interface SchemeListResponse {
    items: Scheme[];
    total: number;
    page: number;
    per_page: number;
    total_pages: number;
}

interface Category {
    id: number;
    name: string;
    slug: string;
    icon: string;
    scheme_count: number;
}

function SchemesContent() {
    const searchParams = useSearchParams();
    const initialTab = searchParams.get('tab') === 'state' ? 'state' : 'central';

    const [tab, setTab] = useState<'central' | 'state'>(initialTab);

    // Central schemes state
    const [schemes, setSchemes] = useState<Scheme[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState<string>('');
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // State schemes state
    const [selectedState, setSelectedState] = useState('maharashtra');
    const [stateCategory, setStateCategory] = useState('all');

    useEffect(() => {
        schemesApi.getCategories().then((data) => setCategories(data as Category[])).catch(() => { });
    }, []);

    useEffect(() => {
        setLoading(true);
        const params: Record<string, string> = { page: String(page), per_page: '12' };
        if (activeCategory) params.category = activeCategory;
        if (search) params.search = search;

        schemesApi.list(params)
            .then((data) => {
                const res = data as SchemeListResponse;
                setSchemes(res.items);
                setTotalPages(res.total_pages);
            })
            .catch(() => { })
            .finally(() => setLoading(false));
    }, [page, activeCategory, search]);

    const stateData = STATE_SCHEMES[selectedState];
    const filteredStateSchemes = stateCategory === 'all'
        ? stateData.schemes
        : stateData.schemes.filter((s) => s.category === stateCategory);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
            <div className="text-center mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">Government Schemes</h1>
                <p className="text-[var(--color-text-secondary)]">Browse 700+ central and state government schemes</p>
            </div>

            {/* Central / State Tabs */}
            <div className="flex justify-center gap-2 mb-8">
                <button
                    onClick={() => setTab('central')}
                    className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${tab === 'central'
                        ? 'gradient-bg text-white shadow-md'
                        : 'bg-[var(--color-bg-card)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-gray-300'
                        }`}
                >
                    🏛️ Central Government
                </button>
                <button
                    onClick={() => setTab('state')}
                    className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${tab === 'state'
                        ? 'gradient-bg text-white shadow-md'
                        : 'bg-[var(--color-bg-card)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-gray-300'
                        }`}
                >
                    🗺️ State Government
                </button>
            </div>

            {/* ═══════════════ CENTRAL TAB ═══════════════ */}
            {tab === 'central' && (
                <>
                    {/* Search */}
                    <div className="max-w-xl mx-auto mb-6">
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-light)]">🔍</span>
                            <input
                                type="text"
                                placeholder="Search schemes... (e.g., PM Kisan, housing, pension)"
                                value={search}
                                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                                className="w-full pl-11 pr-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] text-sm focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none"
                            />
                        </div>
                    </div>

                    {/* Category filters */}
                    <div className="flex flex-wrap gap-2 justify-center mb-8">
                        <button
                            onClick={() => { setActiveCategory(''); setPage(1); }}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${!activeCategory
                                ? 'gradient-bg text-white shadow-sm'
                                : 'bg-[var(--color-bg-card)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-gray-300'
                                }`}
                        >
                            All
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat.slug}
                                onClick={() => { setActiveCategory(cat.slug); setPage(1); }}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${activeCategory === cat.slug
                                    ? 'gradient-bg text-white shadow-sm'
                                    : 'bg-[var(--color-bg-card)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-gray-300'
                                    }`}
                            >
                                <span>{cat.icon}</span> {cat.name}
                            </button>
                        ))}
                    </div>

                    {/* Schemes grid */}
                    {loading ? (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="skeleton h-40 rounded-xl" />
                            ))}
                        </div>
                    ) : schemes.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-5xl mb-3">🔍</div>
                            <p className="text-[var(--color-text-secondary)]">No schemes found. Try different filters.</p>
                        </div>
                    ) : (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {schemes.map((scheme) => (
                                <Link
                                    key={scheme.id}
                                    href={`/schemes/${scheme.slug}`}
                                    className="group p-5 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] card-hover shadow-sm"
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <span className="text-2xl">{scheme.category_icon || '📋'}</span>
                                        {scheme.benefit_value > 0 && (
                                            <span className="text-sm font-bold text-[var(--color-primary)]">{formatCurrency(scheme.benefit_value)}</span>
                                        )}
                                    </div>
                                    <h3 className="font-semibold text-sm group-hover:text-[var(--color-primary)] transition line-clamp-2">{scheme.name}</h3>
                                    <p className="text-xs text-[var(--color-text-secondary)] mt-1 line-clamp-2">{scheme.benefit_summary}</p>
                                    <div className="flex items-center gap-2 mt-3">
                                        <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">{scheme.scope || 'Central'}</span>
                                        {scheme.is_always_open && (
                                            <span className="text-xs px-2 py-0.5 rounded-full bg-green-50 text-green-700">Always Open</span>
                                        )}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-2 mt-8">
                            <button
                                disabled={page === 1}
                                onClick={() => setPage(page - 1)}
                                className="px-4 py-2 rounded-lg border border-[var(--color-border)] text-sm disabled:opacity-40 hover:border-gray-300 transition"
                            >
                                ← Prev
                            </button>
                            <span className="text-sm text-[var(--color-text-secondary)]">
                                Page {page} of {totalPages}
                            </span>
                            <button
                                disabled={page === totalPages}
                                onClick={() => setPage(page + 1)}
                                className="px-4 py-2 rounded-lg border border-[var(--color-border)] text-sm disabled:opacity-40 hover:border-gray-300 transition"
                            >
                                Next →
                            </button>
                        </div>
                    )}
                </>
            )}

            {/* ═══════════════ STATE TAB ═══════════════ */}
            {tab === 'state' && (
                <>
                    {/* State Selector */}
                    <div className="flex flex-wrap justify-center gap-3 mb-6">
                        {STATES_LIST.map((s) => (
                            <button key={s.key} onClick={() => { setSelectedState(s.key); setStateCategory('all'); }}
                                className={`px-5 py-3 rounded-xl text-sm font-medium transition-all border ${selectedState === s.key
                                    ? 'text-white shadow-lg scale-105'
                                    : 'bg-[var(--color-bg-card)] text-[var(--color-text-secondary)] border-[var(--color-border)] hover:shadow-sm'
                                    }`}
                                style={selectedState === s.key ? { backgroundColor: s.color, borderColor: s.color } : {}}>
                                <span className="text-lg mr-1">{s.icon}</span> {s.name}
                                <span className="ml-1.5 text-[10px] opacity-80">({s.schemeCount})</span>
                            </button>
                        ))}
                    </div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap justify-center gap-2 mb-6">
                        {STATE_SCHEME_CATEGORIES.map((cat) => (
                            <button key={cat.key} onClick={() => setStateCategory(cat.key)}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${stateCategory === cat.key
                                    ? 'bg-[var(--color-primary)] text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}>
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    {/* Count */}
                    <p className="text-center text-sm text-[var(--color-text-light)] mb-6">
                        Showing {filteredStateSchemes.length} scheme{filteredStateSchemes.length !== 1 ? 's' : ''} in {stateData.name}
                    </p>

                    {/* Scheme Cards */}
                    <div className="grid sm:grid-cols-2 gap-4">
                        {filteredStateSchemes.map((scheme, i) => (
                            <div key={i} className="p-5 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border)] shadow-sm hover:shadow-md transition-all">
                                <div className="flex items-start justify-between gap-2 mb-2">
                                    <h3 className="font-semibold text-base">{scheme.name}</h3>
                                    <span className="shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-100 text-green-700">
                                        {scheme.benefit}
                                    </span>
                                </div>
                                <p className="text-xs text-[var(--color-text-light)] mb-1 font-medium">{scheme.nameHi}</p>
                                <p className="text-sm text-[var(--color-text-secondary)] mb-3">{scheme.description}</p>

                                <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 mb-3">
                                    <p className="text-xs">
                                        <strong className="text-[var(--color-text)]">Eligibility:</strong>{' '}
                                        <span className="text-[var(--color-text-secondary)]">{scheme.eligibility}</span>
                                    </p>
                                </div>

                                {scheme.applyUrl && (
                                    <a href={scheme.applyUrl} target="_blank" rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-primary)] hover:underline">
                                        Apply Online → <span className="text-xs">↗</span>
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>

                    {filteredStateSchemes.length === 0 && (
                        <div className="text-center py-12 text-[var(--color-text-secondary)]">
                            <p className="text-lg mb-1">No schemes found</p>
                            <p className="text-sm">Try a different category</p>
                        </div>
                    )}

                    <div className="mt-10 p-5 rounded-xl bg-blue-50 border border-blue-200 text-center">
                        <p className="text-sm text-blue-800">
                            <strong>🔄 More states coming soon!</strong> We&apos;re adding Rajasthan, Madhya Pradesh, Gujarat, West Bengal, and more.
                        </p>
                    </div>
                </>
            )}
        </div>
    );
}

export default function SchemesPage() {
    return (
        <Suspense fallback={
            <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((i) => <div key={i} className="skeleton h-40 rounded-xl" />)}
                </div>
            </div>
        }>
            <SchemesContent />
        </Suspense>
    );
}
