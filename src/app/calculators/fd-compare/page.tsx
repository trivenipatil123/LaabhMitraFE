'use client';

import { useEffect, useState } from 'react';
import { calculatorsApi } from '@/lib/api';
import { formatCurrency } from '@/lib/constants';

interface FDRate {
    bank_name: string;
    bank_icon: string;
    tenure_months: number;
    rate: number;
    senior_citizen_rate: number;
    min_amount: number;
    maturity_amount: number;
    interest_earned: number;
}

interface FDCompareResponse {
    rates: FDRate[];
    amount: number;
    tenure_months: number;
    is_senior: boolean;
}

export default function FDComparePage() {
    const [amount, setAmount] = useState(100000);
    const [tenure, setTenure] = useState(12);
    const [senior, setSenior] = useState(false);
    const [data, setData] = useState<FDCompareResponse | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        calculatorsApi.fdCompare({
            amount: String(amount),
            tenure_months: String(tenure),
            senior: String(senior),
        })
            .then((res) => setData(res as FDCompareResponse))
            .catch(() => { })
            .finally(() => setLoading(false));
    }, [amount, tenure, senior]);

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
            <div className="text-center mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">🏦 FD Rate Comparison</h1>
                <p className="text-[var(--color-text-secondary)]">Compare fixed deposit rates across major banks</p>
            </div>

            {/* Controls */}
            <div className="p-6 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border)] shadow-sm mb-6 space-y-4">
                <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Amount: <strong className="text-[var(--color-primary)]">{formatCurrency(amount)}</strong>
                        </label>
                        <input type="range" min={10000} max={10000000} step={10000}
                            value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="w-full" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Tenure: <strong className="text-[var(--color-primary)]">{tenure} months</strong>
                        </label>
                        <input type="range" min={6} max={120} step={6}
                            value={tenure} onChange={(e) => setTenure(Number(e.target.value))} className="w-full" />
                    </div>
                    <div className="flex items-center">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" checked={senior} onChange={(e) => setSenior(e.target.checked)}
                                className="w-5 h-5 rounded" />
                            <span className="text-sm font-medium">Senior Citizen (60+)</span>
                        </label>
                    </div>
                </div>
            </div>

            {/* Results table */}
            {loading ? (
                <div className="space-y-3">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="skeleton h-16 rounded-xl" />
                    ))}
                </div>
            ) : data?.rates && data.rates.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-[var(--color-border)]">
                                <th className="text-left py-3 px-4 font-semibold">Bank</th>
                                <th className="text-right py-3 px-4 font-semibold">Rate</th>
                                <th className="text-right py-3 px-4 font-semibold">Interest</th>
                                <th className="text-right py-3 px-4 font-semibold">Maturity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.rates.map((rate, i) => (
                                <tr key={`${rate.bank_name}-${i}`}
                                    className={`border-b border-[var(--color-border)] ${i === 0 ? 'bg-green-50' : ''}`}>
                                    <td className="py-3 px-4">
                                        <span className="font-medium">{rate.bank_icon} {rate.bank_name}</span>
                                        {i === 0 && <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-green-200 text-green-800">Best</span>}
                                    </td>
                                    <td className="text-right py-3 px-4 font-bold text-[var(--color-primary)]">
                                        {(senior ? rate.senior_citizen_rate : rate.rate).toFixed(2)}%
                                    </td>
                                    <td className="text-right py-3 px-4">{formatCurrency(rate.interest_earned || 0)}</td>
                                    <td className="text-right py-3 px-4 font-medium">{formatCurrency(rate.maturity_amount || 0)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="text-center py-12 text-[var(--color-text-secondary)]">
                    <p>FD rate comparison requires the backend to be running.</p>
                    <p className="text-sm mt-1">Start the backend: <code className="bg-gray-100 px-2 py-1 rounded">uvicorn app.main:app --reload</code></p>
                </div>
            )}
        </div>
    );
}
