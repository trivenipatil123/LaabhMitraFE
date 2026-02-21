'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { INDIAN_STATES, formatCurrency } from '@/lib/constants';

// ── Hindi constants for eligibility form ──────────
const GENDER_OPTIONS_HI = [
    { value: 'male', label: 'पुरुष', icon: '👨' },
    { value: 'female', label: 'महिला', icon: '👩' },
    { value: 'other', label: 'अन्य', icon: '🧑' },
];

const AREA_OPTIONS_HI = [
    { value: 'urban', label: 'शहरी / नगरीय', icon: '🏙️' },
    { value: 'rural', label: 'ग्रामीण / गाँव', icon: '🌳' },
];

const OCCUPATIONS_HI = [
    { value: 'farmer', label: 'किसान / कृषि श्रमिक', icon: '🌾' },
    { value: 'salaried', label: 'वेतनभोगी कर्मचारी', icon: '💼' },
    { value: 'self_employed', label: 'स्वरोजगार / व्यापारी', icon: '🏪' },
    { value: 'student', label: 'छात्र / विद्यार्थी', icon: '🎓' },
    { value: 'unemployed', label: 'बेरोजगार / गृहिणी', icon: '🏠' },
    { value: 'retired', label: 'सेवानिवृत्त / वरिष्ठ नागरिक', icon: '🧓' },
    { value: 'artisan', label: 'कारीगर / शिल्पकार', icon: '🛠️' },
];

const CATEGORIES_HI = [
    { value: 'general', label: 'सामान्य (General)' },
    { value: 'obc', label: 'OBC (अन्य पिछड़ा वर्ग)' },
    { value: 'sc', label: 'SC (अनुसूचित जाति)' },
    { value: 'st', label: 'ST (अनुसूचित जनजाति)' },
    { value: 'ews', label: 'EWS (आर्थिक रूप से कमजोर)' },
];

interface FormData {
    age: number;
    gender: string;
    state: string;
    area: string;
    income: number;
    occupation: string;
    category: string;
    bpl: boolean;
    married: boolean;
    children: number;
    has_girl_child: boolean;
    girl_child_age: number | null;
    pregnant: boolean;
    owns_home: boolean;
    disability: boolean;
}

const defaultForm: FormData = {
    age: 30,
    gender: 'male',
    state: 'Maharashtra',
    area: 'urban',
    income: 300000,
    occupation: 'salaried',
    category: 'general',
    bpl: false,
    married: false,
    children: 0,
    has_girl_child: false,
    girl_child_age: null,
    pregnant: false,
    owns_home: false,
    disability: false,
};

export default function HindiEligibilityPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [form, setForm] = useState<FormData>(defaultForm);
    const [loading, setLoading] = useState(false);

    const update = <K extends keyof FormData>(key: K, value: FormData[K]) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            sessionStorage.setItem('eligibility_profile', JSON.stringify(form));
            router.push('/hi/eligibility/results');
        } catch {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
            {/* Page header */}
            <div className="text-center mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">अपनी पात्रता जांचें</h1>
                <p className="text-[var(--color-text-secondary)]">
                    कुछ सवालों का जवाब दें और अपने लिए सही सरकारी योजनाएं खोजें
                </p>
            </div>

            {/* Progress bar */}
            <div className="flex items-center gap-2 mb-8">
                {[1, 2, 3].map((s) => (
                    <div key={s} className="flex-1">
                        <div
                            className={`h-2 rounded-full transition-all duration-300 ${s <= step ? 'gradient-bg' : 'bg-gray-200'
                                }`}
                        />
                        <p className="text-xs text-center mt-1 text-[var(--color-text-light)]">
                            {s === 1 ? 'व्यक्तिगत' : s === 2 ? 'आय और कार्य' : 'परिवार'}
                        </p>
                    </div>
                ))}
            </div>

            {/* Step card */}
            <div className="bg-[var(--color-bg-card)] rounded-2xl shadow-md border border-[var(--color-border)] p-6 sm:p-8 fade-in">
                {/* Step 1: Personal Info */}
                {step === 1 && (
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold flex items-center gap-2"><span>👤</span> व्यक्तिगत जानकारी</h2>

                        {/* Age */}
                        <div>
                            <label className="block text-sm font-medium mb-2">आयु: <strong>{form.age} वर्ष</strong></label>
                            <input
                                type="range"
                                min={10}
                                max={100}
                                value={form.age}
                                onChange={(e) => update('age', Number(e.target.value))}
                                className="w-full"
                            />
                            <div className="flex justify-between text-xs text-[var(--color-text-light)]">
                                <span>10</span><span>100</span>
                            </div>
                        </div>

                        {/* Gender */}
                        <div>
                            <label className="block text-sm font-medium mb-2">लिंग</label>
                            <div className="grid grid-cols-3 gap-3">
                                {GENDER_OPTIONS_HI.map((g) => (
                                    <button
                                        key={g.value}
                                        onClick={() => update('gender', g.value)}
                                        className={`p-3 rounded-xl border text-center text-sm font-medium transition-all ${form.gender === g.value
                                            ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5 text-[var(--color-primary)]'
                                            : 'border-[var(--color-border)] hover:border-gray-300'
                                            }`}
                                    >
                                        <span className="text-xl block mb-1">{g.icon}</span>
                                        {g.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* State */}
                        <div>
                            <label className="block text-sm font-medium mb-2">राज्य / केंद्र शासित प्रदेश</label>
                            <select
                                value={form.state}
                                onChange={(e) => update('state', e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-white text-sm focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none"
                            >
                                {INDIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>

                        {/* Area */}
                        <div>
                            <label className="block text-sm font-medium mb-2">क्षेत्र</label>
                            <div className="grid grid-cols-2 gap-3">
                                {AREA_OPTIONS_HI.map((a) => (
                                    <button
                                        key={a.value}
                                        onClick={() => update('area', a.value)}
                                        className={`p-3 rounded-xl border text-center text-sm font-medium transition-all ${form.area === a.value
                                            ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5 text-[var(--color-primary)]'
                                            : 'border-[var(--color-border)] hover:border-gray-300'
                                            }`}
                                    >
                                        <span className="text-xl block mb-1">{a.icon}</span>
                                        {a.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Social Category */}
                        <div>
                            <label className="block text-sm font-medium mb-2">सामाजिक वर्ग</label>
                            <select
                                value={form.category}
                                onChange={(e) => update('category', e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-white text-sm focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none"
                            >
                                {CATEGORIES_HI.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                            </select>
                        </div>
                    </div>
                )}

                {/* Step 2: Financial Info */}
                {step === 2 && (
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold flex items-center gap-2"><span>💼</span> आय और व्यवसाय</h2>

                        {/* Occupation */}
                        <div>
                            <label className="block text-sm font-medium mb-2">व्यवसाय</label>
                            <div className="grid grid-cols-2 gap-3">
                                {OCCUPATIONS_HI.map((o) => (
                                    <button
                                        key={o.value}
                                        onClick={() => update('occupation', o.value)}
                                        className={`p-3 rounded-xl border text-left text-sm font-medium transition-all flex items-center gap-2 ${form.occupation === o.value
                                            ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5 text-[var(--color-primary)]'
                                            : 'border-[var(--color-border)] hover:border-gray-300'
                                            }`}
                                    >
                                        <span className="text-xl">{o.icon}</span>
                                        <span className="truncate">{o.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Annual Income */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                वार्षिक पारिवारिक आय: <strong>{formatCurrency(form.income)}</strong>
                            </label>
                            <input
                                type="range"
                                min={0}
                                max={2500000}
                                step={10000}
                                value={form.income}
                                onChange={(e) => update('income', Number(e.target.value))}
                                className="w-full"
                            />
                            <div className="flex justify-between text-xs text-[var(--color-text-light)]">
                                <span>₹0</span><span>₹25 लाख+</span>
                            </div>
                        </div>

                        {/* BPL */}
                        <label className="flex items-center gap-3 p-4 rounded-xl border border-[var(--color-border)] cursor-pointer hover:bg-gray-50 transition">
                            <input
                                type="checkbox"
                                checked={form.bpl}
                                onChange={(e) => update('bpl', e.target.checked)}
                                className="w-5 h-5 rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                            />
                            <div>
                                <span className="text-sm font-medium">BPL कार्ड धारक</span>
                                <p className="text-xs text-[var(--color-text-light)]">क्या आपके पास गरीबी रेखा से नीचे (BPL) कार्ड है?</p>
                            </div>
                        </label>

                        {/* Disability */}
                        <label className="flex items-center gap-3 p-4 rounded-xl border border-[var(--color-border)] cursor-pointer hover:bg-gray-50 transition">
                            <input
                                type="checkbox"
                                checked={form.disability}
                                onChange={(e) => update('disability', e.target.checked)}
                                className="w-5 h-5 rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                            />
                            <div>
                                <span className="text-sm font-medium">दिव्यांग व्यक्ति</span>
                                <p className="text-xs text-[var(--color-text-light)]">दिव्यांगता प्रमाणपत्र (PwD) धारक</p>
                            </div>
                        </label>
                    </div>
                )}

                {/* Step 3: Family */}
                {step === 3 && (
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold flex items-center gap-2"><span>👨‍👩‍👧</span> परिवार की जानकारी</h2>

                        {/* Married */}
                        <label className="flex items-center gap-3 p-4 rounded-xl border border-[var(--color-border)] cursor-pointer hover:bg-gray-50 transition">
                            <input
                                type="checkbox"
                                checked={form.married}
                                onChange={(e) => {
                                    const isMarried = e.target.checked;
                                    update('married', isMarried);
                                    if (!isMarried) {
                                        setForm((prev) => ({
                                            ...prev,
                                            married: false,
                                            children: 0,
                                            has_girl_child: false,
                                            girl_child_age: null,
                                            pregnant: false,
                                        }));
                                    }
                                }}
                                className="w-5 h-5 rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                            />
                            <span className="text-sm font-medium">विवाहित</span>
                        </label>

                        {/* Children — only when married */}
                        {form.married && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium mb-2">बच्चों की संख्या: <strong>{form.children}</strong></label>
                                    <input
                                        type="range"
                                        min={0}
                                        max={10}
                                        value={form.children}
                                        onChange={(e) => update('children', Number(e.target.value))}
                                        className="w-full"
                                    />
                                </div>

                                {/* Girl Child — only when has children */}
                                {form.children > 0 && (
                                    <>
                                        <label className="flex items-center gap-3 p-4 rounded-xl border border-[var(--color-border)] cursor-pointer hover:bg-gray-50 transition">
                                            <input
                                                type="checkbox"
                                                checked={form.has_girl_child}
                                                onChange={(e) => {
                                                    update('has_girl_child', e.target.checked);
                                                    if (!e.target.checked) {
                                                        update('girl_child_age', null);
                                                    }
                                                }}
                                                className="w-5 h-5 rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                                            />
                                            <div>
                                                <span className="text-sm font-medium">बेटी है</span>
                                                <p className="text-xs text-[var(--color-text-light)]">सुकन्या समृद्धि और बेटी योजनाओं के लिए</p>
                                            </div>
                                        </label>

                                        {form.has_girl_child && (
                                            <div className="ml-8">
                                                <label className="block text-sm font-medium mb-2">
                                                    बेटी की आयु: <strong>{form.girl_child_age ?? 0} वर्ष</strong>
                                                </label>
                                                <input
                                                    type="range"
                                                    min={0}
                                                    max={18}
                                                    value={form.girl_child_age ?? 0}
                                                    onChange={(e) => update('girl_child_age', Number(e.target.value))}
                                                    className="w-full"
                                                />
                                            </div>
                                        )}
                                    </>
                                )}

                                {/* Pregnant — only when married AND female */}
                                {form.gender === 'female' && (
                                    <label className="flex items-center gap-3 p-4 rounded-xl border border-[var(--color-border)] cursor-pointer hover:bg-gray-50 transition">
                                        <input
                                            type="checkbox"
                                            checked={form.pregnant}
                                            onChange={(e) => update('pregnant', e.target.checked)}
                                            className="w-5 h-5 rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                                        />
                                        <span className="text-sm font-medium">वर्तमान में गर्भवती / स्तनपान कराने वाली</span>
                                    </label>
                                )}
                            </>
                        )}

                        {/* Own Home */}
                        <label className="flex items-center gap-3 p-4 rounded-xl border border-[var(--color-border)] cursor-pointer hover:bg-gray-50 transition">
                            <input
                                type="checkbox"
                                checked={form.owns_home}
                                onChange={(e) => update('owns_home', e.target.checked)}
                                className="w-5 h-5 rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                            />
                            <div>
                                <span className="text-sm font-medium">पक्का मकान है</span>
                                <p className="text-xs text-[var(--color-text-light)]">क्या आपके पास पहले से स्थायी मकान है?</p>
                            </div>
                        </label>
                    </div>
                )}

                {/* Navigation buttons */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-[var(--color-border)]">
                    {step > 1 ? (
                        <button
                            onClick={() => setStep(step - 1)}
                            className="px-6 py-2.5 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text)] rounded-xl border border-[var(--color-border)] hover:border-gray-300 transition"
                        >
                            ← पीछे
                        </button>
                    ) : (
                        <div />
                    )}

                    {step < 3 ? (
                        <button
                            onClick={() => setStep(step + 1)}
                            className="px-6 py-2.5 text-sm font-medium text-white gradient-bg rounded-xl shadow-sm hover:shadow-md transition-all"
                        >
                            आगे →
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="px-8 py-3 text-sm font-semibold text-white gradient-bg rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-2 disabled:opacity-60"
                        >
                            {loading ? (
                                <><span className="animate-spin">⏳</span> जांच हो रही है...</>
                            ) : (
                                <><span>✅</span> पात्रता जांचें</>
                            )}
                        </button>
                    )}
                </div>
            </div>

            {/* Trust badges */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-[var(--color-text-light)]">
                <span>🔒 डेटा सुरक्षित</span>
                <span>🆓 100% मुफ्त</span>
                <span>⚡ तुरंत परिणाम</span>
            </div>
        </div>
    );
}
