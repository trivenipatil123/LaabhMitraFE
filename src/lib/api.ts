/**
 * API client for LaabhMitra backend.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

interface FetchOptions {
    method?: string;
    body?: unknown;
    headers?: Record<string, string>;
}

class ApiError extends Error {
    status: number;
    constructor(message: string, status: number) {
        super(message);
        this.status = status;
        this.name = 'ApiError';
    }
}

async function request<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
    const { method = 'GET', body, headers = {} } = options;

    const config: RequestInit = {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
    };

    if (body) {
        config.body = JSON.stringify(body);
    }

    const response = await fetch(`${API_BASE}${endpoint}`, config);

    if (!response.ok) {
        const error = await response.json().catch(() => ({ detail: 'Unknown error' }));
        throw new ApiError(error.detail || 'Request failed', response.status);
    }

    return response.json();
}

// ── Schemes API ──────────────────────────────────────
export const schemesApi = {
    list: (params?: Record<string, string>) => {
        const query = params ? '?' + new URLSearchParams(params).toString() : '';
        return request(`/schemes${query}`);
    },
    getBySlug: (slug: string) => request(`/schemes/${slug}`),
    getCategories: () => request('/schemes/categories'),
    getPopular: (limit = 10) => request(`/schemes/popular?limit=${limit}`),
    getDeadlines: () => request('/schemes/deadlines'),
};

// ── Eligibility API ──────────────────────────────────
export const eligibilityApi = {
    check: (profile: unknown) => request('/eligibility/check', { method: 'POST', body: profile }),
    checkSingle: (schemeId: number, params: Record<string, string>) => {
        const query = '?' + new URLSearchParams(params).toString();
        return request(`/eligibility/scheme/${schemeId}/check${query}`);
    },
};

// ── Calculators API ──────────────────────────────────
export const calculatorsApi = {
    incomeTax: (data: unknown) => request('/calculators/income-tax', { method: 'POST', body: data }),
    emi: (data: unknown) => request('/calculators/emi', { method: 'POST', body: data }),
    sip: (data: unknown) => request('/calculators/sip', { method: 'POST', body: data }),
    gst: (data: unknown) => request('/calculators/gst', { method: 'POST', body: data }),
    fdCompare: (params?: Record<string, string>) => {
        const query = params ? '?' + new URLSearchParams(params).toString() : '';
        return request(`/calculators/fd-compare${query}`);
    },
};

// ── Search API ───────────────────────────────────────
export const searchApi = {
    search: (q: string, lang = 'en') => request(`/search?q=${encodeURIComponent(q)}&lang=${lang}`),
};

// ── Blog API ─────────────────────────────────────────
export const blogApi = {
    list: (params?: Record<string, string>) => {
        const query = params ? '?' + new URLSearchParams(params).toString() : '';
        return request(`/blog${query}`);
    },
    getBySlug: (slug: string) => request(`/blog/${slug}`),
};

// ── Analytics API ────────────────────────────────────
export const analyticsApi = {
    pageview: (data: unknown) => request('/analytics/pageview', { method: 'POST', body: data }),
    event: (data: unknown) => request('/analytics/event', { method: 'POST', body: data }),
};

// ── Sitemap API ──────────────────────────────────────
export const sitemapApi = {
    schemes: () => request('/sitemap/schemes'),
    calculators: () => request('/sitemap/calculators'),
    blog: () => request('/sitemap/blog'),
};
