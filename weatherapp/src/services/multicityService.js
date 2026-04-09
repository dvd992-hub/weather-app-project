// Gestisce il confronto meteo tra più città

import { getWeatherData } from './weatherService.js';
import { formatTemperature, formatWindSpeed, getWeatherDescription, getWeatherIcon } from '../utils/formatters.js';

/**
 * Ottiene i dati meteo per multiple città contemporaneamente
 */
export async function getMultipleCitiesWeather(citiesArray, forceRefresh = false) {
    const promises = citiesArray.map(city =>
        getWeatherData(city, forceRefresh)
            .then(data => ({ success: true, city, data }))
            .catch(error => ({ success: false, city, error: error.message }))
    );

    const results = await Promise.all(promises);

    return {
        timestamp: new Date().toISOString(),
        totalCities: citiesArray.length,
        successful: results.filter(r => r.success).length,
        failed: results.filter(r => !r.success).length,
        results: results
    };
}

/**
 * Genera HTML per il confronto città
 */
export function renderComparisonHTML(comparisonData) {
    if (!comparisonData.results || comparisonData.results.length === 0) {
        return '<div class="error">Nessun dato disponibile</div>';
    }

    return `
        <div class="comparison-header">
            <h3>📊 Confronto Meteo</h3>
            <div class="comparison-stats">
                <span>✅ ${comparisonData.successful} città trovate</span>
                <span>❌ ${comparisonData.failed} non trovate</span>
                <span>🕐 ${new Date(comparisonData.timestamp).toLocaleTimeString('it-IT')}</span>
            </div>
        </div>
        <div class="comparison-grid">
            ${comparisonData.results.map(result => renderComparisonCard(result)).join('')}
        </div>
    `;
}

/**
 * Genera una singola card di confronto
 */
function renderComparisonCard(result) {
    if (!result.success) {
        return `
            <div class="comparison-card error">
                <div class="city-name">❌ ${result.city}</div>
                <div class="error-message">${result.error}</div>
            </div>
        `;
    }

    const data = result.data;
    const weatherCode = data.weather.weathercode;

    return `
        <div class="comparison-card">
            <div class="city-header">
                <span class="weather-icon">${getWeatherIcon(weatherCode)}</span>
                <h3 class="city-name">${data.location.name}</h3>
                <span class="country">${data.location.country}</span>
            </div>
            
            <div class="weather-temp">
                ${formatTemperature(data.weather.temperature)}
            </div>
            
            <div class="weather-condition">
                ${getWeatherDescription(weatherCode)}
            </div>
            
            <div class="weather-details">
                <div class="detail">
                    <span class="detail-icon">💨</span>
                    <span>${formatWindSpeed(data.weather.windspeed)}</span>
                </div>
                <div class="detail">
                    <span class="detail-icon">💧</span>
                    <span>${data.weather.humidity !== 'N/D' ? data.weather.humidity + '%' : 'N/D'}</span>
                </div>
            </div>
            
            <div class="update-time">
                Aggiornato: ${new Date(data.weather.timestamp || Date.now()).toLocaleTimeString('it-IT')}
            </div>
        </div>
    `;
}

/**
 * Inietta il confronto nel DOM
 */
export function injectComparison(comparisonData, containerId = 'comparisonContainer') {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container ${containerId} non trovato`);
        return;
    }

    container.innerHTML = renderComparisonHTML(comparisonData);
    container.style.display = 'block';
}

/**
 * Funzione principale per confrontare città (da chiamare dal main)
 */
export async function compareCities(citiesInput, containerId = 'comparisonContainer') {
    // Pulisci input (accetta sia stringa che array)
    let citiesArray;
    if (typeof citiesInput === 'string') {
        citiesArray = citiesInput.split(',').map(c => c.trim()).filter(c => c);
    } else if (Array.isArray(citiesInput)) {
        citiesArray = citiesInput;
    } else {
        throw new Error('Input non valido. Fornire stringa o array di città.');
    }

    if (citiesArray.length === 0) {
        throw new Error('Inserisci almeno una città');
    }

    // Mostra loading nel container
    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = '<div class="loading">⏳ Caricamento confronto...</div>';
        container.style.display = 'block';
    }

    try {
        const comparisonData = await getMultipleCitiesWeather(citiesArray);
        injectComparison(comparisonData, containerId);
        return comparisonData;
    } catch (error) {
        if (container) {
            container.innerHTML = `<div class="error">❌ Errore: ${error.message}</div>`;
        }
        throw error;
    }
}

/**
 * Salva un confronto preferito (localStorage)
 */
export function saveFavoriteComparison(name, cities) {
    const favorites = getFavoriteComparisons();
    favorites[name] = {
        cities: cities,
        timestamp: Date.now()
    };
    localStorage.setItem('weather_favorites', JSON.stringify(favorites));
}

/**
 * Recupera i confronti preferiti
 */
export function getFavoriteComparisons() {
    const stored = localStorage.getItem('weather_favorites');
    return stored ? JSON.parse(stored) : {};
}

/**
 * Carica un confronto preferito
 */
export function loadFavoriteComparison(name, containerId = 'comparisonContainer') {
    const favorites = getFavoriteComparisons();
    if (favorites[name]) {
        return compareCities(favorites[name].cities, containerId);
    }
    throw new Error(`Preferito "${name}" non trovato`);
}

const cityInput = document.getElementById('cityInput');
if (cityInput) {
    cityInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Previene comportamenti indesiderati
            searchWeather();
        }
    });
    console.log('✅ Event listener Enter aggiunto');
} else {
    console.error('❌ Elemento cityInput non trovato!');
}

console.log('✅ App inizializzata');
