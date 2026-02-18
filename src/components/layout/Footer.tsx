import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg-card)] mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="col-span-2 md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-3">
                            <span className="text-2xl">🏛️</span>
                            <span className="text-lg font-bold gradient-text">LaabhMitra</span>
                        </Link>
                        <p className="text-sm text-[var(--color-text-secondary)]">
                            Your trusted guide to government schemes and financial tools.
                            Check eligibility for 700+ schemes in just 2 minutes.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold text-sm uppercase tracking-wider mb-3 text-[var(--color-text-light)]">
                            Quick Links
                        </h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/eligibility" className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition">Check Eligibility</Link></li>
                            <li><Link href="/schemes" className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition">All Schemes</Link></li>
                            <li><Link href="/calculators" className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition">Calculators</Link></li>
                            <li><Link href="/blog" className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition">Blog</Link></li>
                        </ul>
                    </div>

                    {/* Calculators */}
                    <div>
                        <h4 className="font-semibold text-sm uppercase tracking-wider mb-3 text-[var(--color-text-light)]">
                            Calculators
                        </h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/calculators/income-tax" className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition">Income Tax</Link></li>
                            <li><Link href="/calculators/emi" className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition">EMI Calculator</Link></li>
                            <li><Link href="/calculators/sip" className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition">SIP Calculator</Link></li>
                            <li><Link href="/calculators/gst" className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition">GST Calculator</Link></li>
                            <li><Link href="/calculators/fd-compare" className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition">FD Comparison</Link></li>
                        </ul>
                    </div>

                    {/* Legal & Info */}
                    <div>
                        <h4 className="font-semibold text-sm uppercase tracking-wider mb-3 text-[var(--color-text-light)]">
                            Company
                        </h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/about" className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition">About Us</Link></li>
                            <li><Link href="/contact" className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition">Contact</Link></li>
                            <li><Link href="/privacy-policy" className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition">Privacy Policy</Link></li>
                            <li><Link href="/disclaimer" className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition">Disclaimer</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Disclaimer */}
                <div className="mt-8 pt-6 border-t border-[var(--color-border)]">
                    <p className="text-xs text-[var(--color-text-light)] leading-relaxed">
                        <strong>Disclaimer:</strong> LaabhMitra is an informational platform. We do not process
                        government scheme applications. All scheme information is sourced from official
                        government websites and is updated regularly. Please verify all details from
                        official sources before applying. Calculator results are approximate and for
                        informational purposes only.
                    </p>
                </div>

                {/* Copyright */}
                <div className="mt-4 text-center">
                    <p className="text-xs text-[var(--color-text-light)]">
                        © {new Date().getFullYear()} LaabhMitra. Made with ❤️ in India.
                    </p>
                </div>
            </div>
        </footer>
    );
}
