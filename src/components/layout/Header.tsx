'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const TOOL_LINKS = [
    { href: '/deadlines', label: 'Deadline Tracker', icon: '⏰' },
    { href: '/savings-dashboard', label: 'Savings Dashboard', icon: '📊' },
    { href: '/compare-schemes', label: 'Compare Schemes', icon: '🔄' },
    { href: '/retirement-score', label: 'Retirement Score', icon: '🎯' },
];

export default function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [toolsOpen, setToolsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown on outside click
    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setToolsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    const navLinks = [
        { href: '/eligibility', label: 'Check Eligibility', icon: '✅' },
        { href: '/schemes', label: 'Schemes', icon: '📋' },
        { href: '/calculators', label: 'Calculators', icon: '🧮' },
    ];

    return (
        <header className="sticky top-0 z-50 glass border-b border-[var(--color-border)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center group">
                        <Image src="/logo-option2-tricolor.svg" alt="LaabhMitra" width={400} height={120} className="w-52 sm:w-72 h-auto" priority />
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

                        {/* Tools Dropdown */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setToolsOpen(!toolsOpen)}
                                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${toolsOpen
                                        ? 'text-[var(--color-primary)] bg-[var(--color-primary)]/5'
                                        : 'text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/5'
                                    }`}
                            >
                                <span className="text-base">🛠️</span>
                                Tools
                                <svg className={`w-3.5 h-3.5 transition-transform ${toolsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {toolsOpen && (
                                <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white border border-[var(--color-border)] shadow-xl py-2 fade-in z-50">
                                    {TOOL_LINKS.map((tool) => (
                                        <Link
                                            key={tool.href}
                                            href={tool.href}
                                            onClick={() => setToolsOpen(false)}
                                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 transition"
                                        >
                                            <span className="text-base">{tool.icon}</span>
                                            {tool.label}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        <Link
                            href="/blog"
                            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 transition-all duration-200"
                        >
                            <span className="text-base">📰</span>
                            Blog
                        </Link>

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

                        {/* Tools section in mobile */}
                        <div className="px-4 pt-2 pb-1">
                            <span className="text-xs font-semibold text-[var(--color-text-light)] uppercase tracking-wider">Tools</span>
                        </div>
                        {TOOL_LINKS.map((tool) => (
                            <Link
                                key={tool.href}
                                href={tool.href}
                                onClick={() => setMobileOpen(false)}
                                className="flex items-center gap-3 px-4 py-3 rounded-lg text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 transition"
                            >
                                <span className="text-lg">{tool.icon}</span>
                                <span className="font-medium">{tool.label}</span>
                            </Link>
                        ))}

                        <Link
                            href="/blog"
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 transition"
                        >
                            <span className="text-lg">📰</span>
                            <span className="font-medium">Blog</span>
                        </Link>
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
