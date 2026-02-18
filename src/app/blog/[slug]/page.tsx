import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BLOG_POSTS, getBlogPost, getAllBlogSlugs } from '@/lib/blog-data';
import { ArticleJsonLd } from '@/components/ArticleJsonLd';

// Pre-generate all blog slugs at build time
export function generateStaticParams() {
    return getAllBlogSlugs().map((slug) => ({ slug }));
}

// Dynamic metadata per blog post
export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const post = getBlogPost(slug);

    if (!post) {
        return { title: 'Blog Post Not Found' };
    }

    return {
        title: post.metaTitle,
        description: post.metaDescription,
        alternates: { canonical: `https://laabhmitra.in/blog/${slug}` },
        openGraph: {
            title: post.metaTitle,
            description: post.metaDescription,
            url: `https://laabhmitra.in/blog/${slug}`,
            siteName: 'LaabhMitra',
            locale: 'en_IN',
            type: 'article',
            publishedTime: post.publishedAt,
            modifiedTime: post.updatedAt,
            authors: [post.author],
            tags: post.tags,
            images: [{ url: '/opengraph-image', width: 1200, height: 630 }],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.metaTitle,
            description: post.metaDescription,
        },
    };
}

export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = getBlogPost(slug);

    if (!post) {
        notFound();
    }

    const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
            <ArticleJsonLd post={post} />

            {/* Breadcrumb */}
            <nav className="text-sm text-[var(--color-text-light)] mb-4">
                <Link href="/blog" className="hover:text-[var(--color-primary)] transition">Blog</Link>
                {' / '}
                <span className="text-[var(--color-text)]">{post.title}</span>
            </nav>

            {/* Header */}
            <header className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold leading-tight mb-3">{post.title}</h1>
                <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--color-text-light)]">
                    <span>📅 {formattedDate}</span>
                    <span>⏱ {post.readTime}</span>
                    <span>✍️ {post.author}</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                    {post.tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-3 py-1 text-xs rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </header>

            {/* Article Content */}
            <article className="space-y-8">
                {post.sections.map((section, index) => (
                    <section
                        key={index}
                        className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl p-6 sm:p-8"
                    >
                        <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">
                            {section.heading}
                        </h2>
                        <div
                            className="prose-custom text-[var(--color-text-secondary)] leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: section.content }}
                        />
                    </section>
                ))}

                {/* FAQs */}
                {post.faqs.length > 0 && (
                    <section className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl p-6 sm:p-8">
                        <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">
                            ❓ Frequently Asked Questions
                        </h2>
                        <div className="space-y-4">
                            {post.faqs.map((faq, index) => (
                                <div key={index} className={index > 0 ? 'pt-4 border-t border-[var(--color-border)]' : ''}>
                                    <h3 className="font-medium text-[var(--color-text-primary)] mb-2">
                                        {faq.question}
                                    </h3>
                                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* CTA */}
                <div className="text-center py-6 bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl px-6">
                    <h2 className="text-lg font-bold mb-2">Check Your Eligibility Now</h2>
                    <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                        Find all government schemes you qualify for — free, no login required.
                    </p>
                    <Link
                        href="/eligibility"
                        className="inline-flex items-center gap-2 px-6 py-3 gradient-bg text-white font-semibold rounded-xl hover:shadow-lg transition"
                    >
                        🎯 Check Eligibility — 2 minutes
                    </Link>
                </div>

                {/* Related Posts */}
                <div className="border-t border-[var(--color-border)] pt-8">
                    <h2 className="text-lg font-semibold mb-4">📚 More Articles</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                        {BLOG_POSTS.filter((p) => p.slug !== post.slug)
                            .slice(0, 2)
                            .map((related) => (
                                <Link
                                    key={related.slug}
                                    href={`/blog/${related.slug}`}
                                    className="p-4 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] card-hover"
                                >
                                    <h3 className="font-medium text-sm hover:text-[var(--color-primary)] transition line-clamp-2">
                                        {related.title}
                                    </h3>
                                    <p className="text-xs text-[var(--color-text-light)] mt-2">{related.readTime}</p>
                                </Link>
                            ))}
                    </div>
                </div>
            </article>
        </div>
    );
}
