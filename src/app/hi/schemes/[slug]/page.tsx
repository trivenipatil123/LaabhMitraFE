'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { schemesApi } from '@/lib/api';
import { formatCurrency } from '@/lib/constants';

interface HowToApplyStep {
    step: number;
    text: string;
}

interface SchemeDetail {
    id: number;
    name: string;
    name_hi: string | null;
    slug: string;
    description: string;
    description_hi: string | null;
    benefit_summary: string;
    benefit_summary_hi: string | null;
    benefit_value: number;
    benefit_type: string;
    ministry: string;
    official_url: string;
    application_url: string;
    helpline: string;
    eligibility_rules: Record<string, unknown>;
    documents_required: string[];
    how_to_apply: HowToApplyStep[];
    how_to_apply_hi: HowToApplyStep[] | null;
    is_always_open: boolean;
    deadline: string;
    scope: string;
    state: string;
    category_name: string;
    category_icon: string;
    meta_title_hi: string | null;
    meta_description_hi: string | null;
}

// ── Hindi translation maps for eligibility values ──────────
const GENDER_HI: Record<string, string> = {
    female: 'महिला', male: 'पुरुष', transgender: 'ट्रांसजेंडर', all: 'सभी',
};
const OCCUPATION_HI: Record<string, string> = {
    farmer: 'किसान', student: 'छात्र', 'self-employed': 'स्वरोजगार', unemployed: 'बेरोजगार',
    labourer: 'मजदूर', artisan: 'कारीगर', vendor: 'विक्रेता', 'street-vendor': 'रेहड़ी-पटरी विक्रेता',
    worker: 'कामगार', entrepreneur: 'उद्यमी', fisherman: 'मछुआरा', any: 'कोई भी',
};
const CASTE_HI: Record<string, string> = {
    SC: 'अनुसूचित जाति (SC)', ST: 'अनुसूचित जनजाति (ST)', OBC: 'अन्य पिछड़ा वर्ग (OBC)',
    General: 'सामान्य', EWS: 'आर्थिक रूप से कमजोर (EWS)', all: 'सभी',
};
const RESIDENCE_HI: Record<string, string> = {
    rural: 'ग्रामीण', urban: 'शहरी', both: 'ग्रामीण और शहरी', any: 'कोई भी',
    india: 'भारत', Indian: 'भारतीय',
};
const DOCUMENT_HI: Record<string, string> = {
    'Aadhaar Card': 'आधार कार्ड', 'Bank Account Details': 'बैंक खाता विवरण',
    'Land Ownership Records': 'भूमि स्वामित्व दस्तावेज', 'Mobile Number': 'मोबाइल नंबर',
    'Income Certificate': 'आय प्रमाण पत्र', 'BPL Card/Ration Card': 'BPL कार्ड / राशन कार्ड',
    'BPL Card': 'BPL कार्ड', 'Ration Card': 'राशन कार्ड',
    'Passport Size Photo': 'पासपोर्ट साइज फोटो', 'PAN Card': 'पैन कार्ड',
    'Address Proof': 'पता प्रमाण', 'Voter ID Card': 'मतदाता पहचान पत्र',
    'Voter ID': 'मतदाता पहचान पत्र', 'Birth Certificate': 'जन्म प्रमाण पत्र',
    'Caste Certificate': 'जाति प्रमाण पत्र', 'Domicile Certificate': 'मूल निवास प्रमाण पत्र',
    'Disability Certificate': 'दिव्यांगता प्रमाण पत्र', 'Marksheet': 'मार्कशीट',
    'Self-declaration Form': 'स्व-घोषणा पत्र', 'Business Registration': 'व्यवसाय पंजीकरण',
    'Death Certificate': 'मृत्यु प्रमाण पत्र', 'Marriage Certificate': 'विवाह प्रमाण पत्र',
    'Medical Certificate': 'चिकित्सा प्रमाण पत्र', 'Driving License': 'ड्राइविंग लाइसेंस',
    'Property Documents': 'संपत्ति दस्तावेज', 'Electricity Bill': 'बिजली बिल',
    'Recent Photograph': 'हाल की फोटो', 'Age Proof': 'आयु प्रमाण',
    'Bank Passbook': 'बैंक पासबुक', 'Employee ID': 'कर्मचारी पहचान पत्र',
    'Farm/Land Documents': 'खेत/भूमि दस्तावेज', 'Pension Order': 'पेंशन आदेश',
    'School/College Certificate': 'स्कूल/कॉलेज प्रमाण पत्र',
    'Business Plan/Project Report': 'व्यवसाय योजना / परियोजना रिपोर्ट',
    'Salary Slip': 'सैलरी स्लिप', 'FIR Copy': 'FIR की प्रति',
};

function translateValue(val: string, map: Record<string, string>): string {
    return map[val] || map[val.toLowerCase()] || val;
}

function translateDoc(doc: string): string {
    return DOCUMENT_HI[doc] || doc;
}

// Format eligibility rules into Hindi-friendly display
function formatEligibility(rules: Record<string, unknown>): string[] {
    const items: string[] = [];
    if (rules.age_min || rules.age_max) {
        const min = rules.age_min ? `${rules.age_min} वर्ष` : '';
        const max = rules.age_max ? `${rules.age_max} वर्ष` : '';
        if (min && max) items.push(`आयु: ${min} से ${max}`);
        else if (min) items.push(`न्यूनतम आयु: ${min}`);
        else if (max) items.push(`अधिकतम आयु: ${max}`);
    }
    if (rules.income_max) items.push(`अधिकतम आय: ₹${Number(rules.income_max).toLocaleString('en-IN')}`);
    if (rules.gender && Array.isArray(rules.gender))
        items.push(`लिंग: ${(rules.gender as string[]).map(g => translateValue(g, GENDER_HI)).join(', ')}`);
    if (rules.occupation && Array.isArray(rules.occupation))
        items.push(`व्यवसाय: ${(rules.occupation as string[]).map(o => translateValue(o, OCCUPATION_HI)).join(', ')}`);
    if (rules.caste && Array.isArray(rules.caste))
        items.push(`श्रेणी: ${(rules.caste as string[]).map(c => translateValue(c, CASTE_HI)).join(', ')}`);
    if (rules.residence) items.push(`निवास: ${translateValue(rules.residence as string, RESIDENCE_HI)}`);
    if (rules.bpl) items.push('बीपीएल / गरीबी रेखा से नीचे');
    if (items.length === 0) items.push('सभी भारतीय नागरिक पात्र');
    return items;
}

export default function HindiSchemeDetailPage() {
    const params = useParams();
    const slug = params.slug as string;
    const [scheme, setScheme] = useState<SchemeDetail | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        schemesApi.getBySlug(slug)
            .then((data) => {
                setScheme(data as SchemeDetail);
            })
            .catch(() => { })
            .finally(() => setLoading(false));
    }, [slug]);

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-12">
                <div className="skeleton h-8 w-2/3 rounded mb-4" />
                <div className="skeleton h-4 w-1/2 rounded mb-8" />
                <div className="skeleton h-40 rounded-xl mb-4" />
                <div className="skeleton h-60 rounded-xl" />
            </div>
        );
    }

    if (!scheme) {
        return (
            <div lang="hi" className="max-w-4xl mx-auto px-4 py-16 text-center">
                <div className="text-5xl mb-4">❌</div>
                <h1 className="text-xl font-bold mb-2">योजना नहीं मिली</h1>
                <Link href="/hi/schemes" className="text-[var(--color-primary)] hover:underline">← सभी योजनाएं देखें</Link>
            </div>
        );
    }

    const name = scheme.name_hi || scheme.name;
    const description = scheme.description_hi || scheme.description;
    const benefitSummary = scheme.benefit_summary_hi || scheme.benefit_summary;
    const howToApply = scheme.how_to_apply_hi || scheme.how_to_apply;
    const eligibility = formatEligibility(scheme.eligibility_rules || {});

    return (
        <div lang="hi" className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
            {/* Breadcrumb */}
            <nav className="text-sm text-[var(--color-text-light)] mb-4">
                <Link href="/hi/schemes" className="hover:text-[var(--color-primary)] transition">योजनाएं</Link>
                {' / '}
                <span className="text-[var(--color-text)]">{name}</span>
            </nav>

            {/* Language switcher */}
            <div className="flex justify-end mb-4">
                <Link
                    href={`/schemes/${slug}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                >
                    🌐 English
                </Link>
            </div>

            {/* Header */}
            <div className="mb-8">
                <div className="flex items-start gap-3 mb-3">
                    <span className="text-3xl">{scheme.category_icon || '📋'}</span>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold">{name}</h1>
                        {scheme.name_hi && (
                            <p className="text-sm text-[var(--color-text-light)] mt-1">{scheme.name}</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Benefit */}
            {benefitSummary && (
                <div className="mb-6 p-5 rounded-2xl bg-emerald-50 border border-emerald-200">
                    <h2 className="text-lg font-semibold text-emerald-800 mb-2">💰 लाभ</h2>
                    {scheme.benefit_value > 0 && (
                        <p className="text-emerald-700 font-medium text-lg">{formatCurrency(scheme.benefit_value)}</p>
                    )}
                    <p className="text-sm text-emerald-600 mt-1">{benefitSummary}</p>
                </div>
            )}

            {/* Description */}
            {description && (
                <div className="mb-6 p-5 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border)]">
                    <h2 className="text-lg font-semibold mb-2 flex items-center gap-2"><span>📖</span> योजना के बारे में</h2>
                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{description}</p>
                </div>
            )}

            {/* Eligibility */}
            <section className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl p-6 mb-6">
                <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <span>✅</span> पात्रता
                </h2>
                <ul className="space-y-2">
                    {eligibility.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-[var(--color-text-secondary)]">
                            <span className="text-[var(--color-primary)] mt-1">•</span>
                            {item}
                        </li>
                    ))}
                </ul>
                <div className="mt-4">
                    <Link
                        href="/hi/eligibility"
                        className="inline-flex items-center gap-2 px-5 py-2.5 gradient-bg text-white text-sm font-medium rounded-xl hover:shadow-lg transition"
                    >
                        🎯 अपनी पात्रता जांचें — 2 मिनट में
                    </Link>
                </div>
            </section>

            {/* Documents Required */}
            {scheme.documents_required && scheme.documents_required.length > 0 && (
                <section className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl p-6 mb-6">
                    <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <span>📄</span> आवश्यक दस्तावेज
                    </h2>
                    <ul className="grid sm:grid-cols-2 gap-2">
                        {scheme.documents_required.map((doc, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                                <span className="text-orange-500">📋</span> {translateDoc(doc)}
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {/* How to Apply */}
            {howToApply && howToApply.length > 0 && (
                <section className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl p-6 mb-6">
                    <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <span>📝</span> आवेदन कैसे करें
                    </h2>
                    <ol className="space-y-3">
                        {howToApply.map((step, i) => (
                            <li key={i} className="flex items-start gap-3 text-[var(--color-text-secondary)]">
                                <span className="flex-shrink-0 w-7 h-7 rounded-full gradient-bg text-white text-xs font-bold flex items-center justify-center">
                                    {step.step || i + 1}
                                </span>
                                {step.text}
                            </li>
                        ))}
                    </ol>
                </section>
            )}

            {/* Official Links */}
            {(scheme.official_url || scheme.helpline || scheme.ministry) && (
                <section className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl p-6 mb-6">
                    <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <span>🔗</span> आधिकारिक लिंक
                    </h2>
                    <div className="space-y-2 text-sm">
                        {scheme.official_url && (
                            <div className="flex items-center gap-2">
                                <span>🌐</span>
                                <a href={scheme.official_url} target="_blank" rel="noopener noreferrer"
                                    className="text-[var(--color-primary)] hover:underline">
                                    आधिकारिक वेबसाइट
                                </a>
                            </div>
                        )}
                        {scheme.application_url && (
                            <div className="flex items-center gap-2">
                                <span>📝</span>
                                <a href={scheme.application_url} target="_blank" rel="noopener noreferrer"
                                    className="text-[var(--color-primary)] hover:underline">
                                    ऑनलाइन आवेदन करें
                                </a>
                            </div>
                        )}
                        {scheme.helpline && (
                            <div className="flex items-center gap-2">
                                <span>📞</span>
                                <span className="text-[var(--color-text-secondary)]">हेल्पलाइन: {scheme.helpline}</span>
                            </div>
                        )}
                        {scheme.ministry && (
                            <div className="flex items-center gap-2">
                                <span>🏛️</span>
                                <span className="text-[var(--color-text-secondary)]">{scheme.ministry}</span>
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* Scope & Status */}
            <div className="flex flex-wrap gap-2 mb-8">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                    {scheme.scope === 'central' ? '🏛️ केंद्र सरकार' : '🗺️ राज्य सरकार'}
                </span>
                {scheme.is_always_open && (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">✅ हमेशा खुली</span>
                )}
                {scheme.deadline && (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-orange-50 text-orange-700">
                        ⏰ अंतिम तिथि: {scheme.deadline}
                    </span>
                )}
            </div>

            {/* CTA */}
            <div className="text-center py-6 bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl px-6">
                <h2 className="text-lg font-bold mb-2">अपनी पात्रता जांचें</h2>
                <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                    700+ सरकारी योजनाओं में से आपके लिए कौन सी योजनाएं हैं — मुफ्त, कोई लॉगिन नहीं।
                </p>
                <Link
                    href="/hi/eligibility"
                    className="inline-flex items-center gap-2 px-6 py-3 gradient-bg text-white font-semibold rounded-xl hover:shadow-lg transition"
                >
                    🎯 पात्रता जांचें — 2 मिनट में
                </Link>
            </div>
        </div>
    );
}
