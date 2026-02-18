'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { schemesApi } from '@/lib/api';
import { formatCurrency } from '@/lib/constants';

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

export default function SchemesPage() {
    const [schemes, setSchemes] = useState<Scheme[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState<string>('');
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

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

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
            <div className="text-center mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">Government Schemes</h1>
                <p className="text-[var(--color-text-secondary)]">Browse 700+ central and state government schemes</p>
            </div>

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
        </div>
    );
}
