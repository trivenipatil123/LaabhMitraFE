interface SchemeVerificationBadgeProps {
    lastVerified: string;
    sourceUrl?: string;
    sourceName?: string;
}

export function SchemeVerificationBadge({ lastVerified, sourceUrl, sourceName }: SchemeVerificationBadgeProps) {
    const formattedDate = new Date(lastVerified).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });

    return (
        <div className="flex flex-wrap items-center gap-3 px-4 py-3 rounded-xl bg-green-50 border border-green-200 text-sm">
            <span className="inline-flex items-center gap-1.5 font-medium text-green-800">
                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Verified Info
            </span>
            <span className="text-green-700">
                Last checked: {formattedDate}
            </span>
            {sourceUrl && sourceName && (
                <a
                    href={sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-700 hover:text-green-900 underline underline-offset-2"
                >
                    Source: {sourceName}
                </a>
            )}
        </div>
    );
}
