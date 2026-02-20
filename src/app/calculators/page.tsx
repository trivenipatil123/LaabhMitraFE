'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CALCULATOR_CARDS, CALCULATOR_CATEGORIES } from '@/lib/constants';

export default function CalculatorsPage() {
    const [activeCategory, setActiveCategory] = useState('all');

    const filtered = activeCategory === 'all'
        ? CALCULATOR_CARDS
        : CALCULATOR_CARDS.filter((c) => c.category === activeCategory);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
            <div className="text-center mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">Free Financial Calculators</h1>
                <p className="text-[var(--color-text-secondary)] max-w-xl mx-auto">
                    Smart tools for smarter financial decisions. Instant results, no login required.
                </p>
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
                {CALCULATOR_CATEGORIES.map((cat) => (
                    <button key={cat.key} onClick={() => setActiveCategory(cat.key)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat.key
                                ? 'bg-[var(--color-primary)] text-white shadow-md scale-105'
                                : 'bg-[var(--color-bg-card)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]'
                            }`}>
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* Count */}
            <p className="text-center text-sm text-[var(--color-text-light)] mb-6">
                Showing {filtered.length} calculator{filtered.length !== 1 ? 's' : ''}
            </p>

            {/* Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
                {filtered.map((calc) => (
                    <Link
                        key={calc.slug}
                        href={`/calculators/${calc.slug}`}
                        className="group p-5 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border)] shadow-sm card-hover relative overflow-hidden"
                    >
                        {/* Color accent strip */}
                        <div
                            className="absolute top-0 left-0 w-full h-1 rounded-t-2xl"
                            style={{ backgroundColor: calc.color }}
                        />
                        <div className="flex items-start gap-4">
                            <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform"
                                style={{ backgroundColor: `${calc.color}12` }}
                            >
                                {calc.icon}
                            </div>
                            <div className="min-w-0">
                                <h3 className="font-semibold text-base mb-0.5 group-hover:text-[var(--color-primary)] transition truncate">{calc.title}</h3>
                                <p className="text-xs text-[var(--color-text-secondary)] line-clamp-2">{calc.description}</p>
                            </div>
                        </div>
                        <div className="mt-3 text-sm font-medium text-[var(--color-primary)] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            Try now <span>→</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
