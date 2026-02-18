interface SchemeForJsonLd {
    name: string;
    description: string;
    ministry?: string;
    slug: string;
}

export function SchemeJsonLd({ scheme }: { scheme: SchemeForJsonLd }) {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'GovernmentService',
        name: scheme.name,
        description: scheme.description,
        provider: {
            '@type': 'GovernmentOrganization',
            name: scheme.ministry || 'Government of India',
        },
        areaServed: {
            '@type': 'Country',
            name: 'India',
        },
        serviceType: 'Government Welfare Scheme',
        url: `https://laabhmitra.in/schemes/${scheme.slug}`,
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
