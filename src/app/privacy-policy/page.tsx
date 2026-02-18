import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy',
    description:
        'LaabhMitra privacy policy — how we collect, use, and protect your information. We respect your privacy and do not store personal data.',
    alternates: { canonical: 'https://laabhmitra.in/privacy-policy' },
};

export default function PrivacyPolicyPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
            <div className="text-center mb-10">
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">Privacy Policy</h1>
                <p className="text-sm text-[var(--color-text-light)]">Last updated: February 18, 2026</p>
            </div>

            <div className="prose-custom space-y-6 text-[var(--color-text-secondary)] leading-relaxed">
                <section>
                    <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">1. Introduction</h2>
                    <p>
                        LaabhMitra (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) operates the website laabhmitra.in. This Privacy Policy explains how we collect, use, and protect information when you use our website and services.
                    </p>
                    <p className="mt-2">
                        By using LaabhMitra, you agree to the collection and use of information as described in this policy.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">2. Information We Collect</h2>

                    <h3 className="font-medium text-[var(--color-text-primary)] mt-3 mb-1">2.1 Eligibility Check Data</h3>
                    <p>
                        When you use our eligibility checker, you provide information such as age, gender, state, income, occupation, and category. This data is:
                    </p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>Used only to check your eligibility against government scheme criteria</li>
                        <li>Processed in real-time and <strong>not permanently stored</strong> on our servers</li>
                        <li>Kept only in your browser session and cleared when you close the tab</li>
                    </ul>

                    <h3 className="font-medium text-[var(--color-text-primary)] mt-3 mb-1">2.2 Automatically Collected Data</h3>
                    <p>Like most websites, we automatically collect:</p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>Browser type and version</li>
                        <li>Device type (mobile, desktop, tablet)</li>
                        <li>Pages visited and time spent</li>
                        <li>Referring website</li>
                        <li>Approximate geographic location (country/state level from IP)</li>
                    </ul>
                    <p className="mt-2">This data is collected via <strong>Google Analytics 4</strong> and is used in aggregate to improve our website.</p>

                    <h3 className="font-medium text-[var(--color-text-primary)] mt-3 mb-1">2.3 What We Do NOT Collect</h3>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>We do <strong>not</strong> require login or registration</li>
                        <li>We do <strong>not</strong> collect your name, email, phone number, or Aadhaar</li>
                        <li>We do <strong>not</strong> store eligibility check responses permanently</li>
                        <li>We do <strong>not</strong> sell or share personal data with third parties</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">3. Cookies &amp; Tracking</h2>
                    <p>We use the following cookies and tracking technologies:</p>
                    <div className="overflow-x-auto mt-2">
                        <table className="w-full text-sm border border-[var(--color-border)] rounded-lg overflow-hidden">
                            <thead>
                                <tr className="bg-[var(--color-bg-card)]">
                                    <th className="text-left px-4 py-2 border-b border-[var(--color-border)]">Cookie</th>
                                    <th className="text-left px-4 py-2 border-b border-[var(--color-border)]">Purpose</th>
                                    <th className="text-left px-4 py-2 border-b border-[var(--color-border)]">Duration</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="px-4 py-2 border-b border-[var(--color-border)] font-mono text-xs">_ga</td>
                                    <td className="px-4 py-2 border-b border-[var(--color-border)]">Google Analytics — distinguishes users</td>
                                    <td className="px-4 py-2 border-b border-[var(--color-border)]">2 years</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2 border-b border-[var(--color-border)] font-mono text-xs">_ga_*</td>
                                    <td className="px-4 py-2 border-b border-[var(--color-border)]">Google Analytics — maintains session state</td>
                                    <td className="px-4 py-2 border-b border-[var(--color-border)]">2 years</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p className="mt-2">
                        You can disable cookies in your browser settings. However, some features may not function properly without them.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">4. How We Use Your Data</h2>
                    <p>We use the collected data to:</p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>Check your eligibility for government schemes (real-time, not stored)</li>
                        <li>Improve our website content and user experience</li>
                        <li>Understand which schemes and tools are most popular</li>
                        <li>Fix bugs and improve performance</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">5. Third-Party Services</h2>
                    <p>We use the following third-party services:</p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li><strong>Google Analytics 4</strong> — for website analytics (<a href="https://policies.google.com/privacy" className="text-[var(--color-primary)] hover:underline" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a>)</li>
                        <li><strong>Vercel</strong> — for website hosting (<a href="https://vercel.com/legal/privacy-policy" className="text-[var(--color-primary)] hover:underline" target="_blank" rel="noopener noreferrer">Vercel Privacy Policy</a>)</li>
                        <li><strong>Cloudflare</strong> — for DNS and security (<a href="https://www.cloudflare.com/privacypolicy/" className="text-[var(--color-primary)] hover:underline" target="_blank" rel="noopener noreferrer">Cloudflare Privacy Policy</a>)</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">6. Data Security</h2>
                    <p>
                        We take reasonable measures to protect the information transmitted through our website. Our site uses HTTPS encryption for all communications. However, no method of transmission over the Internet is 100% secure.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">7. Children&apos;s Privacy</h2>
                    <p>
                        LaabhMitra is not directed at children under 13. We do not knowingly collect personal information from children. If you are a parent and believe your child has provided us with personal data, please contact us.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">8. Changes to This Policy</h2>
                    <p>
                        We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated &quot;Last updated&quot; date. Continued use of the website after changes constitutes acceptance of the revised policy.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">9. Contact Us</h2>
                    <p>
                        If you have questions about this Privacy Policy, please contact us at{' '}
                        <a href="mailto:contact@laabhmitra.in" className="text-[var(--color-primary)] hover:underline">contact@laabhmitra.in</a>.
                    </p>
                </section>
            </div>
        </div>
    );
}
