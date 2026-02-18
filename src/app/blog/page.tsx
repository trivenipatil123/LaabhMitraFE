'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { blogApi } from '@/lib/api';

interface BlogPost {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    tags: string[];
    published_at: string;
}

interface BlogListResponse {
    items: BlogPost[];
    total: number;
    page: number;
    per_page: number;
    total_pages: number;
}

export default function BlogPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        blogApi.list({ per_page: '20' })
            .then((data) => setPosts((data as BlogListResponse).items))
            .catch(() => { })
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
            <div className="text-center mb-10">
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">📰 Blog & Guides</h1>
                <p className="text-[var(--color-text-secondary)]">Latest updates on government schemes and financial tips</p>
            </div>

            {loading ? (
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => <div key={i} className="skeleton h-28 rounded-xl" />)}
                </div>
            ) : posts.length === 0 ? (
                <div className="text-center py-16">
                    <div className="text-5xl mb-3">📝</div>
                    <h2 className="text-lg font-semibold mb-2">Coming Soon!</h2>
                    <p className="text-[var(--color-text-secondary)]">
                        Blog posts are being prepared. Check back soon for helpful guides on government schemes.
                    </p>
                    <Link href="/" className="inline-flex items-center gap-2 mt-4 px-6 py-3 gradient-bg text-white font-medium rounded-xl">
                        ← Go Home
                    </Link>
                </div>
            ) : (
                <div className="space-y-4">
                    {posts.map((post) => (
                        <Link
                            key={post.id}
                            href={`/blog/${post.slug}`}
                            className="block p-5 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] card-hover shadow-sm"
                        >
                            <h2 className="font-semibold text-lg hover:text-[var(--color-primary)] transition">{post.title}</h2>
                            {post.excerpt && (
                                <p className="text-sm text-[var(--color-text-secondary)] mt-1 line-clamp-2">{post.excerpt}</p>
                            )}
                            <div className="flex items-center gap-3 mt-3 text-xs text-[var(--color-text-light)]">
                                {post.published_at && <span>📅 {new Date(post.published_at).toLocaleDateString('en-IN')}</span>}
                                {post.tags?.map((tag) => (
                                    <span key={tag} className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">{tag}</span>
                                ))}
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
