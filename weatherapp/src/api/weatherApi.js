// Gestisce tutte le chiamate alle API esterne
const GEOCODING_API = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_API = 'https://api.open-meteo.com/v1/forecast';

export async function getCoordinates(cityName) {
    const url = `${GEOCODING_API}?name=${encodeURIComponent(cityName)}&count=1&language=it&format=json`;
    const response = await fetch(url);
    const data = await response.json();

    if (!data.results || data.results.length === 0) {
        throw new Error(`Città "${cityName}" non trovata`);
    }

    return data.results[0];
}

export async function fetchRawWeather(lat, lon) {
    const url = `${WEATHER_API}?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,relativehumidity_2m&timezone=auto&forecast_days=1`;
    const response = await fetch(url);
    const data = await response.json();

    if (!data.current_weather) {
        throw new Error('Dati meteo non disponibili');
    }

    return data;
}