'use client';

import { useState } from 'react';

export default function ContactPage() {
    const [copied, setCopied] = useState(false);

    const handleCopyEmail = () => {
        navigator.clipboard.writeText('contact@laabhmitra.in');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
            <div className="text-center mb-10">
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">Contact Us</h1>
                <p className="text-[var(--color-text-secondary)]">
                    Have a question, suggestion, or found incorrect information? We&apos;d love to hear from you.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Contact Info */}
                <div className="space-y-6">
                    <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl p-6">
                        <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
                            <span>✉️</span> Email Us
                        </h2>
                        <div className="flex items-center gap-3">
                            <code className="flex-1 px-4 py-2.5 bg-[var(--color-bg)] rounded-lg text-sm font-medium text-[var(--color-text-primary)] border border-[var(--color-border)]">
                                contact@laabhmitra.in
                            </code>
                            <button
                                onClick={handleCopyEmail}
                                className="px-4 py-2.5 rounded-lg text-sm font-medium transition-all gradient-bg text-white hover:shadow-md"
                            >
                                {copied ? '✓ Copied' : 'Copy'}
                            </button>
                        </div>
                        <p className="text-sm text-[var(--color-text-secondary)] mt-3">
                            We typically respond within 24–48 hours.
                        </p>
                    </div>

                    <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl p-6">
                        <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
                            <span>💬</span> What You Can Write About
                        </h2>
                        <ul className="space-y-3 text-sm text-[var(--color-text-secondary)]">
                            <li className="flex items-start gap-3">
                                <span className="text-lg">🐛</span>
                                <div><strong className="text-[var(--color-text-primary)]">Bug Reports</strong> — Found something broken? Let us know.</div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-lg">📋</span>
                                <div><strong className="text-[var(--color-text-primary)]">Incorrect Scheme Info</strong> — Help us keep our data accurate.</div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-lg">💡</span>
                                <div><strong className="text-[var(--color-text-primary)]">Feature Suggestions</strong> — Ideas for new tools or improvements.</div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-lg">🤝</span>
                                <div><strong className="text-[var(--color-text-primary)]">Partnerships</strong> — NGOs, government bodies, and media inquiries.</div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* FAQ */}
                <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl p-6">
                    <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
                        <span>❓</span> Frequently Asked Questions
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-medium text-[var(--color-text-primary)] text-sm mb-1">
                                Is LaabhMitra a government website?
                            </h3>
                            <p className="text-sm text-[var(--color-text-secondary)]">
                                No. LaabhMitra is a private, independent platform that provides information about government schemes. We are not affiliated with the Government of India.
                            </p>
                        </div>
                        <div className="border-t border-[var(--color-border)] pt-4">
                            <h3 className="font-medium text-[var(--color-text-primary)] text-sm mb-1">
                                Can you help me apply for a scheme?
                            </h3>
                            <p className="text-sm text-[var(--color-text-secondary)]">
                                We provide information and guidance on how to apply. Actual applications must be submitted through official government portals or offices.
                            </p>
                        </div>
                        <div className="border-t border-[var(--color-border)] pt-4">
                            <h3 className="font-medium text-[var(--color-text-primary)] text-sm mb-1">
                                Is the eligibility check accurate?
                            </h3>
                            <p className="text-sm text-[var(--color-text-secondary)]">
                                Our eligibility check is based on publicly available criteria and provides an approximate assessment. Final eligibility is determined by the respective government authority.
                            </p>
                        </div>
                        <div className="border-t border-[var(--color-border)] pt-4">
                            <h3 className="font-medium text-[var(--color-text-primary)] text-sm mb-1">
                                Is LaabhMitra free to use?
                            </h3>
                            <p className="text-sm text-[var(--color-text-secondary)]">
                                Yes! LaabhMitra is 100% free. All our tools — eligibility checker, calculators, and scheme information — are available at no cost.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
