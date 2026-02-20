import Link from 'next/link';

export default function CalculatorBackLink() {
    return (
        <Link
            href="/calculators"
            className="inline-flex items-center gap-1.5 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition mb-6"
        >
            <span>←</span> All Calculators
        </Link>
    );
}
