'use client';

import { useState, useMemo, useEffect } from 'react';
import { calculateTDS } from '@/lib/calculators';
import { formatCurrency } from '@/lib/constants';
import { trackCalculatorUsed } from '@/lib/analytics';
import CalculatorBackLink from '@/components/CalculatorBackLink';

const INCOME_TYPES = [
    { key: 'salary', label: '💼 Salary', desc: 'Sec 192' },
    { key: 'fd_interest', label: '🏦 FD Interest', desc: 'Sec 194A' },
    { key: 'rent', label: '🏠 Rent', desc: 'Sec 194I' },
    { key: 'freelance', label: '💻 Freelance / Professional', desc: 'Sec 194J' },
    { key: 'commission', label: '🤝 Commission', desc: 'Sec 194H' },
    { key: 'lottery', label: '🎰 Lottery / Winnings', desc: 'Sec 194B' },
    { key: 'property_sale', label: '🏗️ Property Sale', desc: 'Sec 194IA' },
];

export default function TDSCalculator() {
    const [incomeType, setIncomeType] = useState('salary');
    const [amount, setAmount] = useState(800000);
    const [hasPAN, setHasPAN] = useState(true);

    useEffect(() => { trackCalculatorUsed('tds'); }, []);

    const result = useMemo(() => calculateTDS(incomeType, amount, hasPAN), [incomeType, amount, hasPAN]);
    const selectedType = INCOME_TYPES.find(t => t.key === incomeType)!;

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
            <CalculatorBackLink />
            <div className="text-center mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">📋 TDS Calculator</h1>
                <p className="text-[var(--color-text-secondary)]">Calculate Tax Deducted at Source on various income types</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border)] shadow-sm space-y-5">
                    {/* Income Type Selector */}
                    <div>
                        <label className="block text-sm font-medium mb-3">Income Type</label>
                        <div className="grid grid-cols-2 gap-2">
                            {INCOME_TYPES.map((type) => (
                                <button key={type.key} onClick={() => setIncomeType(type.key)}
                                    className={`text-left px-3 py-2.5 rounded-xl text-sm transition border ${incomeType === type.key
                                            ? 'bg-red-50 text-red-800 border-red-300 shadow-sm'
                                            : 'bg-white text-gray-600 border-gray-200 hover:border-red-200'
                                        }`}>
                                    <span className="font-medium">{type.label}</span>
                                    <span className="block text-[10px] text-gray-400 mt-0.5">{type.desc}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Amount: <strong className="text-[var(--color-primary)]">{formatCurrency(amount)}</strong>
                        </label>
                        <input type="range" min={10000} max={10000000} step={10000}
                            value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="w-full" />
                        <div className="flex justify-between text-xs text-[var(--color-text-light)]"><span>₹10K</span><span>₹1Cr</span></div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-200">
                        <label className="text-sm font-medium">PAN Status:</label>
                        <button onClick={() => setHasPAN(true)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${hasPAN ? 'bg-green-600 text-white shadow' : 'bg-white border'}`}>
                            ✅ PAN Available
                        </button>
                        <button onClick={() => setHasPAN(false)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${!hasPAN ? 'bg-red-600 text-white shadow' : 'bg-white border'}`}>
                            ❌ No PAN
                        </button>
                    </div>

                    {!hasPAN && (
                        <div className="p-4 rounded-xl bg-red-50 border border-red-200">
                            <p className="text-xs text-red-700">⚠️ <strong>Without PAN, TDS is deducted at 20%</strong> regardless of income type. Always furnish PAN to avoid higher deduction.</p>
                        </div>
                    )}
                </div>

                <div className="space-y-4">
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-red-600 to-rose-700 text-white text-center">
                        <p className="text-red-100 text-sm mb-1">TDS Deducted</p>
                        <p className="text-3xl sm:text-4xl font-bold">{formatCurrency(result.tdsAmount)}</p>
                        <p className="text-red-200 text-sm mt-1">@ {result.tdsRate}% under Section {result.section}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-center">
                            <p className="text-xs text-blue-600 mb-1">Gross Amount</p>
                            <p className="text-lg font-bold text-blue-800">{formatCurrency(amount)}</p>
                        </div>
                        <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-center">
                            <p className="text-xs text-green-600 mb-1">Net After TDS</p>
                            <p className="text-lg font-bold text-green-800">{formatCurrency(result.netAmount)}</p>
                        </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border)] shadow-sm">
                        <h3 className="font-semibold mb-3">Details</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between py-2 border-b border-[var(--color-border)]">
                                <span className="text-[var(--color-text-secondary)]">Income Type</span>
                                <span className="font-medium">{selectedType.label}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-[var(--color-border)]">
                                <span className="text-[var(--color-text-secondary)]">Section</span>
                                <span className="font-medium">Section {result.section}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-[var(--color-border)]">
                                <span className="text-[var(--color-text-secondary)]">Threshold Limit</span>
                                <span className="font-medium">{result.threshold > 0 ? formatCurrency(result.threshold) : 'N/A'}</span>
                            </div>
                            <div className="flex justify-between py-2">
                                <span className="text-[var(--color-text-secondary)]">PAN Status</span>
                                <span className={`font-medium ${hasPAN ? 'text-green-600' : 'text-red-600'}`}>
                                    {hasPAN ? '✅ Available' : '❌ Not Available'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
