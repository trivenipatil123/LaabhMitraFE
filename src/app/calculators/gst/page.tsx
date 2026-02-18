'use client';

import { useState, useMemo, useEffect } from 'react';
import { calculateGST } from '@/lib/calculators';
import { formatCurrency } from '@/lib/constants';
import { trackCalculatorUsed } from '@/lib/analytics';

const GST_RATES = [5, 12, 18, 28];

export default function GSTCalculator() {
    const [amount, setAmount] = useState(10000);
    const [rate, setRate] = useState(18);
    const [type, setType] = useState<'exclusive' | 'inclusive'>('exclusive');

    useEffect(() => { trackCalculatorUsed('gst'); }, []);

    const result = useMemo(() => calculateGST(amount, rate, type), [amount, rate, type]);

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
            <div className="text-center mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">🧾 GST Calculator</h1>
                <p className="text-[var(--color-text-secondary)]">Calculate GST — inclusive and exclusive modes</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border)] shadow-sm space-y-6">
                    {/* Type toggle */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Calculation Type</label>
                        <div className="grid grid-cols-2 gap-3">
                            {(['exclusive', 'inclusive'] as const).map((t) => (
                                <button key={t} onClick={() => setType(t)}
                                    className={`p-3 rounded-xl border text-sm font-medium text-center transition-all capitalize ${type === t ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5 text-[var(--color-primary)]' : 'border-[var(--color-border)]'
                                        }`}
                                >
                                    {t === 'exclusive' ? 'Add GST to amount' : 'GST included in amount'}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Amount */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Amount: <strong>{formatCurrency(amount)}</strong></label>
                        <input type="range" min={100} max={1000000} step={100}
                            value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="w-full" />
                    </div>

                    {/* Rate */}
                    <div>
                        <label className="block text-sm font-medium mb-2">GST Rate</label>
                        <div className="grid grid-cols-4 gap-2">
                            {GST_RATES.map((r) => (
                                <button key={r} onClick={() => setRate(r)}
                                    className={`p-3 rounded-xl border text-sm font-bold transition-all ${rate === r ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5 text-[var(--color-primary)]' : 'border-[var(--color-border)]'
                                        }`}
                                >
                                    {r}%
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Results */}
                <div className="space-y-4">
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white text-center">
                        <p className="text-amber-100 text-sm mb-1">Total Amount</p>
                        <p className="text-3xl sm:text-4xl font-bold">{formatCurrency(result.total)}</p>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        <div className="p-3 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] text-center">
                            <p className="text-xs text-[var(--color-text-light)] mb-1">Original</p>
                            <p className="font-bold">{formatCurrency(result.original)}</p>
                        </div>
                        <div className="p-3 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] text-center">
                            <p className="text-xs text-[var(--color-text-light)] mb-1">CGST ({rate / 2}%)</p>
                            <p className="font-bold">{formatCurrency(result.cgst)}</p>
                        </div>
                        <div className="p-3 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] text-center">
                            <p className="text-xs text-[var(--color-text-light)] mb-1">SGST ({rate / 2}%)</p>
                            <p className="font-bold">{formatCurrency(result.sgst)}</p>
                        </div>
                    </div>

                    <div className="p-4 rounded-xl bg-orange-50 border border-orange-200 text-center">
                        <p className="text-xs text-orange-600 mb-1">Total GST ({rate}%)</p>
                        <p className="text-xl font-bold text-orange-800">{formatCurrency(result.gst)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
