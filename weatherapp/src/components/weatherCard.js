// Gestisce tutto ciò che riguarda l'interfaccia utente e il DOM
import {
    formatTemperature,
    formatWindSpeed,
    getWeatherDescription,
    formatCityName,
    formatDate,
    getEstimatedHumidity,
    getWeatherIcon  // ✅ IMPORT esplicito
} from '../utils/formatters.js';

// Elementi DOM
let elements = {};

/**
 * Inizializza tutti gli elementi DOM
 */
export function initializeUI() {
    elements = {
        cityInput: document.getElementById('cityInput'),
        loading: document.getElementById('loading'),
        error: document.getElementById('error'),
        weatherResult: document.getElementById('weatherResult'),
        cityName: document.getElementById('cityName'),
        temperature: document.getElementById('temperature'),
        condition: document.getElementById('condition'),
        windSpeed: document.getElementById('windSpeed'),
        humidity: document.getElementById('humidity'),
        updateTime: document.getElementById('updateTime'),
        weatherIcon: document.getElementById('weatherIcon'),  // ✅ Aggiunto
        feelsLike: document.getElementById('feelsLike'),
        pressure: document.getElementById('pressure'),
        cacheStatus: document.getElementById('cacheStatus')
    };

    console.log('✅ UI inizializzata');
    return elements;
}

/**
 * Mostra/nascondi loading
 */
export function showLoading(show) {
    if (elements.loading) {
        elements.loading.style.display = show ? 'block' : 'none';
    }
}

/**
 * Mostra errore
 */
export function showError(message, duration = 5000) {
    if (elements.error) {
        elements.error.textContent = message;
        elements.error.style.display = 'block';

        if (duration > 0) {
            setTimeout(() => {
                if (elements.error) {
                    elements.error.style.display = 'none';
                }
            }, duration);
        }
    }
}

/**
 * Nascondi errore
 */
export function hideError() {
    if (elements.error) {
        elements.error.style.display = 'none';
    }
}

/**
 * Mostra i dati meteo nell'UI
 */
export function displayWeather(data) {
    if (!elements.weatherResult) return;

    // Dati principali
    if (elements.cityName) {
        elements.cityName.textContent = formatCityName(data.location.name, data.location.country);
    }

    if (elements.temperature) {
        elements.temperature.textContent = formatTemperature(data.weather.temperature);
    }

    if (elements.condition) {
        elements.condition.textContent = getWeatherDescription(data.weather.weathercode);
    }

    if (elements.windSpeed) {
        elements.windSpeed.textContent = formatWindSpeed(data.weather.windspeed);
    }

    if (elements.humidity) {
        const humidity = data.weather.humidity !== 'N/D'
            ? `${data.weather.humidity}%`
            : getEstimatedHumidity(data.weather.weathercode);
        elements.humidity.textContent = humidity;
    }

    if (elements.updateTime) {
        elements.updateTime.textContent = formatDate(new Date(), 'time');
    }

    // ✅ CORREZIONE: Usa getWeatherIcon importata, non require
    if (elements.weatherIcon) {
        elements.weatherIcon.textContent = getWeatherIcon(data.weather.weathercode);
    }

    // Mostra il container dei risultati
    elements.weatherResult.style.display = 'block';

    console.log('✅ Dati meteo visualizzati');
}

/**
 * Nascondi i risultati meteo
 */
export function hideWeather() {
    if (elements.weatherResult) {
        elements.weatherResult.style.display = 'none';
    }
}

/**
 * Pulisce tutti i campi dell'UI
 */
export function clearUI() {
    hideWeather();
    hideError();

    const fields = ['cityName', 'temperature', 'condition', 'windSpeed', 'humidity', 'updateTime', 'weatherIcon'];
    fields.forEach(field => {
        if (elements[field]) {
            elements[field].textContent = '';
        }
    });
}

/**
 * Aggiorna lo stato della cache nell'UI
 */
export function updateCacheStatus(isFromCache) {
    if (elements.cacheStatus) {
        elements.cacheStatus.textContent = isFromCache ? '✓ Da cache' : '🌐 API live';
        elements.cacheStatus.style.color = isFromCache ? '#4ecdc4' : '#ff6b6b';
    }
}