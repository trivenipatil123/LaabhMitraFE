import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/eligibility/results'],
            },
        ],
        sitemap: 'https://laabhmitra.in/sitemap.xml',
    };
}
