import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'About LaabhMitra — India\'s Free Government Scheme Eligibility Checker',
    description:
        'Learn about LaabhMitra — our mission to help every Indian citizen discover and access government welfare schemes they are eligible for.',
    alternates: { canonical: 'https://laabhmitra.in/about' },
};

export default function AboutPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
            <div className="text-center mb-10">
                <h1 className="text-2xl sm:text-3xl font-bold mb-3">About LaabhMitra</h1>
                <p className="text-[var(--color-text-secondary)] text-lg">
                    Your trusted guide to government schemes &amp; financial tools
                </p>
            </div>

            <div className="space-y-8 text-[var(--color-text-secondary)] leading-relaxed">
                {/* Mission */}
                <section className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl p-6 sm:p-8">
                    <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-3 flex items-center gap-2">
                        <span>🎯</span> Our Mission
                    </h2>
                    <p className="mb-3">
                        India has over <strong>700+ government welfare schemes</strong> — from PM Kisan to Ayushman Bharat, from housing subsidies to skill development grants. Yet millions of eligible citizens miss out on these benefits simply because they don&apos;t know which schemes they qualify for.
                    </p>
                    <p>
                        <strong>LaabhMitra</strong> (meaning &quot;Benefit Friend&quot; in Hindi) exists to bridge this gap. We help every Indian citizen discover the government schemes they are eligible for — <strong>in just 2 minutes, completely free</strong>.
                    </p>
                </section>

                {/* What We Do */}
                <section className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl p-6 sm:p-8">
                    <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-3 flex items-center gap-2">
                        <span>💡</span> What We Do
                    </h2>
                    <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                            <span className="text-lg mt-0.5">✅</span>
                            <div>
                                <strong className="text-[var(--color-text-primary)]">Eligibility Checker</strong> — Enter basic details (age, income, state, occupation) and instantly find all schemes you qualify for.
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-lg mt-0.5">📋</span>
                            <div>
                                <strong className="text-[var(--color-text-primary)]">Scheme Database</strong> — Browse 700+ central and state government schemes with detailed information on benefits, eligibility criteria, required documents, and how to apply.
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-lg mt-0.5">🧮</span>
                            <div>
                                <strong className="text-[var(--color-text-primary)]">Financial Calculators</strong> — Free tools for income tax comparison, EMI calculation, SIP returns, GST computation, FD rate comparison, and PPF maturity.
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-lg mt-0.5">📰</span>
                            <div>
                                <strong className="text-[var(--color-text-primary)]">Guides &amp; Updates</strong> — Regularly updated articles and guides on government schemes, financial planning, and tax-saving tips.
                            </div>
                        </li>
                    </ul>
                </section>

                {/* How It Works */}
                <section className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl p-6 sm:p-8">
                    <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-3 flex items-center gap-2">
                        <span>⚙️</span> How It Works
                    </h2>
                    <div className="grid sm:grid-cols-3 gap-4">
                        <div className="text-center p-4 rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)]">
                            <div className="text-3xl mb-2">📝</div>
                            <div className="font-semibold text-[var(--color-text-primary)] mb-1">Step 1</div>
                            <p className="text-sm">Enter basic details — age, income, state, occupation. No login or phone number needed.</p>
                        </div>
                        <div className="text-center p-4 rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)]">
                            <div className="text-3xl mb-2">⚡</div>
                            <div className="font-semibold text-[var(--color-text-primary)] mb-1">Step 2</div>
                            <p className="text-sm">Our engine checks your profile against 700+ scheme eligibility rules instantly.</p>
                        </div>
                        <div className="text-center p-4 rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)]">
                            <div className="text-3xl mb-2">🎯</div>
                            <div className="font-semibold text-[var(--color-text-primary)] mb-1">Step 3</div>
                            <p className="text-sm">See all matching schemes with benefits, documents required, and how to apply.</p>
                        </div>
                    </div>
                </section>

                {/* Data Sources */}
                <section className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl p-6 sm:p-8">
                    <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-3 flex items-center gap-2">
                        <span>🔍</span> Our Data Sources
                    </h2>
                    <p className="mb-3">
                        All scheme information on LaabhMitra is sourced from official government websites and portals, including:
                    </p>
                    <ul className="grid sm:grid-cols-2 gap-2 text-sm">
                        <li className="flex items-center gap-2"><span>🏛️</span> myscheme.gov.in</li>
                        <li className="flex items-center gap-2"><span>🏛️</span> india.gov.in</li>
                        <li className="flex items-center gap-2"><span>🏛️</span> Ministry official portals</li>
                        <li className="flex items-center gap-2"><span>🏛️</span> State government websites</li>
                    </ul>
                    <p className="mt-3 text-sm">
                        We update our database regularly. However, we always recommend verifying details from official sources before applying.
                    </p>
                </section>

                {/* Privacy */}
                <section className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl p-6 sm:p-8">
                    <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-3 flex items-center gap-2">
                        <span>🔒</span> Your Privacy Matters
                    </h2>
                    <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">✅ No login or registration required</li>
                        <li className="flex items-center gap-2">✅ No personal data stored on our servers</li>
                        <li className="flex items-center gap-2">✅ No phone number or Aadhaar collected</li>
                        <li className="flex items-center gap-2">✅ Eligibility check runs entirely in-session</li>
                    </ul>
                    <p className="mt-3 text-sm">
                        Read our full <Link href="/privacy-policy" className="text-[var(--color-primary)] hover:underline">Privacy Policy</Link> for details.
                    </p>
                </section>

                {/* Contact CTA */}
                <div className="text-center py-6">
                    <p className="text-lg font-medium text-[var(--color-text-primary)] mb-4">
                        Questions or suggestions? We&apos;d love to hear from you.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 px-6 py-3 gradient-bg text-white font-semibold rounded-xl hover:shadow-lg transition"
                    >
                        <span>✉️</span> Contact Us
                    </Link>
                </div>
            </div>
        </div>
    );
}
