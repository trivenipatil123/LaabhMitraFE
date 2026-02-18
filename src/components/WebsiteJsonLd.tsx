export function WebsiteJsonLd() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'LaabhMitra',
        url: 'https://laabhmitra.in',
        description: 'Free government scheme eligibility checker for Indian citizens',
        potentialAction: {
            '@type': 'SearchAction',
            target: 'https://laabhmitra.in/schemes?search={search_term_string}',
            'query-input': 'required name=search_term_string',
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
