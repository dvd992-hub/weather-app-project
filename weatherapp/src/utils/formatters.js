// Tutte le funzioni di formattazione e utility

/**
 * Converte il codice meteo in descrizione testuale con emoji
 */
export function getWeatherDescription(code) {
    const weatherCodes = {
        0: '☀️ Sereno',
        1: '🌤️ Principalmente sereno',
        2: '⛅ Parzialmente nuvoloso',
        3: '☁️ Nuvoloso',
        45: '🌫️ Nebbia',
        48: '🌫️ Nebbia con brina',
        51: '💧 Pioviggine leggera',
        53: '💧 Pioviggine moderata',
        55: '💧 Pioviggine densa',
        56: '💧 Pioviggine gelata',
        57: '💧 Pioviggine gelata densa',
        61: '🌧️ Pioggia leggera',
        63: '🌧️ Pioggia moderata',
        65: '🌧️ Pioggia intensa',
        66: '🌧️ Pioggia gelata leggera',
        67: '🌧️ Pioggia gelata intensa',
        71: '❄️ Neve leggera',
        73: '❄️ Neve moderata',
        75: '❄️ Neve intensa',
        77: '❄️ Granelli di neve',
        80: '🌧️ Rovesci leggeri',
        81: '🌧️ Rovesci moderati',
        82: '🌧️ Rovesci violenti',
        85: '❄️ Rovesci di neve leggeri',
        86: '❄️ Rovesci di neve intensi',
        95: '⛈️ Temporale',
        96: '⛈️ Temporale con grandine leggera',
        99: '⛈️ Temporale con grandine intensa'
    };
    return weatherCodes[code] || '❓ Condizioni sconosciute';
}

/**
 * Formatta la temperatura con unità di misura
 */
export function formatTemperature(temp, unit = 'celsius') {
    if (unit === 'celsius') {
        return `${Math.round(temp)}°C`;
    } else if (unit === 'fahrenheit') {
        const fahrenheit = (temp * 9 / 5) + 32;
        return `${Math.round(fahrenheit)}°F`;
    }
    return `${temp}°`;
}

/**
 * Formatta la velocità del vento
 */
export function formatWindSpeed(speed, unit = 'kmh') {
    if (unit === 'kmh') {
        return `${speed} km/h`;
    } else if (unit === 'ms') {
        return `${(speed / 3.6).toFixed(1)} m/s`;
    } else if (unit === 'mph') {
        return `${(speed / 1.609).toFixed(1)} mph`;
    }
    return `${speed} km/h`;
}

/**
 * Formatta la data
 */
export function formatDate(date, format = 'time') {
    const d = new Date(date);
    if (format === 'time') {
        return d.toLocaleTimeString('it-IT');
    } else if (format === 'date') {
        return d.toLocaleDateString('it-IT');
    } else if (format === 'datetime') {
        return d.toLocaleString('it-IT');
    } else if (format === 'weekday') {
        return d.toLocaleDateString('it-IT', { weekday: 'short' });
    } else if (format === 'full') {
        return d.toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long' });
    }
    return d.toLocaleTimeString('it-IT');
}

/**
 * Formatta il nome della città
 */
export function formatCityName(name, country) {
    return `📍 ${name}, ${country}`;
}

/**
 * Calcola l'umidità stimata in base al codice meteo
 */
export function getEstimatedHumidity(weatherCode) {
    if ([45, 48, 51, 53, 55, 61, 63, 65, 80, 81, 82].includes(weatherCode)) {
        return '85-95%';
    }
    if ([71, 73, 75, 77, 85, 86].includes(weatherCode)) {
        return '70-85%';
    }
    if ([0, 1].includes(weatherCode)) {
        return '40-55%';
    }
    if ([2, 3].includes(weatherCode)) {
        return '55-70%';
    }
    if ([95, 96, 99].includes(weatherCode)) {
        return '80-95%';
    }
    return '60-75%';
}

/**
 * Ottiene l'icona appropriata per il codice meteo
 */
export function getWeatherIcon(code) {
    if (code === 0) return '☀️';
    if ([1, 2]) return '🌤️';
    if (code === 3) return '☁️';
    if ([45, 48]) return '🌫️';
    if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82]) return '🌧️';
    if ([71, 73, 75, 77, 85, 86]) return '❄️';
    if ([95, 96, 99]) return '⛈️';
    return '🌡️';
}