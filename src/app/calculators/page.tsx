import Link from 'next/link';
import { CALCULATOR_CARDS } from '@/lib/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Free Financial Calculators - Income Tax, EMI, SIP, GST',
    description: 'Free online calculators: Income Tax (old vs new regime), EMI, SIP returns, GST, FD rate comparison. Instant results with charts.',
};

export default function CalculatorsPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
            <div className="text-center mb-10">
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">Free Financial Calculators</h1>
                <p className="text-[var(--color-text-secondary)] max-w-xl mx-auto">
                    Smart tools for smarter financial decisions. Instant results, no login required.
                </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {CALCULATOR_CARDS.map((calc) => (
                    <Link
                        key={calc.slug}
                        href={`/calculators/${calc.slug}`}
                        className="group p-6 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border)] shadow-sm card-hover relative overflow-hidden"
                    >
                        {/* Color accent strip */}
                        <div
                            className="absolute top-0 left-0 w-full h-1 rounded-t-2xl"
                            style={{ backgroundColor: calc.color }}
                        />
                        <div
                            className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform"
                            style={{ backgroundColor: `${calc.color}12` }}
                        >
                            {calc.icon}
                        </div>
                        <h3 className="font-semibold text-lg mb-1 group-hover:text-[var(--color-primary)] transition">{calc.title}</h3>
                        <p className="text-sm text-[var(--color-text-secondary)]">{calc.description}</p>
                        <div className="mt-4 text-sm font-medium text-[var(--color-primary)] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            Try now <span>→</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
