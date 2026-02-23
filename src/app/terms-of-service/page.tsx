import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Terms of Service',
    description:
        'LaabhMitra terms of service — rules and guidelines for using our website, eligibility checker, and financial calculators.',
    alternates: { canonical: 'https://laabhmitra.in/terms-of-service' },
};

export default function TermsOfServicePage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
            <div className="text-center mb-10">
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">Terms of Service</h1>
                <p className="text-sm text-[var(--color-text-light)]">Last updated: February 23, 2026</p>
            </div>

            <div className="prose-custom space-y-6 text-[var(--color-text-secondary)] leading-relaxed">
                <section>
                    <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">1. Acceptance of Terms</h2>
                    <p>
                        By accessing or using the LaabhMitra website (<a href="https://laabhmitra.in" className="text-[var(--color-primary)] hover:underline">laabhmitra.in</a>), you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree with any part of these Terms, you must not use our website.
                    </p>
                    <p className="mt-2">
                        These Terms apply to all visitors, users, and anyone who accesses or uses the website and its services, including the eligibility checker, financial calculators, blog content, and scheme information pages.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">2. Description of Service</h2>
                    <p>
                        LaabhMitra is a <strong>free informational platform</strong> that helps Indian citizens discover government welfare schemes they may be eligible for. Our services include:
                    </p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li><strong>Eligibility Checker:</strong> A tool that matches your profile against publicly available scheme criteria to show potentially applicable schemes</li>
                        <li><strong>Scheme Information:</strong> Details about Central and State government schemes sourced from official websites</li>
                        <li><strong>Financial Calculators:</strong> Tools for estimating income tax, EMI, SIP returns, HRA exemption, and other financial calculations</li>
                        <li><strong>Blog & Guides:</strong> Educational content about government schemes, tax planning, and financial literacy</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">3. Not a Government Service</h2>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mt-2">
                        <p className="text-[var(--color-text-primary)] font-medium">
                            ⚠️ LaabhMitra is <strong>not affiliated with, endorsed by, or connected to</strong> the Government of India, any state government, or any government agency. We are an independent informational platform.
                        </p>
                    </div>
                    <ul className="list-disc pl-6 mt-3 space-y-1">
                        <li>We do <strong>not</strong> process, approve, or manage government scheme applications</li>
                        <li>We do <strong>not</strong> guarantee eligibility or approval for any scheme</li>
                        <li>Eligibility results are <strong>indicative only</strong> — final determination is by the respective government authority</li>
                        <li>We do <strong>not</strong> collect fees for any government service</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">4. User Responsibilities</h2>
                    <p>When using LaabhMitra, you agree to:</p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>Provide accurate information when using the eligibility checker or calculators</li>
                        <li>Use the website for lawful purposes only</li>
                        <li>Not attempt to disrupt, overload, or compromise the website&apos;s functionality</li>
                        <li>Not scrape, crawl, or extract data from the website through automated means without permission</li>
                        <li>Not reproduce, distribute, or use our content for commercial purposes without written consent</li>
                        <li>Verify all scheme information from official government sources before applying</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">5. Intellectual Property</h2>
                    <p>
                        All content on LaabhMitra — including text, graphics, logos, design elements, code, and the overall look and feel of the website — is the property of LaabhMitra and is protected by intellectual property laws.
                    </p>
                    <p className="mt-2">
                        Government scheme data and official information referenced on this website remain the property of the respective government bodies. We use such information under fair use for educational and informational purposes.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">6. Accuracy of Information</h2>
                    <p>
                        We make reasonable efforts to ensure that the information on LaabhMitra is accurate and up-to-date. However:
                    </p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>Government scheme details (eligibility, benefits, deadlines) can change without prior notice</li>
                        <li>Financial calculator results are <strong>estimates only</strong> and may differ from actual figures</li>
                        <li>We do not warrant the completeness, reliability, or accuracy of any content</li>
                        <li>Users should always verify information from <strong>official government sources</strong></li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">7. Third-Party Links & Services</h2>
                    <p>
                        Our website may contain links to third-party websites, including official government portals. These links are provided for your convenience. We do not control, endorse, or assume responsibility for the content or practices of any third-party websites.
                    </p>
                    <p className="mt-2">
                        We use the following third-party services:
                    </p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li><strong>Google Analytics</strong> — for understanding website usage and improving our services</li>
                        <li><strong>Google AdSense</strong> — for displaying relevant advertisements to support our free service</li>
                        <li><strong>Vercel</strong> — for hosting and serving our website</li>
                    </ul>
                    <p className="mt-2">
                        These services may collect data as described in their respective privacy policies. Please refer to our{' '}
                        <Link href="/privacy-policy" className="text-[var(--color-primary)] hover:underline">Privacy Policy</Link> for more details.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">8. Advertising</h2>
                    <p>
                        LaabhMitra is a free service supported by advertising. By using our website, you acknowledge and agree that:
                    </p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>Advertisements may be displayed on pages throughout the website</li>
                        <li>We use Google AdSense and other advertising networks to serve ads</li>
                        <li>Ad content is provided by third-party advertisers and we do not endorse the products or services advertised</li>
                        <li>Advertising partners may use cookies to serve personalized ads based on your browsing history</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">9. Limitation of Liability</h2>
                    <p>
                        To the fullest extent permitted by applicable law, LaabhMitra and its operators shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising from:
                    </p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>Your use of, or inability to use, the website</li>
                        <li>Any errors, inaccuracies, or omissions in the content</li>
                        <li>Any decisions made based on information provided on this website</li>
                        <li>Any unauthorized access to or alteration of your data</li>
                        <li>Any loss or damage resulting from reliance on eligibility checker results or calculator estimates</li>
                    </ul>
                    <p className="mt-2">
                        Use of this website is entirely <strong>at your own risk</strong>.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">10. Indemnification</h2>
                    <p>
                        You agree to indemnify and hold harmless LaabhMitra, its operators, and affiliates from any claims, damages, losses, or expenses (including legal fees) arising from your use of the website or violation of these Terms.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">11. Modifications to Terms</h2>
                    <p>
                        We reserve the right to update or modify these Terms at any time without prior notice. Changes will be posted on this page with an updated &quot;Last updated&quot; date. Your continued use of the website after any changes constitutes acceptance of the revised Terms.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">12. Governing Law</h2>
                    <p>
                        These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from these Terms or your use of the website shall be subject to the exclusive jurisdiction of the courts in India.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">13. Contact Us</h2>
                    <p>
                        If you have any questions about these Terms of Service, please contact us at{' '}
                        <a href="mailto:contact@laabhmitra.in" className="text-[var(--color-primary)] hover:underline">contact@laabhmitra.in</a>.
                    </p>
                </section>

                <section className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl p-6 text-sm">
                    <p>
                        <strong>Related Policies:</strong>{' '}
                        <Link href="/privacy-policy" className="text-[var(--color-primary)] hover:underline">Privacy Policy</Link> · {' '}
                        <Link href="/disclaimer" className="text-[var(--color-primary)] hover:underline">Disclaimer</Link>
                    </p>
                </section>
            </div>
        </div>
    );
}
