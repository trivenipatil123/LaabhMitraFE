import Link from 'next/link';
import { BLOG_POSTS } from '@/lib/blog-data';

export default function BlogPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
            <div className="text-center mb-10">
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">📰 Blog &amp; Guides</h1>
                <p className="text-[var(--color-text-secondary)]">
                    Latest updates on government schemes, tax planning, and financial tips
                </p>
            </div>

            <div className="space-y-4">
                {BLOG_POSTS.map((post) => {
                    const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                    });

                    return (
                        <Link
                            key={post.slug}
                            href={`/blog/${post.slug}`}
                            className="block p-5 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] card-hover shadow-sm"
                        >
                            <h2 className="font-semibold text-lg hover:text-[var(--color-primary)] transition">
                                {post.title}
                            </h2>
                            <p className="text-sm text-[var(--color-text-secondary)] mt-1 line-clamp-2">
                                {post.excerpt}
                            </p>
                            <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-[var(--color-text-light)]">
                                <span>📅 {formattedDate}</span>
                                <span>⏱ {post.readTime}</span>
                                {post.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </Link>
                    );
                })}
            </div>

            {/* CTA */}
            <div className="text-center mt-10 py-6 bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl px-6">
                <h2 className="text-lg font-bold mb-2">Not Sure Which Scheme You Qualify For?</h2>
                <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                    Check eligibility for 700+ government schemes — free, no login required.
                </p>
                <Link
                    href="/eligibility"
                    className="inline-flex items-center gap-2 px-6 py-3 gradient-bg text-white font-semibold rounded-xl hover:shadow-lg transition"
                >
                    🎯 Check Eligibility Now
                </Link>
            </div>
        </div>
    );
}
