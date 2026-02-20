'use client';

import { useEffect, useState, useCallback } from 'react';
import { calculatorsApi } from '@/lib/api';
import { formatCurrency } from '@/lib/constants';
import { trackCalculatorUsed } from '@/lib/analytics';

interface FDRate {
    bank_name: string;
    bank_icon: string;
    tenure_months: number;
    rate: number;
    senior_citizen_rate?: number;
    min_amount: number;
    maturity_amount: number;
    interest_earned: number;
}

interface FDCompareResponse {
    results: FDRate[];
    amount: number;
    tenure_months: number;
    is_senior: boolean;
}

const TENURE_OPTIONS = [
    { value: 12, label: '1 Year' },
    { value: 24, label: '2 Years' },
    { value: 36, label: '3 Years' },
    { value: 60, label: '5 Years' },
];

export default function FDComparePage() {
    const [amount, setAmount] = useState(100000);
    const [tenure, setTenure] = useState(12);
    const [senior, setSenior] = useState(false);
    const [data, setData] = useState<FDCompareResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchRates = useCallback(() => {
        setLoading(true);
        setError(null);
        calculatorsApi.fdCompare({
            amount: String(amount),
            tenure_months: String(tenure),
            senior: senior ? 'true' : 'false',
        })
            .then((res) => setData(res as FDCompareResponse))
            .catch((err) => setError(err?.message || 'Failed to fetch FD rates'))
            .finally(() => setLoading(false));
    }, [amount, tenure, senior]);

    useEffect(() => { fetchRates(); }, [fetchRates]);
    useEffect(() => { trackCalculatorUsed('fd-compare'); }, []);

    const bestRate = data?.results?.[0]?.rate ?? 0;
    const tenureLabel = TENURE_OPTIONS.find(t => t.value === tenure)?.label || `${tenure}m`;

    return (
        <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
            <div className="text-center mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">🏦 FD Rate Comparison</h1>
                <p className="text-[var(--color-text-secondary)]">Compare fixed deposit rates across major banks — find the best returns</p>
            </div>

            {/* Controls — single row layout */}
            <div className="p-5 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border)] shadow-sm mb-6 space-y-5">
                {/* Amount slider - full width */}
                <div>
                    <label className="block text-sm font-medium mb-2">
                        Investment Amount: <strong className="text-[var(--color-primary)]">{formatCurrency(amount)}</strong>
                    </label>
                    <input type="range" min={10000} max={10000000} step={10000}
                        value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="w-full" />
                    <div className="flex justify-between text-xs text-[var(--color-text-light)]"><span>₹10K</span><span>₹1Cr</span></div>
                </div>

                {/* Tenure + Senior in one row */}
                <div className="flex flex-wrap items-center gap-3">
                    <span className="text-sm font-medium mr-1">Tenure:</span>
                    {TENURE_OPTIONS.map((opt) => (
                        <button key={opt.value} onClick={() => setTenure(opt.value)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition border ${tenure === opt.value
                                    ? 'bg-blue-600 text-white border-blue-600 shadow'
                                    : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300'
                                }`}>
                            {opt.label}
                        </button>
                    ))}

                    <span className="mx-1 text-gray-300 hidden sm:inline">|</span>

                    <button onClick={() => setSenior(!senior)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition border flex items-center gap-1.5 ${senior
                                ? 'bg-amber-500 text-white border-amber-500 shadow'
                                : 'bg-white text-gray-600 border-gray-200 hover:border-amber-300'
                            }`}>
                        {senior ? '✅' : '👤'} Senior Citizen
                    </button>
                </div>
            </div>

            {/* Results */}
            {loading ? (
                <div className="space-y-3">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="skeleton h-16 rounded-xl" />
                    ))}
                </div>
            ) : error ? (
                <div className="text-center py-12 text-[var(--color-text-secondary)]">
                    <p className="text-red-500">{error}</p>
                    <button onClick={fetchRates} className="mt-4 px-6 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700">Retry</button>
                </div>
            ) : data?.results && data.results.length > 0 ? (
                <>
                    {/* Best Rate Banner */}
                    <div className="p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 mb-5 flex items-center justify-between gap-3">
                        <p className="text-sm text-green-700">
                            🏆 <strong>Best:</strong> {bestRate.toFixed(2)}% by {data.results[0].bank_icon} <strong>{data.results[0].bank_name}</strong>
                            {' '}for {tenureLabel} {senior && '(Sr. Citizen)'}
                        </p>
                        <p className="text-lg font-bold text-green-800 whitespace-nowrap">{formatCurrency(data.results[0].maturity_amount)}</p>
                    </div>

                    {/* Compact Ranked List */}
                    <div className="rounded-2xl border border-[var(--color-border)] shadow-sm overflow-hidden">
                        {data.results.map((rate: FDRate, i: number) => {
                            const isBest = i === 0;
                            const barWidth = bestRate > 0 ? Math.max(40, (rate.rate / bestRate) * 100) : 100;
                            return (
                                <div key={`${rate.bank_name}-${i}`}
                                    className={`flex items-center gap-3 sm:gap-4 px-4 py-3 border-b border-[var(--color-border)] last:border-b-0 transition hover:bg-gray-50/50 ${isBest ? 'bg-green-50/70' : ''
                                        }`}>
                                    {/* Rank */}
                                    <span className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold shrink-0 ${isBest ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-500'
                                        }`}>
                                        {i + 1}
                                    </span>

                                    {/* Bank */}
                                    <div className="w-28 sm:w-36 shrink-0">
                                        <p className="font-semibold text-sm truncate">{rate.bank_icon} {rate.bank_name}</p>
                                        <p className="text-[10px] text-[var(--color-text-light)]">Min {formatCurrency(rate.min_amount)}</p>
                                    </div>

                                    {/* Rate Bar */}
                                    <div className="flex-1 min-w-0 hidden sm:block">
                                        <div className="h-5 bg-gray-100 rounded-full overflow-hidden">
                                            <div className={`h-full rounded-full transition-all duration-500 flex items-center justify-end pr-2 ${isBest ? 'bg-gradient-to-r from-green-400 to-green-500' : 'bg-gradient-to-r from-blue-200 to-blue-400'
                                                }`} style={{ width: `${barWidth}%` }}>
                                                <span className="text-[10px] font-bold text-white whitespace-nowrap">{rate.rate.toFixed(2)}%</span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Rate (mobile) */}
                                    <span className="sm:hidden text-sm font-bold text-blue-700">{rate.rate.toFixed(2)}%</span>

                                    {/* Interest */}
                                    <div className="text-right shrink-0 w-20 sm:w-24">
                                        <p className="text-xs text-green-700 font-semibold">+{formatCurrency(rate.interest_earned)}</p>
                                        <p className="text-[10px] text-[var(--color-text-light)]">interest</p>
                                    </div>

                                    {/* Maturity */}
                                    <div className="text-right shrink-0 w-24 sm:w-28">
                                        <p className="text-sm font-bold">{formatCurrency(rate.maturity_amount)}</p>
                                        <p className="text-[10px] text-[var(--color-text-light)]">{tenureLabel}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Footnote */}
                    <p className="text-xs text-[var(--color-text-light)] mt-3 text-center">
                        Rates as of Feb 2026. Interest calculated using simple interest for comparison. Actual returns may vary with compounding.
                    </p>
                </>
            ) : (
                <div className="text-center py-12 text-[var(--color-text-secondary)]">
                    <p>No FD rates found for this tenure. Try a different duration.</p>
                    <p className="text-sm mt-1">Available: 1 Year, 2 Years, 3 Years, 5 Years</p>
                </div>
            )}
        </div>
    );
}
