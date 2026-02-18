'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);

    const navLinks = [
        { href: '/eligibility', label: 'Check Eligibility', icon: '✅' },
        { href: '/schemes', label: 'Schemes', icon: '📋' },
        { href: '/calculators', label: 'Calculators', icon: '🧮' },
        { href: '/blog', label: 'Blog', icon: '📰' },
    ];

    return (
        <header className="sticky top-0 z-50 glass border-b border-[var(--color-border)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <span className="text-2xl">🏛️</span>
                        <span className="text-xl font-bold gradient-text">LaabhMitra</span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 transition-all duration-200"
                            >
                                <span className="text-base">{link.icon}</span>
                                {link.label}
                            </Link>
                        ))}
                        <Link
                            href="/hi/schemes"
                            className="ml-2 px-3 py-1.5 text-xs font-medium rounded-full border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition"
                        >
                            हिन्दी
                        </Link>
                    </nav>

                    {/* Mobile hamburger */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
                        aria-label="Toggle menu"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {mobileOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile menu */}
                {mobileOpen && (
                    <nav className="md:hidden pb-4 fade-in">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                className="flex items-center gap-3 px-4 py-3 rounded-lg text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 transition"
                            >
                                <span className="text-lg">{link.icon}</span>
                                <span className="font-medium">{link.label}</span>
                            </Link>
                        ))}
                        <Link
                            href="/hi/schemes"
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 transition"
                        >
                            <span className="text-lg">🌐</span>
                            <span className="font-medium">हिन्दी</span>
                        </Link>
                    </nav>
                )}
            </div>
        </header>
    );
}
