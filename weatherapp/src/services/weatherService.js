// Elabora i dati grezzi delle API e li trasforma

import { getCoordinates, fetchRawWeather } from '../api/weatherApi.js';
import { getCachedWeather, setCachedWeather } from './cacheService.js';

export async function getWeatherData(cityName, forceRefresh = false) {
    // Controlla cache
    if (!forceRefresh) {
        const cachedData = getCachedWeather(cityName);
        if (cachedData) {
            console.log('📦 Dati dalla cache');
            return cachedData;
        }
    }

    console.log('🌐 Chiamata API fresca');

    const location = await getCoordinates(cityName);

    const rawWeather = await fetchRawWeather(location.latitude, location.longitude);

    const currentHour = new Date().getHours();
    const humidity = rawWeather.hourly?.relativehumidity_2m?.[currentHour] || 'N/D';

    const weatherData = {
        location: {
            name: location.name,
            country: location.country,
            lat: location.latitude,
            lon: location.longitude
        },
        weather: {
            temperature: rawWeather.current_weather.temperature,
            windspeed: rawWeather.current_weather.windspeed,
            winddirection: rawWeather.current_weather.winddirection,
            weathercode: rawWeather.current_weather.weathercode,
            humidity: humidity,
            timestamp: new Date().toISOString()
        }
    };

    setCachedWeather(cityName, weatherData);

    return weatherData;
}