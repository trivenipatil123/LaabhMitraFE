'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SCHEME_COMPARISONS, type SchemeComparison } from '@/lib/scheme-comparisons';

function ComparisonTable({ comp }: { comp: SchemeComparison }) {
    const colCount = comp.schemes.length;

    return (
        <div className="rounded-2xl border border-[var(--color-border)] shadow-sm overflow-hidden bg-[var(--color-bg-card)]">
            {/* Header */}
            <div className="grid gap-0" style={{ gridTemplateColumns: `160px repeat(${colCount}, 1fr)` }}>
                <div className="p-4 bg-gray-50 border-b border-r border-[var(--color-border)] font-semibold text-sm flex items-center">
                    Feature
                </div>
                {comp.schemes.map((s, i) => (
                    <div key={i} className="p-4 bg-gray-50 border-b border-[var(--color-border)] text-center"
                        style={{ borderLeft: i > 0 ? '1px solid var(--color-border)' : undefined }}>
                        <span className="text-2xl block mb-1">{s.icon}</span>
                        <span className="font-bold text-sm">{s.name}</span>
                        {s.slug && (
                            <Link href={s.slug} className="block text-[10px] text-[var(--color-primary)] hover:underline mt-0.5">
                                Calculator →
                            </Link>
                        )}
                    </div>
                ))}
            </div>

            {/* Rows */}
            {comp.rows.map((row, ri) => (
                <div key={ri} className="grid gap-0 hover:bg-blue-50/30 transition"
                    style={{ gridTemplateColumns: `160px repeat(${colCount}, 1fr)` }}>
                    <div className="p-3 border-b border-r border-[var(--color-border)] text-xs font-medium text-[var(--color-text-secondary)] flex items-center">
                        {row.label}
                    </div>
                    {row.values.map((v, vi) => (
                        <div key={vi}
                            className={`p-3 border-b border-[var(--color-border)] text-xs text-center flex items-center justify-center ${row.highlight === vi ? 'bg-green-50 text-green-800 font-semibold' : ''
                                }`}
                            style={{ borderLeft: vi > 0 ? '1px solid var(--color-border)' : undefined }}>
                            {row.highlight === vi && <span className="mr-1">✅</span>}
                            {v}
                        </div>
                    ))}
                </div>
            ))}

            {/* Verdict */}
            <div className="p-4 bg-blue-50 border-t border-blue-200">
                <p className="text-xs text-blue-800">
                    <strong>💡 Verdict:</strong> {comp.verdict}
                </p>
            </div>
        </div>
    );
}

export default function CompareSchemesPage() {
    const [activeId, setActiveId] = useState(SCHEME_COMPARISONS[0].id);
    const active = SCHEME_COMPARISONS.find((c) => c.id === activeId)!;

    return (
        <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
            <div className="text-center mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">🔄 Compare Schemes</h1>
                <p className="text-[var(--color-text-secondary)]">Side-by-side comparison — know exactly where to invest</p>
            </div>

            {/* Comparison Picker */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
                {SCHEME_COMPARISONS.map((comp) => (
                    <button key={comp.id} onClick={() => setActiveId(comp.id)}
                        className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all border ${activeId === comp.id
                                ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-md'
                                : 'bg-[var(--color-bg-card)] text-[var(--color-text-secondary)] border-[var(--color-border)] hover:border-[var(--color-primary)]'
                            }`}>
                        {comp.title}
                    </button>
                ))}
            </div>

            {/* Description */}
            <p className="text-center text-sm text-[var(--color-text-secondary)] mb-6">{active.description}</p>

            {/* Scrollable wrapper for mobile */}
            <div className="overflow-x-auto -mx-4 px-4 pb-2">
                <div className="min-w-[500px]">
                    <ComparisonTable comp={active} />
                </div>
            </div>

            {/* All Comparisons Grid */}
            <div className="mt-12">
                <h2 className="text-lg font-semibold mb-4 text-center">All Comparisons</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {SCHEME_COMPARISONS.map((comp) => (
                        <button key={comp.id} onClick={() => { setActiveId(comp.id); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                            className={`text-left p-4 rounded-xl border transition-all ${activeId === comp.id
                                    ? 'border-[var(--color-primary)] shadow-md bg-blue-50'
                                    : 'border-[var(--color-border)] hover:shadow-sm'
                                }`}>
                            <div className="flex items-center gap-1 mb-2">
                                {comp.schemes.map((s, i) => (
                                    <span key={i} className="text-lg">{s.icon}</span>
                                ))}
                            </div>
                            <h3 className="font-semibold text-sm mb-1">{comp.title}</h3>
                            <p className="text-xs text-[var(--color-text-secondary)]">{comp.description}</p>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
