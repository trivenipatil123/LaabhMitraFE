import type { BlogPost, FAQ } from '@/lib/blog-data';

interface ArticleJsonLdProps {
    post: BlogPost;
}

export function ArticleJsonLd({ post }: ArticleJsonLdProps) {
    const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.metaDescription,
        datePublished: post.publishedAt,
        dateModified: post.updatedAt,
        author: {
            '@type': 'Organization',
            name: post.author,
            url: 'https://laabhmitra.in/about',
        },
        publisher: {
            '@type': 'Organization',
            name: 'LaabhMitra',
            url: 'https://laabhmitra.in',
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://laabhmitra.in/blog/${post.slug}`,
        },
        image: 'https://laabhmitra.in/opengraph-image',
    };

    const faqSchema = post.faqs.length > 0 ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: post.faqs.map((faq: FAQ) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    } : null;

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
            />
            {faqSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                />
            )}
        </>
    );
}
