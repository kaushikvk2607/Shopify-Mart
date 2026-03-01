import mixpanel from 'mixpanel-browser';

const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;

let initialized = false;

const ensureInitialized = () => {
    if (typeof window === 'undefined') return false;
    if (initialized) return true;

    if (!MIXPANEL_TOKEN) {
        console.warn('[Mixpanel] No token found. Set NEXT_PUBLIC_MIXPANEL_TOKEN in .env');
        return false;
    }

    mixpanel.init(MIXPANEL_TOKEN, {
        debug: process.env.NODE_ENV === 'development',
        track_pageview: false,
        persistence: 'localStorage',
        batch_requests: false,
    });

    initialized = true;
    console.log('[Mixpanel] Initialized successfully');
    return true;
};

export const initMixpanel = () => {
    ensureInitialized();
};

export const trackEvent = (eventName, properties = {}) => {
    if (typeof window === 'undefined') return;

    if (!ensureInitialized()) {
        console.log(`[Mixpanel] (not sent - no token) ${eventName}`, properties);
        return;
    }

    console.log(`[Mixpanel] Tracking: ${eventName}`, properties);

    mixpanel.track(eventName, {
        ...properties,
        timestamp: new Date().toISOString(),
    });
};

export const identifyUser = (userId, traits = {}) => {
    if (typeof window === 'undefined' || !ensureInitialized()) return;

    mixpanel.identify(userId);
    if (Object.keys(traits).length > 0) {
        mixpanel.people.set(traits);
    }
};

export const resetUser = () => {
    if (typeof window === 'undefined' || !ensureInitialized()) return;
    mixpanel.reset();
};
