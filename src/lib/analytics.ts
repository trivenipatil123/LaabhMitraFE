/* eslint-disable @typescript-eslint/no-explicit-any */

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/** Send a custom event to Google Analytics */
export const trackEvent = (
    eventName: string,
    parameters?: Record<string, string | number | boolean>
) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', eventName, parameters);
    }
};

// ── Specific events for LaabhMitra ──────────────────

export const trackEligibilityCheck = (schemesFound: number) => {
    trackEvent('eligibility_check_completed', {
        schemes_found: schemesFound,
    });
};

export const trackCalculatorUsed = (calculatorType: string) => {
    trackEvent('calculator_used', {
        calculator_type: calculatorType,
    });
};

export const trackSchemeViewed = (schemeName: string, schemeSlug: string) => {
    trackEvent('scheme_detail_viewed', {
        scheme_name: schemeName,
        scheme_slug: schemeSlug,
    });
};

export const trackShareClicked = (pageType: string, medium: string) => {
    trackEvent('share_clicked', {
        page_type: pageType,
        medium,
    });
};
