import type { MetadataRoute } from 'next';
import { getAllBlogSlugs } from '@/lib/blog-data';
import { getAllHindiSchemeSlugs } from '@/lib/hindi-scheme-data';

const BASE_URL = 'https://laabhmitra.in';

// Static scheme slugs (from seed data)
const SCHEME_SLUGS = [
    'pm-kisan-samman-nidhi',
    'ayushman-bharat-pmjay',
    'pradhan-mantri-awas-yojana',
    'sukanya-samriddhi-yojana',
    'pradhan-mantri-mudra-yojana',
    'pradhan-mantri-ujjwala-yojana',
    'atal-pension-yojana',
    'pm-jeevan-jyoti-bima-yojana',
    'pm-suraksha-bima-yojana',
    'stand-up-india',
    'pm-vishwakarma-yojana',
    'startup-india',
    'pm-svanidhi',
    'pradhan-mantri-matru-vandana-yojana',
    'pradhan-mantri-fasal-bima-yojana',
    'pradhan-mantri-kaushal-vikas-yojana',
    'national-pension-system',
    'pradhan-mantri-jan-dhan-yojana',
    'agnipath-scheme',
    'pm-garib-kalyan-anna-yojana',
];

const CALCULATOR_SLUGS = [
    'income-tax',
    'emi',
    'sip',
    'gst',
    'fd-compare',
    'ppf',
    'home-loan-emi',
    'hra',
    'gratuity',
    'nps',
    'salary',
    'rd',
    'home-loan-eligibility',
    'car-loan-emi',
    'ssy',
    'epf',
    'tds',
    'lumpsum',
];

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();

    // Core pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: BASE_URL,
            lastModified: now,
            changeFrequency: 'daily',
            priority: 1.0,
        },
        {
            url: `${BASE_URL}/eligibility`,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/schemes`,
            lastModified: now,
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/calculators`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/deadlines`,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/savings-dashboard`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/compare-schemes`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/retirement-score`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/blog`,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/about`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${BASE_URL}/contact`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${BASE_URL}/privacy-policy`,
            lastModified: now,
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: `${BASE_URL}/disclaimer`,
            lastModified: now,
            changeFrequency: 'yearly',
            priority: 0.3,
        },
    ];

    // Scheme detail pages
    const schemePages: MetadataRoute.Sitemap = SCHEME_SLUGS.map((slug) => ({
        url: `${BASE_URL}/schemes/${slug}`,
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    // Calculator pages
    const calculatorPages: MetadataRoute.Sitemap = CALCULATOR_SLUGS.map((slug) => ({
        url: `${BASE_URL}/calculators/${slug}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));
    // Blog post pages
    const blogPages: MetadataRoute.Sitemap = getAllBlogSlugs().map((slug) => ({
        url: `${BASE_URL}/blog/${slug}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    // Hindi scheme pages
    const hindiPages: MetadataRoute.Sitemap = [
        {
            url: `${BASE_URL}/hi/schemes`,
            lastModified: now,
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        },
        ...getAllHindiSchemeSlugs().map((slug) => ({
            url: `${BASE_URL}/hi/schemes/${slug}`,
            lastModified: now,
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        })),
    ];

    return [...staticPages, ...schemePages, ...calculatorPages, ...blogPages, ...hindiPages];
}
