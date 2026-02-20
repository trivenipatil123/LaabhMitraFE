'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { formatCurrency } from '@/lib/constants';
import { trackCalculatorUsed } from '@/lib/analytics';

interface AssetEntry {
    key: string;
    label: string;
    icon: string;
    color: string;
    value: number;
    growthRate: number; // expected annual return %
}

const DEFAULT_ASSETS: AssetEntry[] = [
    { key: 'epf', label: 'EPF / PF', icon: '🏢', color: '#3B82F6', value: 0, growthRate: 8.25 },
    { key: 'ppf', label: 'PPF', icon: '🏛️', color: '#6366F1', value: 0, growthRate: 7.1 },
    { key: 'nps', label: 'NPS', icon: '🏦', color: '#8B5CF6', value: 0, growthRate: 10 },
    { key: 'fd', label: 'Fixed Deposits', icon: '💰', color: '#0891B2', value: 0, growthRate: 7 },
    { key: 'rd', label: 'Recurring Deposits', icon: '📅', color: '#0D9488', value: 0, growthRate: 6.5 },
    { key: 'ssy', label: 'Sukanya Samriddhi', icon: '👧', color: '#EC4899', value: 0, growthRate: 8.2 },
    { key: 'mf', label: 'Mutual Funds / SIP', icon: '📈', color: '#7C3AED', value: 0, growthRate: 12 },
    { key: 'stocks', label: 'Stocks / Equity', icon: '📊', color: '#059669', value: 0, growthRate: 13 },
    { key: 'gold', label: 'Gold / SGBs', icon: '🥇', color: '#D97706', value: 0, growthRate: 8 },
    { key: 'savings', label: 'Savings Account', icon: '🏧', color: '#64748B', value: 0, growthRate: 3.5 },
    { key: 'other', label: 'Other Investments', icon: '💎', color: '#6B7280', value: 0, growthRate: 8 },
];

const STORAGE_KEY = 'laabhmitra_savings';

export default function SavingsDashboard() {
    const [assets, setAssets] = useState<AssetEntry[]>(DEFAULT_ASSETS);
    const [yearsToProject, setYearsToProject] = useState(20);
    const [loaded, setLoaded] = useState(false);

    // Load from localStorage
    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                setAssets((prev) => prev.map((a) => ({
                    ...a,
                    value: parsed[a.key] ?? 0,
                })));
            }
        } catch { /* ignore */ }
        setLoaded(true);
        trackCalculatorUsed('savings-dashboard');
    }, []);

    // Save to localStorage
    useEffect(() => {
        if (!loaded) return;
        const data: Record<string, number> = {};
        assets.forEach((a) => { data[a.key] = a.value; });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }, [assets, loaded]);

    const updateAsset = (key: string, value: number) => {
        setAssets((prev) => prev.map((a) => a.key === key ? { ...a, value } : a));
    };

    const totalNetWorth = useMemo(() => assets.reduce((sum, a) => sum + a.value, 0), [assets]);
    const nonZero = useMemo(() => assets.filter((a) => a.value > 0), [assets]);

    // Projected corpus
    const projectedCorpus = useMemo(() => {
        return assets.reduce((sum, a) => {
            if (a.value <= 0) return sum;
            return sum + a.value * Math.pow(1 + a.growthRate / 100, yearsToProject);
        }, 0);
    }, [assets, yearsToProject]);

    // Pie chart segments using CSS conic-gradient
    const pieGradient = useMemo(() => {
        if (totalNetWorth <= 0) return 'conic-gradient(#e5e7eb 0deg 360deg)';
        let cumPercent = 0;
        const stops: string[] = [];
        nonZero.forEach((a) => {
            const pct = (a.value / totalNetWorth) * 100;
            stops.push(`${a.color} ${cumPercent}% ${cumPercent + pct}%`);
            cumPercent += pct;
        });
        return `conic-gradient(${stops.join(', ')})`;
    }, [nonZero, totalNetWorth]);

    return (
        <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
            <div className="text-center mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">📊 My Savings Dashboard</h1>
                <p className="text-[var(--color-text-secondary)]">
                    Track all your savings in one place. No login needed — saved on your device.
                </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Left: Input Form */}
                <div className="lg:col-span-2 p-6 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border)] shadow-sm">
                    <h2 className="font-semibold text-lg mb-4">Enter Your Savings</h2>
                    <div className="grid sm:grid-cols-2 gap-3">
                        {assets.map((a) => (
                            <div key={a.key} className="flex items-center gap-3 p-3 rounded-xl border border-[var(--color-border)] hover:border-blue-300 transition">
                                <span className="text-xl shrink-0">{a.icon}</span>
                                <div className="flex-1 min-w-0">
                                    <label className="block text-xs text-[var(--color-text-light)] mb-0.5">{a.label}</label>
                                    <div className="relative">
                                        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-[var(--color-text-light)]">₹</span>
                                        <input
                                            type="number"
                                            min={0}
                                            value={a.value || ''}
                                            onChange={(e) => updateAsset(a.key, Number(e.target.value) || 0)}
                                            placeholder="0"
                                            className="w-full pl-6 pr-2 py-1.5 text-sm rounded-lg border border-[var(--color-border)] focus:border-blue-400 focus:ring-1 focus:ring-blue-200 outline-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-5 p-4 rounded-xl bg-blue-50 border border-blue-200">
                        <label className="block text-sm font-medium mb-2">
                            Project Growth Over: <strong className="text-blue-700">{yearsToProject} years</strong>
                        </label>
                        <input type="range" min={1} max={40} step={1}
                            value={yearsToProject} onChange={(e) => setYearsToProject(Number(e.target.value))} className="w-full" />
                        <div className="flex justify-between text-xs text-[var(--color-text-light)]"><span>1 yr</span><span>40 yrs</span></div>
                    </div>
                </div>

                {/* Right: Summary */}
                <div className="space-y-4">
                    {/* Net Worth */}
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white text-center">
                        <p className="text-blue-200 text-sm mb-1">Total Net Worth</p>
                        <p className="text-3xl sm:text-4xl font-bold">{formatCurrency(totalNetWorth)}</p>
                    </div>

                    {/* Projected */}
                    <div className="p-5 rounded-2xl bg-gradient-to-br from-green-600 to-emerald-700 text-white text-center">
                        <p className="text-green-200 text-xs mb-1">Projected in {yearsToProject} yrs</p>
                        <p className="text-2xl font-bold">{formatCurrency(Math.round(projectedCorpus))}</p>
                        <p className="text-xs text-green-200 mt-1">
                            {totalNetWorth > 0 ? `${Math.round(((projectedCorpus - totalNetWorth) / totalNetWorth) * 100)}% growth` : '—'}
                        </p>
                    </div>

                    {/* Pie Chart */}
                    <div className="p-5 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border)] shadow-sm">
                        <h3 className="font-semibold text-sm mb-3 text-center">Asset Allocation</h3>
                        <div className="w-36 h-36 mx-auto rounded-full border-4 border-white shadow-lg"
                            style={{ background: pieGradient }} />
                        <div className="mt-4 space-y-1.5">
                            {nonZero.map((a) => (
                                <div key={a.key} className="flex items-center gap-2 text-xs">
                                    <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: a.color }} />
                                    <span className="flex-1 truncate">{a.label}</span>
                                    <span className="font-medium">{Math.round((a.value / totalNetWorth) * 100)}%</span>
                                </div>
                            ))}
                            {nonZero.length === 0 && (
                                <p className="text-center text-xs text-[var(--color-text-light)]">Enter savings to see allocation</p>
                            )}
                        </div>
                    </div>

                    {/* Quick links */}
                    <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-200 text-center">
                        <p className="text-xs text-indigo-700 mb-2 font-medium">Grow your savings</p>
                        <div className="flex flex-wrap gap-2 justify-center">
                            <Link href="/calculators/ppf" className="text-[10px] px-3 py-1.5 bg-white rounded-full border border-indigo-200 text-indigo-700 hover:bg-indigo-100">PPF</Link>
                            <Link href="/calculators/sip" className="text-[10px] px-3 py-1.5 bg-white rounded-full border border-indigo-200 text-indigo-700 hover:bg-indigo-100">SIP</Link>
                            <Link href="/calculators/nps" className="text-[10px] px-3 py-1.5 bg-white rounded-full border border-indigo-200 text-indigo-700 hover:bg-indigo-100">NPS</Link>
                            <Link href="/retirement-score" className="text-[10px] px-3 py-1.5 bg-white rounded-full border border-indigo-200 text-indigo-700 hover:bg-indigo-100">Retirement Score</Link>
                        </div>
                    </div>
                </div>
            </div>

            <p className="text-xs text-[var(--color-text-light)] mt-6 text-center">
                🔒 Your data stays on your device — nothing is sent to any server. Saved automatically.
            </p>
        </div>
    );
}
