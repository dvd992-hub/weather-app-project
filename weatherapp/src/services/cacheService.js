// cacheService.js
const CACHE_DURATION = 60 * 60 * 1000; // 1 ora
const CACHE_KEY_PREFIX = 'weather_cache_';

export function getCachedWeather(cityName) {
    const cacheKey = CACHE_KEY_PREFIX + cityName.toLowerCase().trim();
    const cached = localStorage.getItem(cacheKey);

    if (!cached) return null;

    const { data, timestamp } = JSON.parse(cached);
    const isExpired = Date.now() - timestamp > CACHE_DURATION;

    if (isExpired) {
        localStorage.removeItem(cacheKey);
        return null;
    }

    return data;
}

export function setCachedWeather(cityName, data) {
    const cacheKey = CACHE_KEY_PREFIX + cityName.toLowerCase().trim();
    const cacheData = {
        data: data,
        timestamp: Date.now()
    };
    localStorage.setItem(cacheKey, JSON.stringify(cacheData));
}

export function clearCache(cityName = null) {
    if (cityName) {
        localStorage.removeItem(CACHE_KEY_PREFIX + cityName.toLowerCase().trim());
    } else {
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith(CACHE_KEY_PREFIX)) {
                localStorage.removeItem(key);
            }
        });
    }
}