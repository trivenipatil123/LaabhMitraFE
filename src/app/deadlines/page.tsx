'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DEADLINES, daysUntil, type Deadline } from '@/lib/deadlines';

const CATEGORY_TABS = [
    { key: 'all', label: '🔢 All' },
    { key: 'tax', label: '💰 Tax' },
    { key: 'scheme', label: '📋 Schemes' },
    { key: 'investment', label: '📈 Investment' },
    { key: 'pension', label: '🧓 Pension' },
    { key: 'insurance', label: '🛡️ Insurance' },
];

function DeadlineCard({ d }: { d: Deadline }) {
    const days = daysUntil(d.date);
    const isPast = days < 0;
    const isUrgent = days >= 0 && days <= 7;
    const isSoon = days > 7 && days <= 30;

    const dateObj = new Date(d.date);
    const dateStr = dateObj.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

    return (
        <div className={`relative p-5 rounded-2xl border shadow-sm transition-all hover:shadow-md ${isPast ? 'bg-gray-50 border-gray-200 opacity-60' :
                isUrgent ? 'bg-red-50 border-red-200' :
                    isSoon ? 'bg-amber-50 border-amber-200' :
                        'bg-[var(--color-bg-card)] border-[var(--color-border)]'
            }`}>
            {/* Urgency badge */}
            {!isPast && (
                <div className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold ${isUrgent ? 'bg-red-500 text-white animate-pulse' :
                        isSoon ? 'bg-amber-500 text-white' :
                            'bg-green-100 text-green-700'
                    }`}>
                    {isUrgent ? `${days} days left!` : isSoon ? `${days} days` : `${days} days`}
                </div>
            )}
            {isPast && (
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-gray-200 text-gray-500">
                    Expired
                </div>
            )}

            <div className="flex items-start gap-3">
                <span className="text-2xl shrink-0 mt-0.5">{d.icon}</span>
                <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-base mb-1 pr-20">{d.title}</h3>
                    <p className="text-xs text-[var(--color-text-secondary)] mb-2">{d.description}</p>
                    <div className="flex items-center gap-3 text-xs">
                        <span className="text-[var(--color-text-light)]">📅 {dateStr}</span>
                        {d.link && (
                            <Link href={d.link} className="text-[var(--color-primary)] font-medium hover:underline">
                                {d.linkLabel || 'Learn more'} →
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function DeadlinesPage() {
    const [category, setCategory] = useState('all');

    const now = new Date();
    const sorted = [...DEADLINES].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const filtered = category === 'all' ? sorted : sorted.filter((d) => d.category === category);
    const upcoming = filtered.filter((d) => new Date(d.date) >= now);
    const past = filtered.filter((d) => new Date(d.date) < now);
    const urgentCount = DEADLINES.filter((d) => {
        const days = daysUntil(d.date);
        return days >= 0 && days <= 30;
    }).length;

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
            <div className="text-center mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">⏰ Scheme Deadline Tracker</h1>
                <p className="text-[var(--color-text-secondary)]">Never miss an important government or financial deadline</p>
            </div>

            {/* Alert Banner */}
            {urgentCount > 0 && (
                <div className="p-4 rounded-xl bg-gradient-to-r from-red-50 to-amber-50 border border-red-200 mb-6 flex items-center gap-3">
                    <span className="text-2xl">🚨</span>
                    <p className="text-sm text-red-800">
                        <strong>{urgentCount} deadline{urgentCount > 1 ? 's' : ''}</strong> coming up in the next 30 days. Don&apos;t miss them!
                    </p>
                </div>
            )}

            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
                {CATEGORY_TABS.map((tab) => (
                    <button key={tab.key} onClick={() => setCategory(tab.key)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${category === tab.key
                                ? 'bg-[var(--color-primary)] text-white shadow-md'
                                : 'bg-[var(--color-bg-card)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:border-[var(--color-primary)]'
                            }`}>
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Upcoming */}
            {upcoming.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        📌 Upcoming <span className="text-sm font-normal text-[var(--color-text-light)]">({upcoming.length})</span>
                    </h2>
                    <div className="space-y-3">
                        {upcoming.map((d) => <DeadlineCard key={d.id} d={d} />)}
                    </div>
                </div>
            )}

            {/* Past */}
            {past.length > 0 && (
                <div>
                    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        ✅ Past Deadlines <span className="text-sm font-normal text-[var(--color-text-light)]">({past.length})</span>
                    </h2>
                    <div className="space-y-3">
                        {past.map((d) => <DeadlineCard key={d.id} d={d} />)}
                    </div>
                </div>
            )}

            {filtered.length === 0 && (
                <div className="text-center py-12 text-[var(--color-text-secondary)]">
                    <p>No deadlines found in this category.</p>
                </div>
            )}
        </div>
    );
}
