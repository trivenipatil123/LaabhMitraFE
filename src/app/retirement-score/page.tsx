'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { formatCurrency } from '@/lib/constants';
import { trackCalculatorUsed } from '@/lib/analytics';

interface Recommendation {
    icon: string;
    title: string;
    description: string;
    link: string;
    linkLabel: string;
    priority: 'high' | 'medium' | 'low';
}

function computeScore(
    age: number,
    monthlySalary: number,
    monthlyExpenses: number,
    totalSavings: number,
    monthlySaving: number,
    hasEPF: boolean,
    hasNPS: boolean,
    hasPPF: boolean,
    hasInsurance: boolean,
) {
    const retireAge = 60;
    const yearsLeft = Math.max(retireAge - age, 1);
    const inflation = 0.06;
    const growthRate = 0.10;

    // Future monthly expenses at retirement (inflation adjusted)
    const futureMonthlyExpense = monthlyExpenses * Math.pow(1 + inflation, yearsLeft);
    // Corpus needed for 25 years post-retirement (4% rule)
    const corpusNeeded = futureMonthlyExpense * 12 * 25;
    // Projected corpus from current savings + future monthly savings
    const futureFromSavings = totalSavings * Math.pow(1 + growthRate, yearsLeft);
    const futureFromMonthlySavings = monthlySaving * ((Math.pow(1 + growthRate / 12, yearsLeft * 12) - 1) / (growthRate / 12));
    const projectedCorpus = futureFromSavings + futureFromMonthlySavings;

    // Base score from corpus coverage
    let coverageRatio = Math.min(projectedCorpus / corpusNeeded, 1.5);
    let score = Math.round(coverageRatio * 60); // max 90 from coverage

    // Bonuses for good habits
    if (hasEPF) score += 8;
    if (hasNPS) score += 8;
    if (hasPPF) score += 7;
    if (hasInsurance) score += 7;

    // Savings rate bonus
    const savingsRate = monthlySalary > 0 ? (monthlySaving / monthlySalary) * 100 : 0;
    if (savingsRate >= 30) score += 5;
    else if (savingsRate >= 20) score += 3;

    // Age penalty — starting late
    if (age > 45 && coverageRatio < 0.5) score -= 5;

    score = Math.max(0, Math.min(100, score));

    // Recommendations
    const recommendations: Recommendation[] = [];

    if (!hasNPS) {
        recommendations.push({
            icon: '🏦', title: 'Start NPS', priority: 'high',
            description: 'Get ₹50,000 extra tax deduction under 80CCD(1B). Builds retirement corpus.',
            link: '/calculators/nps', linkLabel: 'NPS Calculator',
        });
    }
    if (!hasPPF) {
        recommendations.push({
            icon: '🏛️', title: 'Open PPF Account', priority: 'high',
            description: 'Tax-free returns at 7.1%. Completely safe, government-backed.',
            link: '/calculators/ppf', linkLabel: 'PPF Calculator',
        });
    }
    if (!hasEPF && monthlySalary > 0) {
        recommendations.push({
            icon: '🏢', title: 'Maximize EPF', priority: 'medium',
            description: 'VPF (Voluntary PF) lets you contribute more than 12% for higher corpus.',
            link: '/calculators/epf', linkLabel: 'EPF Calculator',
        });
    }
    if (savingsRate < 20) {
        recommendations.push({
            icon: '📈', title: 'Increase Savings to 20%+', priority: 'high',
            description: `You're saving ${savingsRate.toFixed(0)}% of income. Target 20%+ for a comfortable retirement.`,
            link: '/savings-dashboard', linkLabel: 'Savings Dashboard',
        });
    }
    if (!hasInsurance) {
        recommendations.push({
            icon: '🛡️', title: 'Get Term Insurance', priority: 'high',
            description: 'Protect your family with term life cover of 10-15x annual income.',
            link: '/schemes', linkLabel: 'View Insurance Schemes',
        });
    }
    if (monthlySaving > 0 && !hasNPS && !hasPPF) {
        recommendations.push({
            icon: '💎', title: 'Start SIP in Mutual Funds', priority: 'medium',
            description: 'SIP in index fund for 12-15% long-term returns. Start with ₹5,000/month.',
            link: '/calculators/sip', linkLabel: 'SIP Calculator',
        });
    }

    return {
        score,
        corpusNeeded: Math.round(corpusNeeded),
        projectedCorpus: Math.round(projectedCorpus),
        gap: Math.max(0, Math.round(corpusNeeded - projectedCorpus)),
        savingsRate: Math.round(savingsRate),
        futureMonthlyExpense: Math.round(futureMonthlyExpense),
        recommendations: recommendations.sort((a, b) => {
            const p = { high: 0, medium: 1, low: 2 };
            return p[a.priority] - p[b.priority];
        }),
    };
}

function ScoreGauge({ score }: { score: number }) {
    const color = score >= 70 ? '#16A34A' : score >= 40 ? '#D97706' : '#DC2626';
    const label = score >= 70 ? 'Great!' : score >= 40 ? 'Needs Work' : 'At Risk';
    const circumference = 2 * Math.PI * 80;
    const dashOffset = circumference - (score / 100) * circumference;

    return (
        <div className="relative w-48 h-48 mx-auto">
            <svg className="w-48 h-48 -rotate-90" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="80" fill="none" stroke="#e5e7eb" strokeWidth="16" />
                <circle cx="100" cy="100" r="80" fill="none" stroke={color} strokeWidth="16"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={dashOffset}
                    className="transition-all duration-1000 ease-out"
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold" style={{ color }}>{score}</span>
                <span className="text-xs font-medium text-[var(--color-text-light)]">/100</span>
                <span className="text-sm font-semibold mt-1" style={{ color }}>{label}</span>
            </div>
        </div>
    );
}

export default function RetirementScore() {
    const [age, setAge] = useState(30);
    const [salary, setSalary] = useState(60000);
    const [expenses, setExpenses] = useState(35000);
    const [savings, setSavings] = useState(500000);
    const [monthlySaving, setMonthlySaving] = useState(15000);
    const [hasEPF, setHasEPF] = useState(true);
    const [hasNPS, setHasNPS] = useState(false);
    const [hasPPF, setHasPPF] = useState(false);
    const [hasInsurance, setHasInsurance] = useState(false);
    const [showResults, setShowResults] = useState(false);

    useEffect(() => { trackCalculatorUsed('retirement-score'); }, []);

    const result = useMemo(() =>
        computeScore(age, salary, expenses, savings, monthlySaving, hasEPF, hasNPS, hasPPF, hasInsurance),
        [age, salary, expenses, savings, monthlySaving, hasEPF, hasNPS, hasPPF, hasInsurance]
    );

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
            <div className="text-center mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">🎯 Retirement Readiness Score</h1>
                <p className="text-[var(--color-text-secondary)]">How prepared are you for retirement? Find out in 60 seconds.</p>
            </div>

            {!showResults ? (
                <div className="max-w-2xl mx-auto">
                    <div className="p-6 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border)] shadow-sm space-y-5">
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Your Age: <strong className="text-[var(--color-primary)]">{age} years</strong>
                            </label>
                            <input type="range" min={18} max={58} value={age} onChange={(e) => setAge(Number(e.target.value))} className="w-full" />
                            <div className="flex justify-between text-xs text-[var(--color-text-light)]"><span>18</span><span>58</span></div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Monthly Salary: <strong className="text-[var(--color-primary)]">{formatCurrency(salary)}</strong>
                                </label>
                                <input type="range" min={10000} max={500000} step={5000} value={salary} onChange={(e) => setSalary(Number(e.target.value))} className="w-full" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Monthly Expenses: <strong className="text-[var(--color-primary)]">{formatCurrency(expenses)}</strong>
                                </label>
                                <input type="range" min={5000} max={300000} step={5000} value={expenses} onChange={(e) => setExpenses(Number(e.target.value))} className="w-full" />
                            </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Total Savings: <strong className="text-[var(--color-primary)]">{formatCurrency(savings)}</strong>
                                </label>
                                <input type="range" min={0} max={20000000} step={50000} value={savings} onChange={(e) => setSavings(Number(e.target.value))} className="w-full" />
                                <div className="flex justify-between text-xs text-[var(--color-text-light)]"><span>₹0</span><span>₹2Cr</span></div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Monthly Savings: <strong className="text-[var(--color-primary)]">{formatCurrency(monthlySaving)}</strong>
                                </label>
                                <input type="range" min={0} max={200000} step={1000} value={monthlySaving} onChange={(e) => setMonthlySaving(Number(e.target.value))} className="w-full" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-3">Do you have these? (check all that apply)</label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                {[
                                    { key: 'epf', label: '🏢 EPF/PF', value: hasEPF, set: setHasEPF },
                                    { key: 'nps', label: '🏦 NPS', value: hasNPS, set: setHasNPS },
                                    { key: 'ppf', label: '🏛️ PPF', value: hasPPF, set: setHasPPF },
                                    { key: 'ins', label: '🛡️ Insurance', value: hasInsurance, set: setHasInsurance },
                                ].map((item) => (
                                    <button key={item.key} onClick={() => item.set(!item.value)}
                                        className={`px-3 py-2.5 rounded-xl text-sm font-medium transition border ${item.value
                                                ? 'bg-green-50 text-green-800 border-green-300'
                                                : 'bg-white text-gray-500 border-gray-200 hover:border-green-300'
                                            }`}>
                                        {item.value ? '✅ ' : ''}{item.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={() => setShowResults(true)}
                            className="w-full py-3.5 rounded-xl gradient-bg text-white font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
                        >
                            🎯 Calculate My Score
                        </button>
                    </div>
                </div>
            ) : (
                <div className="space-y-6">
                    {/* Score Card */}
                    <div className="p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-[var(--color-border)] shadow-lg text-center">
                        <ScoreGauge score={result.score} />
                        <p className="text-sm text-[var(--color-text-secondary)] mt-4">
                            {result.score >= 70 ? 'You\'re on the right track! Keep going.' :
                                result.score >= 40 ? 'You have some work to do. Follow the recommendations below.' :
                                    'Urgent action needed! Start investing now to secure your retirement.'}
                        </p>
                    </div>

                    {/* Key Metrics */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-center">
                            <p className="text-[10px] text-blue-600 mb-1">Corpus Needed</p>
                            <p className="text-lg font-bold text-blue-800">{formatCurrency(result.corpusNeeded)}</p>
                        </div>
                        <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-center">
                            <p className="text-[10px] text-green-600 mb-1">Projected Corpus</p>
                            <p className="text-lg font-bold text-green-800">{formatCurrency(result.projectedCorpus)}</p>
                        </div>
                        <div className={`p-4 rounded-xl text-center ${result.gap > 0 ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'}`}>
                            <p className={`text-[10px] ${result.gap > 0 ? 'text-red-600' : 'text-green-600'} mb-1`}>
                                {result.gap > 0 ? 'Shortfall' : 'Surplus'}
                            </p>
                            <p className={`text-lg font-bold ${result.gap > 0 ? 'text-red-800' : 'text-green-800'}`}>{formatCurrency(result.gap)}</p>
                        </div>
                        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-center">
                            <p className="text-[10px] text-amber-600 mb-1">Savings Rate</p>
                            <p className="text-lg font-bold text-amber-800">{result.savingsRate}%</p>
                        </div>
                    </div>

                    {/* Recommendations */}
                    {result.recommendations.length > 0 && (
                        <div className="p-6 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border)] shadow-sm">
                            <h3 className="font-semibold text-lg mb-4">💡 Recommendations to Improve Your Score</h3>
                            <div className="space-y-3">
                                {result.recommendations.map((rec, i) => (
                                    <div key={i} className={`p-4 rounded-xl border flex items-start gap-3 ${rec.priority === 'high' ? 'bg-red-50 border-red-200' :
                                            'bg-amber-50 border-amber-200'
                                        }`}>
                                        <span className="text-xl shrink-0 mt-0.5">{rec.icon}</span>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <h4 className="font-semibold text-sm">{rec.title}</h4>
                                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${rec.priority === 'high' ? 'bg-red-200 text-red-700' : 'bg-amber-200 text-amber-700'
                                                    }`}>{rec.priority.toUpperCase()}</span>
                                            </div>
                                            <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">{rec.description}</p>
                                            <Link href={rec.link} className="text-xs text-[var(--color-primary)] font-medium hover:underline mt-1 inline-block">
                                                {rec.linkLabel} →
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Re-calculate */}
                    <div className="text-center">
                        <button onClick={() => setShowResults(false)}
                            className="px-6 py-2.5 rounded-xl border border-[var(--color-border)] text-sm font-medium hover:bg-gray-50 transition">
                            ← Edit My Details
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
