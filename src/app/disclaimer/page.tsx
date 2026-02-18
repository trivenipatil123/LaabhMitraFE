import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Disclaimer',
    description:
        'LaabhMitra disclaimer — important information about the nature of our service. We are an informational platform and do not process government applications.',
    alternates: { canonical: 'https://laabhmitra.in/disclaimer' },
};

export default function DisclaimerPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
            <div className="text-center mb-10">
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">Disclaimer</h1>
                <p className="text-sm text-[var(--color-text-light)]">Last updated: February 18, 2026</p>
            </div>

            <div className="space-y-6 text-[var(--color-text-secondary)] leading-relaxed">
                <section className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
                    <p className="text-[var(--color-text-primary)] font-medium">
                        ⚠️ LaabhMitra is an <strong>informational platform only</strong>. We do not process, approve, or manage government scheme applications. We are not affiliated with, endorsed by, or connected to the Government of India or any state government.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">1. Nature of Service</h2>
                    <p>
                        LaabhMitra provides information about government welfare schemes available in India. Our eligibility checker tool provides an <strong>approximate assessment</strong> based on the criteria you enter and publicly available scheme guidelines.
                    </p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>We are <strong>not a government agency</strong> or authorized application portal</li>
                        <li>We do <strong>not guarantee</strong> that you will be approved for any scheme</li>
                        <li>Our eligibility results are <strong>indicative only</strong> and not a final determination</li>
                        <li>Actual eligibility is determined solely by the respective government authority</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">2. Accuracy of Information</h2>
                    <p>
                        We make every effort to ensure that scheme information on LaabhMitra is accurate and up-to-date. Our data is sourced from official government websites including myscheme.gov.in, india.gov.in, and ministry portals.
                    </p>
                    <p className="mt-2">
                        However, scheme details (eligibility criteria, benefit amounts, deadlines) can change without notice. We recommend always verifying information from the <strong>official government source</strong> before applying.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">3. Financial Calculators</h2>
                    <p>
                        The financial calculators on LaabhMitra (Income Tax, EMI, SIP, GST, FD Comparison, PPF) provide <strong>approximate estimates only</strong>. Results may differ from actual figures due to:
                    </p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>Changes in tax laws, interest rates, or rules</li>
                        <li>Individual financial circumstances not captured by our inputs</li>
                        <li>Rounding differences and simplified calculation methods</li>
                    </ul>
                    <p className="mt-2">
                        These tools are for <strong>educational and planning purposes only</strong>. For actual tax filing or financial decisions, please consult a qualified financial advisor or chartered accountant.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">4. External Links</h2>
                    <p>
                        LaabhMitra may contain links to official government websites and external resources. We are not responsible for the content, accuracy, or availability of these external sites. Links are provided as a convenience for users to access official information.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">5. No Professional Advice</h2>
                    <p>
                        Nothing on this website constitutes legal, financial, tax, or professional advice. The content is provided for informational purposes only. Always seek independent professional advice before making financial or legal decisions based on information found on this website.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">6. Limitation of Liability</h2>
                    <p>
                        LaabhMitra and its operators shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use of this website or reliance on any information provided. Use of this website is entirely at your own risk.
                    </p>
                </section>

                <section>
                    <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">7. Contact</h2>
                    <p>
                        If you find any inaccurate information on our website, please help us improve by contacting us at{' '}
                        <a href="mailto:contact@laabhmitra.in" className="text-[var(--color-primary)] hover:underline">contact@laabhmitra.in</a>. We appreciate your feedback.
                    </p>
                </section>
            </div>
        </div>
    );
}
