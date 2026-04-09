// Questo file coordina tutti i moduli e gestisce il flusso principale
import { getWeatherData } from './services/weatherService.js';
import { initializeUI, displayWeather, showLoading, showError, hideError, clearUI, updateCacheStatus } from './components/weatherCard.js';
import { compareCities } from './services/multicityService.js';
import { getWeatherDescription } from './utils/formatters.js';

// Inizializza UI quando il DOM è pronto
document.addEventListener('DOMContentLoaded', () => {
    initializeUI();
    console.log('✅ App inizializzata');
});

// Funzione principale ricerca meteo
async function searchWeather(forceRefresh = false) {
    const cityInput = document.getElementById('cityInput');
    const cityName = cityInput?.value.trim();

    if (!cityName) {
        showError('❌ Inserisci il nome di una città');
        return;
    }

    showLoading(true);
    hideError();
    clearUI();

    try {
        const data = await getWeatherData(cityName, forceRefresh);
        displayWeather(data);
        updateCacheStatus(!!getCachedWeather(cityName));

    } catch (error) {
        showError(`❌ ${error.message}`);
        console.error('Errore:', error);
    } finally {
        showLoading(false);
    }
}

// Funzione per confronto città (da chiamare dal bottone)
async function compareCitiesInput() {
    const input = document.getElementById('multiCitiesInput');
    const cities = input?.value.trim();

    if (!cities) {
        showError('❌ Inserisci almeno una città da confrontare');
        return;
    }

    try {
        await compareCities(cities, 'comparisonContainer');
    } catch (error) {
        showError(`❌ Errore nel confronto: ${error.message}`);
    }
}

window.searchWeather = searchWeather;
window.refreshWeather = () => searchWeather(true);
window.compareCitiesInput = compareCitiesInput;

// Funzione helper per cache (se necessaria)
function getCachedWeather(cityName) {
    const cacheKey = 'weather_cache_' + cityName.toLowerCase().trim();
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
        const { timestamp } = JSON.parse(cached);
        const isExpired = Date.now() - timestamp > 60 * 60 * 1000;
        return !isExpired;
    }
    return false;
}

// Inizializzazione con event listener per ENTRAMBI i campi
document.addEventListener('DOMContentLoaded', () => {
    // Inizializza UI
    initializeUI();

    // ⭐ Event listener per il campo città singola
    const cityInput = document.getElementById('cityInput');
    if (cityInput) {
        cityInput.addEventListener('keypress', function (event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                console.log('🔍 Ricerca città singola');
                searchWeather();
            }
        });
        console.log('✅ Event listener Enter per città singola aggiunto');
    }

    // Event listener per il campo multicity (confronto)
    const multiCitiesInput = document.getElementById('multiCitiesInput');
    if (multiCitiesInput) {
        multiCitiesInput.addEventListener('keypress', function (event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                console.log('🔍 Confronto città');
                compareCitiesInput();
            }
        });
        console.log('✅ Event listener Enter per confronto città aggiunto');
    } else {
        console.warn('⚠️ Elemento multiCitiesInput non trovato - assicurati che esista nel HTML');
    }

    console.log('✅ App inizializzata');
});

// Rendi funzioni globali per l'HTML
window.searchWeather = searchWeather;
window.refreshWeather = refreshWeather;
window.compareCitiesInput = compareCitiesInput;