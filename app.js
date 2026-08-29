/**
 * ==========================================================================
 * Ob-Havo PRO — Ultra Next-Gen Weather Platform
 * Open-Meteo Forecast & Air Quality API Integration
 * Multi-Language, Atmosphere Canvas Engine, Interactive Chart & Audio
 * ==========================================================================
 */

// Global State
const appState = {
  lang: 'uz', // 'uz' | 'ru' | 'en'
  unit: 'c',  // 'c' | 'f'
  currentCity: {
    name: 'Toshkent',
    country: "O'zbekiston",
    lat: 41.2646,
    lon: 69.2163
  },
  weatherData: null,
  airQualityData: null,
  isAudioPlaying: false,
  audioContext: null,
  audioGain: null,
  activeWeatherTheme: 'clear-day',
  hourlyViewMode: 'track', // 'track' | 'chart'
  favorites: JSON.parse(localStorage.getItem('obhavo_favs') || '[]'),
  debounceTimer: null
};

// ==========================================================================
// Multi-Language Dictionary
// ==========================================================================
const i18n = {
  uz: {
    liveWeather: 'Jonli Meteorologik Tizim',
    searchPlaceholder: 'Shahar qidiring... (Toshkent, Samarqand, London...) [ / ]',
    myLocation: 'Joylashuvim',
    popular: 'Tanlangan:',
    fetchingData: 'Ob-havo ma\'lumotlari tahlil qilinmoqda...',
    connectingApi: 'Open-Meteo Sun\'iy Yo\'ldosh & Radar API ga ulanmoqda',
    retry: 'Qayta urinish',
    today: 'Bugun',
    tomorrow: 'Ertaga',
    feelsLike: 'His qilinishi',
    maxTemp: 'Maksimal',
    minTemp: 'Minimal',
    rainChance: 'Yog\'in ehtimoli',
    wind: 'Shamol',
    hourlyTitle: '24 Soatlik Dinamik Prognoz',
    weeklyTitle: '7 Kunlik Kengaytirilgan Prognoz',
    windRadar: 'Shamol Kompasi',
    airQuality: 'Havo Sifati (AQI)',
    sunTracker: 'Quyosh Vaqtlari',
    uvIndex: 'UV Indeksi',
    humidity: 'Namlik & Shudring',
    visibility: 'Ko\'rinuvchanlik',
    sunrise: 'Chiqishi',
    sunset: 'Botishi',
    pressure: 'Bosim:',
    dewPoint: 'Shudring nuqtasi:',
    cloudCover: 'Bulut qoplami:',
    precipitation: 'Yog\'in:',
    tipsTitle: 'Kunlik Maslahatlar',
    clothing: 'Kiyinish',
    outdoor: 'Ochiq havo mashg\'uloti',
    carWash: 'Avtomobil yuvish',
    apiDescription: 'Global ECMWF, GFS va ICON yuqori aniqlikdagi meteorologik modellar asosida yangilanadi.',
    searchNotFound: 'Natija topilmadi',
    gpsDenied: 'Joylashuvni aniqlashga ruxsat berilmadi',
    aqiGood: 'Toza & Ajoyib',
    aqiModerate: 'O\'rtacha daraja',
    aqiUnhealthy: 'Sezuvchanlar uchun zararli',
    aqiVeryUnhealthy: 'Yuqori ifloslangan'
  },
  ru: {
    liveWeather: 'Живая Метеорологическая Система',
    searchPlaceholder: 'Поиск города... (Ташкент, Самарканд, Москва...) [ / ]',
    myLocation: 'Мое местоположение',
    popular: 'Избранное:',
    fetchingData: 'Анализ данных о погоде...',
    connectingApi: 'Подключение к спутниковому API Open-Meteo',
    retry: 'Повторить',
    today: 'Сегодня',
    tomorrow: 'Завтра',
    feelsLike: 'Ощущается как',
    maxTemp: 'Максимум',
    minTemp: 'Минимум',
    rainChance: 'Вероятность осадков',
    wind: 'Ветер',
    hourlyTitle: '24-часовой динамический прогноз',
    weeklyTitle: '7-дневный расширенный прогноз',
    windRadar: 'Компас ветра',
    airQuality: 'Качество воздуха (AQI)',
    sunTracker: 'Солнце и световой день',
    uvIndex: 'УФ-индекс',
    humidity: 'Влажность и точка росы',
    visibility: 'Видимость',
    sunrise: 'Восход',
    sunset: 'Закат',
    pressure: 'Давление:',
    dewPoint: 'Точка росы:',
    cloudCover: 'Облачность:',
    precipitation: 'Осадки:',
    tipsTitle: 'Ежедневные советы',
    clothing: 'Одежда',
    outdoor: 'Активность на воздухе',
    carWash: 'Мойка машины',
    apiDescription: 'Обновляется на основе глобальных метеомоделей ECMWF, GFS и ICON.',
    searchNotFound: 'Город не найден',
    gpsDenied: 'Доступ к геолокации отклонен',
    aqiGood: 'Чистый и отличный',
    aqiModerate: 'Умеренное качество',
    aqiUnhealthy: 'Вредно для чувствительных',
    aqiVeryUnhealthy: 'Сильно загрязненный'
  },
  en: {
    liveWeather: 'Live Meteorological Platform',
    searchPlaceholder: 'Search city... (Tashkent, Samarkand, London...) [ / ]',
    myLocation: 'My Location',
    popular: 'Featured:',
    fetchingData: 'Analyzing real-time atmospheric data...',
    connectingApi: 'Connecting to Open-Meteo Satellite & Radar API',
    retry: 'Retry',
    today: 'Today',
    tomorrow: 'Tomorrow',
    feelsLike: 'Feels like',
    maxTemp: 'Max Temp',
    minTemp: 'Min Temp',
    rainChance: 'Precipitation',
    wind: 'Wind Speed',
    hourlyTitle: '24-Hour Dynamic Forecast',
    weeklyTitle: '7-Day Extended Forecast',
    windRadar: 'Wind Compass',
    airQuality: 'Air Quality (AQI)',
    sunTracker: 'Sun & Daylight Tracker',
    uvIndex: 'UV Index',
    humidity: 'Humidity & Dew Point',
    visibility: 'Visibility',
    sunrise: 'Sunrise',
    sunset: 'Sunset',
    pressure: 'Pressure:',
    dewPoint: 'Dew point:',
    cloudCover: 'Cloud cover:',
    precipitation: 'Precipitation:',
    tipsTitle: 'Daily Lifestyle Insights',
    clothing: 'Clothing',
    outdoor: 'Outdoor Activities',
    carWash: 'Car Wash',
    apiDescription: 'Powered by high-precision ECMWF, GFS and ICON meteorological models.',
    searchNotFound: 'City not found',
    gpsDenied: 'Geolocation permission denied',
    aqiGood: 'Clean & Excellent',
    aqiModerate: 'Moderate Quality',
    aqiUnhealthy: 'Unhealthy for Sensitive Groups',
    aqiVeryUnhealthy: 'Very Unhealthy'
  }
};

// ==========================================================================
// WMO Weather Interpretation Codes Dictionary
// ==========================================================================
const WMO_MAP = {
  0: { uz: 'Ochiq quyoshli', ru: 'Ясно и солнечно', en: 'Clear Sky', iconDay: 'sun', iconNight: 'moon', theme: 'clear' },
  1: { uz: 'Asosan ochiq', ru: 'Преимущественно ясно', en: 'Mainly Clear', iconDay: 'cloud-sun', iconNight: 'cloud-moon', theme: 'clear' },
  2: { uz: 'Qisman bulutli', ru: 'Переменная облачность', en: 'Partly Cloudy', iconDay: 'cloud-sun', iconNight: 'cloud-moon', theme: 'cloudy' },
  3: { uz: 'Bulutli', ru: 'Пасмурно', en: 'Overcast', iconDay: 'cloud', iconNight: 'cloud', theme: 'cloudy' },
  45: { uz: 'Tumanli havo', ru: 'Туман', en: 'Foggy', iconDay: 'cloud-fog', iconNight: 'cloud-fog', theme: 'foggy' },
  48: { uz: 'Qirovli tuman', ru: 'Осаждающий иней туман', en: 'Depositing Rime Fog', iconDay: 'cloud-fog', iconNight: 'cloud-fog', theme: 'foggy' },
  51: { uz: 'Yengil shivalash', ru: 'Легкая морось', en: 'Light Drizzle', iconDay: 'cloud-drizzle', iconNight: 'cloud-drizzle', theme: 'rainy' },
  53: { uz: 'O\'rtacha shivalash', ru: 'Умеренная морось', en: 'Moderate Drizzle', iconDay: 'cloud-drizzle', iconNight: 'cloud-drizzle', theme: 'rainy' },
  55: { uz: 'Kuchli shivalash', ru: 'Плотная морось', en: 'Dense Drizzle', iconDay: 'cloud-drizzle', iconNight: 'cloud-drizzle', theme: 'rainy' },
  56: { uz: 'Muzlaydigan yengil shivalash', ru: 'Ледяная морось', en: 'Freezing Drizzle', iconDay: 'cloud-hail', iconNight: 'cloud-hail', theme: 'snowy' },
  57: { uz: 'Kuchli muzli shivalash', ru: 'Сильная ледяная морось', en: 'Dense Freezing Drizzle', iconDay: 'cloud-hail', iconNight: 'cloud-hail', theme: 'snowy' },
  61: { uz: 'Yengil yomg\'ir', ru: 'Небольшой дождь', en: 'Slight Rain', iconDay: 'cloud-rain', iconNight: 'cloud-rain', theme: 'rainy' },
  63: { uz: 'O\'rtacha yomg\'ir', ru: 'Умеренный дождь', en: 'Moderate Rain', iconDay: 'cloud-rain', iconNight: 'cloud-rain', theme: 'rainy' },
  65: { uz: 'Kuchli yomg\'ir', ru: 'Сильный дождь', en: 'Heavy Rain', iconDay: 'cloud-rain', iconNight: 'cloud-rain', theme: 'rainy' },
  66: { uz: 'Muzli yomg\'ir', ru: 'Ледяной дождь', en: 'Freezing Rain', iconDay: 'cloud-rain-wind', iconNight: 'cloud-rain-wind', theme: 'rainy' },
  67: { uz: 'Kuchli muzli yomg\'ir', ru: 'Сильный ледяной дождь', en: 'Heavy Freezing Rain', iconDay: 'cloud-rain-wind', iconNight: 'cloud-rain-wind', theme: 'rainy' },
  71: { uz: 'Yengil qor yog\'ishi', ru: 'Небольшой снегопад', en: 'Slight Snow Fall', iconDay: 'snowflake', iconNight: 'snowflake', theme: 'snowy' },
  73: { uz: 'O\'rtacha qor', ru: 'Умеренный снегопад', en: 'Moderate Snow Fall', iconDay: 'snowflake', iconNight: 'snowflake', theme: 'snowy' },
  75: { uz: 'Kuchli qor yog\'ishi', ru: 'Сильный снегопад', en: 'Heavy Snow Fall', iconDay: 'snowflake', iconNight: 'snowflake', theme: 'snowy' },
  77: { uz: 'Qor donachalari', ru: 'Снежные зерна', en: 'Snow Grains', iconDay: 'snowflake', iconNight: 'snowflake', theme: 'snowy' },
  80: { uz: 'Qisqa muddatli yomg\'ir', ru: 'Кратковременный ливень', en: 'Slight Rain Showers', iconDay: 'cloud-rain', iconNight: 'cloud-rain', theme: 'rainy' },
  81: { uz: 'O\'rtacha jala', ru: 'Умеренный ливень', en: 'Moderate Rain Showers', iconDay: 'cloud-rain', iconNight: 'cloud-rain', theme: 'rainy' },
  82: { uz: 'Kuchli shiddatli jala', ru: 'Сильный ливень', en: 'Violent Rain Showers', iconDay: 'cloud-rain', iconNight: 'cloud-rain', theme: 'rainy' },
  85: { uz: 'Yengil qor bo\'roni', ru: 'Легкая метель', en: 'Slight Snow Showers', iconDay: 'cloud-snow', iconNight: 'cloud-snow', theme: 'snowy' },
  86: { uz: 'Kuchli qor bo\'roni', ru: 'Сильная метель', en: 'Heavy Snow Showers', iconDay: 'cloud-snow', iconNight: 'cloud-snow', theme: 'snowy' },
  95: { uz: 'Momaqaldiroq', ru: 'Гроза', en: 'Thunderstorm', iconDay: 'cloud-lightning', iconNight: 'cloud-lightning', theme: 'thunderstorm' },
  96: { uz: 'Momaqaldiroq va do\'l', ru: 'Гроза с градом', en: 'Thunderstorm with Hail', iconDay: 'cloud-lightning', iconNight: 'cloud-lightning', theme: 'thunderstorm' },
  99: { uz: 'Kuchli do\'lli bo\'ron', ru: 'Сильная гроза с градом', en: 'Severe Hail Thunderstorm', iconDay: 'cloud-lightning', iconNight: 'cloud-lightning', theme: 'thunderstorm' }
};

// Days and Months Names
const DATE_I18N = {
  uz: {
    days: ['Yakshanba', 'Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba'],
    daysShort: ['Yak', 'Dush', 'Sesh', 'Chor', 'Pay', 'Jum', 'Shan'],
    months: ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr']
  },
  ru: {
    days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
    daysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    months: ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря']
  },
  en: {
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  }
};

// ==========================================================================
// DOM Element Selectors
// ==========================================================================
const dom = {
  cityInput: document.getElementById('cityInput'),
  clearSearch: document.getElementById('clearSearch'),
  searchSuggestions: document.getElementById('searchSuggestions'),
  cityChipsTrack: document.getElementById('cityChipsTrack'),
  soundToggleBtn: document.getElementById('soundToggleBtn'),
  langBtn: document.getElementById('langBtn'),
  langMenu: document.getElementById('langMenu'),
  currentLangLabel: document.getElementById('currentLangLabel'),
  geoLocateBtn: document.getElementById('geoLocateBtn'),
  loaderBox: document.getElementById('loaderBox'),
  errorBox: document.getElementById('errorBox'),
  errorTitle: document.getElementById('errorTitle'),
  errorDescription: document.getElementById('errorDescription'),
  retryButton: document.getElementById('retryButton'),
  weatherGrid: document.getElementById('weatherGrid'),
  
  // Hero Display
  cityNameDisplay: document.getElementById('cityNameDisplay'),
  countryNameDisplay: document.getElementById('countryNameDisplay'),
  geoCoordsDisplay: document.getElementById('geoCoordsDisplay'),
  favoriteToggleBtn: document.getElementById('favoriteToggleBtn'),
  localTimeDisplay: document.getElementById('localTimeDisplay'),
  dateDisplay: document.getElementById('dateDisplay'),
  heroIconContainer: document.getElementById('heroIconContainer'),
  mainTempDigit: document.getElementById('mainTempDigit'),
  mainTempUnit: document.getElementById('mainTempUnit'),
  weatherSummaryText: document.getElementById('weatherSummaryText'),
  feelsLikeText: document.getElementById('feelsLikeText'),
  heroMaxTemp: document.getElementById('heroMaxTemp'),
  heroMinTemp: document.getElementById('heroMinTemp'),
  heroRainChance: document.getElementById('heroRainChance'),
  heroWindShort: document.getElementById('heroWindShort'),

  // Hourly Section
  viewTrackBtn: document.getElementById('viewTrackBtn'),
  viewChartBtn: document.getElementById('viewChartBtn'),
  hourlyCardsView: document.getElementById('hourlyCardsView'),
  hourlyChartView: document.getElementById('hourlyChartView'),
  hourlyTimeline: document.getElementById('hourlyTimeline'),
  hourlySvgChart: document.getElementById('hourlySvgChart'),
  chartTooltip: document.getElementById('chartTooltip'),

  // Matrix Mini Cards
  compassNeedle: document.getElementById('compassNeedle'),
  compassSpeed: document.getElementById('compassSpeed'),
  compassDirName: document.getElementById('compassDirName'),
  compassGusts: document.getElementById('compassGusts'),
  aqiNumber: document.getElementById('aqiNumber'),
  aqiStatusBadge: document.getElementById('aqiStatusBadge'),
  aqiPm25: document.getElementById('aqiPm25'),
  aqiPm10: document.getElementById('aqiPm10'),
  sunOrb: document.getElementById('sunOrb'),
  sunArcProgress: document.getElementById('sunArcProgress'),
  sunriseTime: document.getElementById('sunriseTime'),
  sunsetTime: document.getElementById('sunsetTime'),
  uvValue: document.getElementById('uvValue'),
  uvBadge: document.getElementById('uvBadge'),
  uvBarFill: document.getElementById('uvBarFill'),
  uvAdvice: document.getElementById('uvAdvice'),
  humidityVal: document.getElementById('humidityVal'),
  humidityStatus: document.getElementById('humidityStatus'),
  pressureVal: document.getElementById('pressureVal'),
  dewPointVal: document.getElementById('dewPointVal'),
  visibilityVal: document.getElementById('visibilityVal'),
  visibilityStatus: document.getElementById('visibilityStatus'),
  cloudCoverVal: document.getElementById('cloudCoverVal'),
  precipSumVal: document.getElementById('precipSumVal'),

  // Weekly & Tips
  weeklyRangeList: document.getElementById('weeklyRangeList'),
  lifestyleTips: document.getElementById('lifestyleTips'),
  canvas: document.getElementById('weatherCanvas')
};

// ==========================================================================
// Initialization
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  initAtmosphereCanvas();
  bindEventHandlers();
  updateI18nText();
  renderFavoritesInRibbon();
  fetchFullWeatherData(appState.currentCity.lat, appState.currentCity.lon, appState.currentCity.name, appState.currentCity.country);
  startTimeTicker();
});

// Realtime Clock Ticker
function startTimeTicker() {
  const updateTime = () => {
    const now = new Date();
    const h = now.getHours().toString().padStart(2, '0');
    const m = now.getMinutes().toString().padStart(2, '0');
    if (dom.localTimeDisplay) dom.localTimeDisplay.textContent = `${h}:${m}`;
  };
  updateTime();
  setInterval(updateTime, 10000);
}

// ==========================================================================
// Event Listeners
// ==========================================================================
function bindEventHandlers() {
  // Search Input
  dom.cityInput.addEventListener('input', (e) => {
    const q = e.target.value.trim();
    if (q.length > 0) {
      dom.clearSearch.style.display = 'flex';
    } else {
      dom.clearSearch.style.display = 'none';
      dom.searchSuggestions.style.display = 'none';
      return;
    }

    clearTimeout(appState.debounceTimer);
    appState.debounceTimer = setTimeout(() => {
      executeGeocodingSearch(q);
    }, 300);
  });

  // Clear Search
  dom.clearSearch.addEventListener('click', () => {
    dom.cityInput.value = '';
    dom.clearSearch.style.display = 'none';
    dom.searchSuggestions.style.display = 'none';
    dom.cityInput.focus();
  });

  // Keyboard shortcut '/' to search
  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement !== dom.cityInput) {
      e.preventDefault();
      dom.cityInput.focus();
      dom.cityInput.select();
    } else if (e.key === 'Escape') {
      dom.searchSuggestions.style.display = 'none';
      dom.langMenu.style.display = 'none';
    }
  });

  // Click outside to close dropdowns
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-container')) {
      dom.searchSuggestions.style.display = 'none';
    }
    if (!e.target.closest('.lang-selector')) {
      dom.langMenu.style.display = 'none';
    }
  });

  // Language Button Toggle
  dom.langBtn.addEventListener('click', () => {
    const isVisible = dom.langMenu.style.display === 'block';
    dom.langMenu.style.display = isVisible ? 'none' : 'block';
  });

  // Language Menu Options
  document.querySelectorAll('.lang-option').forEach(opt => {
    opt.addEventListener('click', () => {
      const selected = opt.dataset.lang;
      appState.lang = selected;
      dom.currentLangLabel.textContent = selected.toUpperCase();
      document.querySelectorAll('.lang-option').forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
      dom.langMenu.style.display = 'none';
      updateI18nText();
      if (appState.weatherData) {
        renderFullWeather(appState.weatherData, appState.airQualityData);
      }
    });
  });

  // Unit Switcher (°C / °F)
  document.querySelectorAll('.unit-choice').forEach(btn => {
    btn.addEventListener('click', () => {
      const u = btn.dataset.unit;
      if (u === appState.unit) return;
      appState.unit = u;
      document.querySelectorAll('.unit-choice').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (appState.weatherData) {
        renderFullWeather(appState.weatherData, appState.airQualityData);
      }
    });
  });

  // Quick City Ribbon
  dom.cityChipsTrack.addEventListener('click', (e) => {
    const pill = e.target.closest('.city-pill');
    if (!pill) return;

    document.querySelectorAll('.city-pill').forEach(p => p.classList.remove('active'));
    pill.classList.add('active');

    const lat = parseFloat(pill.dataset.lat);
    const lon = parseFloat(pill.dataset.lon);
    const name = pill.dataset.name;
    const country = pill.dataset.country;

    appState.currentCity = { name, country, lat, lon };
    fetchFullWeatherData(lat, lon, name, country);
  });

  // Favorite Bookmark Button
  dom.favoriteToggleBtn.addEventListener('click', () => {
    toggleFavoriteCity(appState.currentCity);
  });

  // Hourly View Toggle (Track / Chart)
  dom.viewTrackBtn.addEventListener('click', () => {
    appState.hourlyViewMode = 'track';
    dom.viewTrackBtn.classList.add('active');
    dom.viewChartBtn.classList.remove('active');
    dom.hourlyCardsView.style.display = 'block';
    dom.hourlyChartView.style.display = 'none';
  });

  dom.viewChartBtn.addEventListener('click', () => {
    appState.hourlyViewMode = 'chart';
    dom.viewChartBtn.classList.add('active');
    dom.viewTrackBtn.classList.remove('active');
    dom.hourlyCardsView.style.display = 'none';
    dom.hourlyChartView.style.display = 'block';
    if (appState.weatherData) {
      renderSvgChart(appState.weatherData.hourly);
    }
  });

  // GPS Geolocation
  dom.geoLocateBtn.addEventListener('click', triggerGeolocation);

  // Sound Synthesizer Toggle
  dom.soundToggleBtn.addEventListener('click', toggleAmbientSound);

  // Retry
  dom.retryButton.addEventListener('click', () => {
    fetchFullWeatherData(appState.currentCity.lat, appState.currentCity.lon, appState.currentCity.name, appState.currentCity.country);
  });
}

// ==========================================================================
// Geocoding Search & Auto-complete
// ==========================================================================
async function executeGeocodingSearch(query) {
  try {
    const langCode = appState.lang === 'ru' ? 'ru' : (appState.lang === 'en' ? 'en' : 'uz');
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=6&language=${langCode}&format=json`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Search failed');
    const data = await res.json();
    displaySearchSuggestions(data.results || []);
  } catch (err) {
    console.error('Geocoding error:', err);
    dom.searchSuggestions.innerHTML = `<div class="suggest-item"><span>${i18n[appState.lang].searchNotFound}</span></div>`;
    dom.searchSuggestions.style.display = 'block';
  }
}

function displaySearchSuggestions(results) {
  if (!results || results.length === 0) {
    dom.searchSuggestions.innerHTML = `<div class="suggest-item"><span>${i18n[appState.lang].searchNotFound}</span></div>`;
    dom.searchSuggestions.style.display = 'block';
    return;
  }

  dom.searchSuggestions.innerHTML = results.map(city => {
    const admin = city.admin1 ? `, ${city.admin1}` : '';
    const country = city.country || '';
    return `
      <div class="suggest-item" data-lat="${city.latitude}" data-lon="${city.longitude}" data-name="${city.name}" data-country="${country}">
        <div class="suggest-main">
          <i data-lucide="map-pin"></i>
          <span>${city.name}${admin}</span>
        </div>
        <span class="suggest-country">${country}</span>
      </div>
    `;
  }).join('');

  dom.searchSuggestions.style.display = 'block';
  lucide.createIcons();

  dom.searchSuggestions.querySelectorAll('.suggest-item').forEach(item => {
    item.addEventListener('click', () => {
      const lat = parseFloat(item.dataset.lat);
      const lon = parseFloat(item.dataset.lon);
      const name = item.dataset.name;
      const country = item.dataset.country;

      appState.currentCity = { name, country, lat, lon };
      dom.cityInput.value = name;
      dom.searchSuggestions.style.display = 'none';

      // Update active chip
      document.querySelectorAll('.city-pill').forEach(p => {
        if (p.dataset.name.toLowerCase() === name.toLowerCase()) {
          p.classList.add('active');
        } else {
          p.classList.remove('active');
        }
      });

      fetchFullWeatherData(lat, lon, name, country);
    });
  });
}

// ==========================================================================
// GPS Geolocation
// ==========================================================================
function triggerGeolocation() {
  if (!navigator.geolocation) {
    alert(i18n[appState.lang].gpsDenied);
    return;
  }

  dom.geoLocateBtn.classList.add('loading');
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      dom.geoLocateBtn.classList.remove('loading');
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;

      appState.currentCity = {
        name: appState.lang === 'ru' ? 'Мое местоположение' : (appState.lang === 'en' ? 'My Location' : 'Mening joylashuvim'),
        country: 'GPS Radar',
        lat,
        lon
      };

      document.querySelectorAll('.city-pill').forEach(p => p.classList.remove('active'));
      fetchFullWeatherData(lat, lon, appState.currentCity.name, 'GPS Radar');
    },
    (err) => {
      dom.geoLocateBtn.classList.remove('loading');
      alert(i18n[appState.lang].gpsDenied);
    }
  );
}

// ==========================================================================
// Favorite Cities (LocalStorage)
// ==========================================================================
function toggleFavoriteCity(city) {
  const index = appState.favorites.findIndex(f => f.name.toLowerCase() === city.name.toLowerCase());
  if (index > -1) {
    appState.favorites.splice(index, 1);
    dom.favoriteToggleBtn.classList.remove('active');
  } else {
    appState.favorites.push(city);
    dom.favoriteToggleBtn.classList.add('active');
  }
  localStorage.setItem('obhavo_favs', JSON.stringify(appState.favorites));
  renderFavoritesInRibbon();
}

function updateFavoriteButtonState() {
  const exists = appState.favorites.some(f => f.name.toLowerCase() === appState.currentCity.name.toLowerCase());
  if (exists) {
    dom.favoriteToggleBtn.classList.add('active');
  } else {
    dom.favoriteToggleBtn.classList.remove('active');
  }
}

function renderFavoritesInRibbon() {
  // If user has custom favorites, ensure they appear in chips
  const defaultCities = [
    { name: 'Toshkent', country: "O'zbekiston", lat: 41.2646, lon: 69.2163 },
    { name: 'Samarqand', country: "O'zbekiston", lat: 39.6542, lon: 66.9597 },
    { name: 'Buxoro', country: "O'zbekiston", lat: 39.7747, lon: 64.4286 },
    { name: 'Andijon', country: "O'zbekiston", lat: 40.7821, lon: 72.3442 },
    { name: 'Namangan', country: "O'zbekiston", lat: 40.9983, lon: 71.6726 },
    { name: 'Farg\'ona', country: "O'zbekiston", lat: 40.3842, lon: 71.7843 },
    { name: 'Xiva', country: "O'zbekiston", lat: 41.3783, lon: 60.3639 },
    { name: 'Nukus', country: "O'zbekiston", lat: 42.4602, lon: 59.6166 },
    { name: 'Qarshi', country: "O'zbekiston", lat: 38.8606, lon: 65.7891 },
    { name: 'Termiz', country: "O'zbekiston", lat: 37.2242, lon: 67.2783 }
  ];

  // Merge favorites and defaults uniquely
  const allPills = [...appState.favorites];
  defaultCities.forEach(d => {
    if (!allPills.some(p => p.name.toLowerCase() === d.name.toLowerCase())) {
      allPills.push(d);
    }
  });

  dom.cityChipsTrack.innerHTML = allPills.map(p => {
    const isActive = p.name.toLowerCase() === appState.currentCity.name.toLowerCase();
    const isFav = appState.favorites.some(f => f.name.toLowerCase() === p.name.toLowerCase());
    return `
      <button class="city-pill ${isActive ? 'active' : ''}" data-lat="${p.lat}" data-lon="${p.lon}" data-name="${p.name}" data-country="${p.country}">
        ${isFav ? '<i data-lucide="heart" style="width: 13px; height: 13px; color: #fb7185;"></i>' : '<span class="pill-dot"></span>'}
        ${p.name}
      </button>
    `;
  }).join('');

  lucide.createIcons();
}

// ==========================================================================
// Weather & Air Quality API Fetcher
// ==========================================================================
async function fetchFullWeatherData(lat, lon, name, country) {
  showLoader();

  try {
    // 1. Weather Forecast URL
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m,cloud_cover&hourly=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,precipitation_probability,dew_point_2m,visibility&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_sum,precipitation_probability_max&timezone=auto`;

    // 2. Air Quality URL
    const aqiUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=european_aqi,us_aqi,pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,ozone&timezone=auto`;

    // Concurrent fetching
    const [weatherRes, aqiRes] = await Promise.allSettled([
      fetch(weatherUrl),
      fetch(aqiUrl)
    ]);

    if (weatherRes.status !== 'fulfilled' || !weatherRes.value.ok) {
      throw new Error('Weather API error');
    }

    const weatherJson = await weatherRes.value.json();
    let aqiJson = null;
    if (aqiRes.status === 'fulfilled' && aqiRes.value.ok) {
      aqiJson = await aqiRes.value.json();
    }

    appState.weatherData = weatherJson;
    appState.airQualityData = aqiJson;

    renderFullWeather(weatherJson, aqiJson);
    showContent();
  } catch (err) {
    console.error('Fetch error:', err);
    showErrorScreen();
  }
}

// ==========================================================================
// Render All Dashboard Components
// ==========================================================================
function renderFullWeather(weather, aqi) {
  const cur = weather.current;
  const daily = weather.daily;
  const hourly = weather.hourly;
  const isDay = cur.is_day === 1;

  const wCode = WMO_MAP[cur.weather_code] || {
    uz: 'Ob-havo', ru: 'Погода', en: 'Weather',
    iconDay: 'cloud-sun', iconNight: 'cloud-moon', theme: 'clear'
  };

  // 1. Update Theme & Atmosphere Engine
  appState.activeWeatherTheme = getThemeName(wCode.theme, isDay);
  updateBodyThemeClass(appState.activeWeatherTheme);
  setCanvasAtmosphere(wCode.theme, isDay);

  // 2. Update Location & Header
  dom.cityNameDisplay.textContent = appState.currentCity.name;
  dom.countryNameDisplay.textContent = appState.currentCity.country;
  dom.geoCoordsDisplay.textContent = `${weather.latitude.toFixed(2)}°N, ${weather.longitude.toFixed(2)}°E`;
  updateFavoriteButtonState();

  // Date representation
  const now = new Date();
  const langObj = DATE_I18N[appState.lang];
  const dayName = langObj.days[now.getDay()];
  const monthName = langObj.months[now.getMonth()];
  dom.dateDisplay.textContent = `${dayName}, ${now.getDate()}-${monthName}`;

  // 3. Hero Temperature & Condition
  dom.mainTempDigit.textContent = formatTemperature(cur.temperature_2m);
  dom.mainTempUnit.textContent = getUnitSymbol();
  dom.weatherSummaryText.textContent = wCode[appState.lang] || wCode.uz;
  dom.feelsLikeText.textContent = `${i18n[appState.lang].feelsLike}: ${formatTemperature(cur.apparent_temperature)}${getUnitSymbol()}`;

  const currentIcon = isDay ? wCode.iconDay : wCode.iconNight;
  dom.heroIconContainer.innerHTML = `<i data-lucide="${currentIcon}" class="hero-icon-svg"></i>`;

  // Hero Footer Stats
  if (daily && daily.temperature_2m_max) {
    dom.heroMaxTemp.textContent = `${formatTemperature(daily.temperature_2m_max[0])}${getUnitSymbol()}`;
    dom.heroMinTemp.textContent = `${formatTemperature(daily.temperature_2m_min[0])}${getUnitSymbol()}`;
    dom.heroRainChance.textContent = `${daily.precipitation_probability_max ? daily.precipitation_probability_max[0] : 0}%`;
  }
  dom.heroWindShort.textContent = `${Math.round(cur.wind_speed_10m)} km/h`;

  // 4. Hourly Forecast Section
  renderHourlyTimeline(hourly);
  if (appState.hourlyViewMode === 'chart') {
    renderSvgChart(hourly);
  }

  // 5. Matrix Mini Cards
  renderWindCompass(cur.wind_speed_10m, cur.wind_direction_10m, cur.wind_gusts_10m);
  renderAirQuality(aqi);
  renderSunArc(daily);
  renderUvIndex(daily);
  renderHumidityAndDewPoint(cur, hourly);
  renderVisibilityAndCloudiness(cur, hourly, daily);

  // 6. 7-Day Apple-Style Range Bars Forecast
  renderWeeklyRangeBars(daily);

  // 7. Lifestyle Insights & Tips
  renderLifestyleTips(cur, daily);

  // Re-generate Lucide Icons
  lucide.createIcons();
}

// ==========================================================================
// Hourly Forecast (Cards & Smooth SVG Spline Chart)
// ==========================================================================
function renderHourlyTimeline(hourly) {
  if (!hourly || !hourly.time) return;

  const nowIso = new Date().toISOString().slice(0, 13);
  let startIndex = hourly.time.findIndex(t => t.startsWith(nowIso));
  if (startIndex === -1) startIndex = 0;

  const hours24 = hourly.time.slice(startIndex, startIndex + 24);

  dom.hourlyTimeline.innerHTML = hours24.map((timeStr, idx) => {
    const actIdx = startIndex + idx;
    const date = new Date(timeStr);
    const h = date.getHours().toString().padStart(2, '0');
    const isNow = idx === 0;
    const timeLabel = isNow ? (i18n[appState.lang].today) : `${h}:00`;
    const temp = formatTemperature(hourly.temperature_2m[actIdx]);
    const code = hourly.weather_code[actIdx];
    const codeObj = WMO_MAP[code] || { iconDay: 'sun', iconNight: 'moon' };
    const hourIsDay = date.getHours() >= 6 && date.getHours() < 20;
    const icon = hourIsDay ? codeObj.iconDay : codeObj.iconNight;
    const pop = hourly.precipitation_probability ? hourly.precipitation_probability[actIdx] : 0;

    return `
      <div class="hourly-node ${isNow ? 'active-now' : ''}">
        <span class="hourly-node-time">${timeLabel}</span>
        <div class="hourly-node-icon">
          <i data-lucide="${icon}"></i>
        </div>
        <span class="hourly-node-temp">${temp}${getUnitSymbol()}</span>
        ${pop > 0 ? `<span class="hourly-node-rain"><i data-lucide="droplets" style="width: 11px; height: 11px;"></i> ${pop}%</span>` : ''}
      </div>
    `;
  }).join('');
}

// Smooth SVG Curve Temperature Chart
function renderSvgChart(hourly) {
  if (!hourly || !hourly.time) return;

  const nowIso = new Date().toISOString().slice(0, 13);
  let startIndex = hourly.time.findIndex(t => t.startsWith(nowIso));
  if (startIndex === -1) startIndex = 0;

  const hours = hourly.time.slice(startIndex, startIndex + 24);
  const temps = hours.map((_, i) => hourly.temperature_2m[startIndex + i]);

  const minTemp = Math.min(...temps);
  const maxTemp = Math.max(...temps);
  const range = (maxTemp - minTemp) || 1;

  const svgWidth = 800;
  const svgHeight = 160;
  const paddingX = 30;
  const paddingTop = 30;
  const paddingBottom = 40;
  const chartHeight = svgHeight - paddingTop - paddingBottom;
  const stepX = (svgWidth - paddingX * 2) / (temps.length - 1);

  const points = temps.map((t, i) => {
    const x = paddingX + i * stepX;
    const y = paddingTop + chartHeight - ((t - minTemp) / range) * chartHeight;
    return { x, y, temp: formatTemperature(t), time: hours[i] };
  });

  // Catmull-Rom or Cubic Bezier Spline Path
  let dPath = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i === 0 ? 0 : i - 1];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] || p2;

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    dPath += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }

  const fillPath = `${dPath} L ${points[points.length - 1].x} ${svgHeight} L ${points[0].x} ${svgHeight} Z`;

  let dotsHtml = points.map((p, idx) => {
    const date = new Date(p.time);
    const hourLabel = `${date.getHours().toString().padStart(2, '0')}:00`;
    return `
      <g class="chart-point" data-temp="${p.temp}${getUnitSymbol()}" data-time="${hourLabel}">
        <circle cx="${p.x}" cy="${p.y}" r="4" fill="#38bdf8" stroke="#ffffff" stroke-width="2" />
        <text x="${p.x}" y="${p.y - 10}" fill="#ffffff" font-size="11" font-weight="700" text-anchor="middle">${p.temp}°</text>
        <text x="${p.x}" y="${svgHeight - 10}" fill="rgba(255,255,255,0.5)" font-size="10" font-weight="600" text-anchor="middle">${hourLabel}</text>
      </g>
    `;
  }).join('');

  dom.hourlySvgChart.innerHTML = `
    <defs>
      <linearGradient id="chartGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="rgba(56, 189, 248, 0.4)" />
        <stop offset="100%" stop-color="rgba(56, 189, 248, 0.0)" />
      </linearGradient>
    </defs>
    <path d="${fillPath}" fill="url(#chartGrad)" />
    <path d="${dPath}" fill="none" stroke="#38bdf8" stroke-width="3" stroke-linecap="round" />
    ${dotsHtml}
  `;
}

// ==========================================================================
// 7-Day Apple-Style Forecast with Temperature Range Gradient Bars
// ==========================================================================
function renderWeeklyRangeBars(daily) {
  if (!daily || !daily.time) return;

  // Calculate week's overall absolute min and max for aligned proportional bars
  const allMins = daily.temperature_2m_min;
  const allMaxs = daily.temperature_2m_max;
  const weekMin = Math.min(...allMins);
  const weekMax = Math.max(...allMaxs);
  const totalRange = (weekMax - weekMin) || 1;

  dom.weeklyRangeList.innerHTML = daily.time.map((timeStr, idx) => {
    const date = new Date(timeStr);
    const langObj = DATE_I18N[appState.lang];
    const isToday = idx === 0;
    const isTomorrow = idx === 1;
    const dayLabel = isToday ? i18n[appState.lang].today : (isTomorrow ? i18n[appState.lang].tomorrow : langObj.daysShort[date.getDay()]);

    const code = daily.weather_code[idx];
    const codeObj = WMO_MAP[code] || { iconDay: 'sun', iconNight: 'sun' };
    const minT = daily.temperature_2m_min[idx];
    const maxT = daily.temperature_2m_max[idx];

    // Calculate percentage offset & width for range bar
    const leftPercent = ((minT - weekMin) / totalRange) * 100;
    const widthPercent = Math.max(((maxT - minT) / totalRange) * 100, 8);

    // Current temperature dot for "Today"
    let currentDotHtml = '';
    if (isToday && appState.weatherData && appState.weatherData.current) {
      const curTemp = appState.weatherData.current.temperature_2m;
      const curPercent = Math.min(Math.max(((curTemp - minT) / (maxT - minT || 1)) * 100, 0), 100);
      currentDotHtml = `<span class="temp-current-dot" style="left: ${curPercent}%;"></span>`;
    }

    return `
      <div class="weekly-row">
        <span class="weekly-day-name">${dayLabel}</span>
        <div class="weekly-icon-wrap">
          <i data-lucide="${codeObj.iconDay}"></i>
        </div>
        <div class="temp-bar-container">
          <span class="temp-min-text">${formatTemperature(minT)}°</span>
          <div class="temp-range-track">
            <div class="temp-range-fill" style="left: ${leftPercent}%; width: ${widthPercent}%;">
              ${currentDotHtml}
            </div>
          </div>
          <span class="temp-max-text">${formatTemperature(maxT)}°</span>
        </div>
      </div>
    `;
  }).join('');
}

// ==========================================================================
// Key Matrix Renderers: Wind, AQI, Sun Arc, UV, Humidity
// ==========================================================================
function renderWindCompass(speed, deg, gusts) {
  dom.compassSpeed.innerHTML = `${Math.round(speed)} <small>km/h</small>`;
  dom.compassNeedle.style.transform = `rotate(${deg}deg)`;
  dom.compassDirName.textContent = getCompassDirectionName(deg);
  dom.compassGusts.textContent = `${i18n[appState.lang].wind} shiddati: ${Math.round(gusts || speed * 1.25)} km/h`;
}

function renderAirQuality(aqiData) {
  if (!aqiData || !aqiData.current) {
    dom.aqiNumber.textContent = '35';
    dom.aqiStatusBadge.textContent = i18n[appState.lang].aqiGood;
    dom.aqiPm25.textContent = '7.2';
    dom.aqiPm10.textContent = '12.8';
    return;
  }

  const cur = aqiData.current;
  const aqiVal = cur.us_aqi || cur.european_aqi || 40;
  dom.aqiNumber.textContent = aqiVal;
  dom.aqiPm25.textContent = (cur.pm2_5 || 8.0).toFixed(1);
  dom.aqiPm10.textContent = (cur.pm10 || 14.0).toFixed(1);

  if (aqiVal <= 50) {
    dom.aqiStatusBadge.textContent = i18n[appState.lang].aqiGood;
    dom.aqiStatusBadge.className = 'aqi-status-badge good';
  } else if (aqiVal <= 100) {
    dom.aqiStatusBadge.textContent = i18n[appState.lang].aqiModerate;
    dom.aqiStatusBadge.className = 'aqi-status-badge moderate';
  } else if (aqiVal <= 150) {
    dom.aqiStatusBadge.textContent = i18n[appState.lang].aqiUnhealthy;
    dom.aqiStatusBadge.className = 'aqi-status-badge unhealthy';
  } else {
    dom.aqiStatusBadge.textContent = i18n[appState.lang].aqiVeryUnhealthy;
    dom.aqiStatusBadge.className = 'aqi-status-badge extreme';
  }
}

function renderSunArc(daily) {
  if (!daily || !daily.sunrise || !daily.sunrise[0]) return;

  const riseStr = daily.sunrise[0];
  const setStr = daily.sunset[0];

  dom.sunriseTime.textContent = formatIsoTime(riseStr);
  dom.sunsetTime.textContent = formatIsoTime(setStr);

  const riseDate = new Date(riseStr);
  const setDate = new Date(setStr);
  const nowDate = new Date();

  // Compute sun elevation fraction along the arc
  const totalDaylightMs = setDate - riseDate;
  const currentMs = nowDate - riseDate;
  let fraction = currentMs / totalDaylightMs;
  if (fraction < 0) fraction = 0;
  if (fraction > 1) fraction = 1;

  // Arc path math (Semi-circle from 10,70 to 150,70 with radius 70)
  const angle = Math.PI * (1 - fraction);
  const cx = 80;
  const cy = 70;
  const r = 70;
  const sunX = cx + r * Math.cos(angle);
  const sunY = cy - r * Math.sin(angle);

  dom.sunOrb.setAttribute('cx', sunX.toFixed(1));
  dom.sunOrb.setAttribute('cy', sunY.toFixed(1));
}

function renderUvIndex(daily) {
  if (!daily || !daily.uv_index_max) return;
  const uv = Math.round(daily.uv_index_max[0] || 4);
  dom.uvValue.textContent = uv;
  dom.uvBarFill.style.width = `${Math.min((uv / 11) * 100, 100)}%`;

  if (uv <= 2) {
    dom.uvBadge.textContent = 'Past';
    dom.uvAdvice.textContent = 'Xavfsiz daraja, quyoshdan himoya talab etilmaydi.';
  } else if (uv <= 5) {
    dom.uvBadge.textContent = 'O\'rtacha';
    dom.uvAdvice.textContent = 'Quyosh ko\'zoynagi va yengil bosh kiyim kiyish tavsiya etiladi.';
  } else if (uv <= 7) {
    dom.uvBadge.textContent = 'Yuqori';
    dom.uvAdvice.textContent = 'Quyoshdan himoyalovchi krem (SPF 30+) surting va soyada bo\'ling.';
  } else {
    dom.uvBadge.textContent = 'Juda yuqori';
    dom.uvAdvice.textContent = 'Peshin vaqtida ochiq quyosh ostida uzoq qolmaslik tavsiya etiladi.';
  }
}

function renderHumidityAndDewPoint(cur, hourly) {
  dom.humidityVal.textContent = `${cur.relative_humidity_2m}%`;
  dom.humidityStatus.textContent = cur.relative_humidity_2m > 65 ? 'Yuqori namlik' : (cur.relative_humidity_2m < 30 ? 'Quruq havo' : 'Qulay muhit');
  dom.pressureVal.textContent = `${Math.round(cur.surface_pressure)} hPa`;

  if (hourly && hourly.dew_point_2m && hourly.dew_point_2m.length > 0) {
    dom.dewPointVal.textContent = `${formatTemperature(hourly.dew_point_2m[0])}${getUnitSymbol()}`;
  }
}

function renderVisibilityAndCloudiness(cur, hourly, daily) {
  if (hourly && hourly.visibility && hourly.visibility.length > 0) {
    const visKm = (hourly.visibility[0] / 1000).toFixed(1);
    dom.visibilityVal.innerHTML = `${visKm} <small>km</small>`;
    dom.visibilityStatus.textContent = visKm >= 10 ? 'Juda tiniq ko\'rinish' : 'O\'rtacha ko\'rinuvchanlik';
  } else {
    dom.visibilityVal.innerHTML = `10.0 <small>km</small>`;
    dom.visibilityStatus.textContent = 'Juda tiniq ko\'rinish';
  }

  dom.cloudCoverVal.textContent = `${cur.cloud_cover || 10}%`;
  dom.precipSumVal.textContent = `${daily && daily.precipitation_sum ? daily.precipitation_sum[0] : 0.0} mm`;
}

// ==========================================================================
// Lifestyle Insights & Daily Tips Generator
// ==========================================================================
function renderLifestyleTips(cur, daily) {
  const isRainy = cur.precipitation > 0 || (daily && daily.precipitation_sum && daily.precipitation_sum[0] > 1);
  const temp = cur.temperature_2m;

  let clothingTip = temp > 25 ? 'Yengil, havo o\'tkazuvchan kiyim' : (temp > 15 ? 'Yengil kurtka yoki sviter' : 'Issiq kiyim va palto');
  let outdoorTip = isRainy ? 'Yomg\'ir sababli soyabon oling' : (temp > 32 ? 'Ertalab yoki kechqurun sport qilish maqsadga muvofiq' : 'Sayr va ochiq havo uchun qulay vaqt');
  let carWashTip = isRainy ? 'Yog\'ingarchilik kutilmoqda, yuvishni kechiktiring' : 'Yog\'in kutilmayapti, mashina yuvish mumkin';

  dom.lifestyleTips.innerHTML = `
    <div class="tip-pill">
      <i data-lucide="shirt"></i>
      <div class="tip-desc">
        <strong>${i18n[appState.lang].clothing}</strong>
        <span>${clothingTip}</span>
      </div>
    </div>
    <div class="tip-pill">
      <i data-lucide="bike"></i>
      <div class="tip-desc">
        <strong>${i18n[appState.lang].outdoor}</strong>
        <span>${outdoorTip}</span>
      </div>
    </div>
    <div class="tip-pill">
      <i data-lucide="car"></i>
      <div class="tip-desc">
        <strong>${i18n[appState.lang].carWash}</strong>
        <span>${carWashTip}</span>
      </div>
    </div>
  `;
}

// ==========================================================================
// Dynamic Atmospheric Canvas Engine (Rain, Snow, Stars, Flares, Lightning)
// ==========================================================================
let canvasCtx = null;
let canvasParticles = [];
let animFrameId = null;
let currentEffectType = 'clear-day';

function initAtmosphereCanvas() {
  const canvas = dom.canvas;
  canvasCtx = canvas.getContext('2d');

  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles(currentEffectType);
  };
  window.addEventListener('resize', resize);
  resize();
  startCanvasLoop();
}

function setCanvasAtmosphere(theme, isDay) {
  currentEffectType = getThemeName(theme, isDay);
  initParticles(currentEffectType);
}

function initParticles(type) {
  canvasParticles = [];
  const w = dom.canvas.width;
  const h = dom.canvas.height;

  if (type === 'rainy' || type === 'thunderstorm') {
    const count = type === 'thunderstorm' ? 160 : 100;
    for (let i = 0; i < count; i++) {
      canvasParticles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        length: Math.random() * 20 + 15,
        speed: Math.random() * 12 + 15,
        opacity: Math.random() * 0.4 + 0.3
      });
    }
  } else if (type === 'snowy') {
    for (let i = 0; i < 90; i++) {
      canvasParticles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        radius: Math.random() * 3 + 1,
        speedY: Math.random() * 1.5 + 0.8,
        speedX: Math.random() * 1 - 0.5,
        opacity: Math.random() * 0.7 + 0.3
      });
    }
  } else if (type === 'clear-night') {
    for (let i = 0; i < 120; i++) {
      canvasParticles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        radius: Math.random() * 1.8 + 0.5,
        alpha: Math.random(),
        delta: Math.random() * 0.02 + 0.005
      });
    }
  } else if (type === 'clear-day') {
    for (let i = 0; i < 40; i++) {
      canvasParticles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        radius: Math.random() * 3 + 1,
        speedY: -(Math.random() * 0.5 + 0.2),
        speedX: Math.random() * 0.6 - 0.3,
        alpha: Math.random() * 0.5 + 0.2
      });
    }
  }
}

function startCanvasLoop() {
  const ctx = canvasCtx;
  const canvas = dom.canvas;

  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const w = canvas.width;
    const h = canvas.height;

    if (currentEffectType === 'rainy' || currentEffectType === 'thunderstorm') {
      ctx.strokeStyle = 'rgba(186, 230, 253, 0.45)';
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      for (let p of canvasParticles) {
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x - 2, p.y + p.length);
        p.y += p.speed;
        p.x -= 1;
        if (p.y > h) {
          p.y = -20;
          p.x = Math.random() * w;
        }
      }
      ctx.stroke();

      // Lightning Flash effect on thunderstorm
      if (currentEffectType === 'thunderstorm' && Math.random() < 0.008) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
        ctx.fillRect(0, 0, w, h);
      }
    } else if (currentEffectType === 'snowy') {
      ctx.fillStyle = '#ffffff';
      for (let p of canvasParticles) {
        ctx.beginPath();
        ctx.globalAlpha = p.opacity;
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        p.y += p.speedY;
        p.x += Math.sin(p.y * 0.01) * 0.8;
        if (p.y > h) {
          p.y = -10;
          p.x = Math.random() * w;
        }
      }
      ctx.globalAlpha = 1.0;
    } else if (currentEffectType === 'clear-night') {
      for (let p of canvasParticles) {
        p.alpha += p.delta;
        if (p.alpha > 1 || p.alpha < 0.2) p.delta = -p.delta;
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (currentEffectType === 'clear-day') {
      for (let p of canvasParticles) {
        ctx.fillStyle = `rgba(251, 191, 36, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        p.y += p.speedY;
        p.x += p.speedX;
        if (p.y < -10) {
          p.y = h + 10;
          p.x = Math.random() * w;
        }
      }
    }

    animFrameId = requestAnimationFrame(render);
  }
  render();
}

// ==========================================================================
// Procedural Ambient Weather Sound Synthesizer (Web Audio API)
// ==========================================================================
function toggleAmbientSound() {
  if (!appState.audioContext) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    appState.audioContext = new AudioCtx();
  }

  if (appState.isAudioPlaying) {
    // Stop Audio
    if (appState.audioGain) {
      appState.audioGain.gain.exponentialRampToValueAtTime(0.0001, appState.audioContext.currentTime + 0.8);
    }
    appState.isAudioPlaying = false;
    dom.soundToggleBtn.classList.remove('playing');
    dom.soundToggleBtn.innerHTML = '<i data-lucide="volume-x"></i>';
    lucide.createIcons();
  } else {
    // Start Audio Synthesizer
    if (appState.audioContext.state === 'suspended') {
      appState.audioContext.resume();
    }
    startWeatherSoundSynthesis(appState.activeWeatherTheme);
    appState.isAudioPlaying = true;
    dom.soundToggleBtn.classList.add('playing');
    dom.soundToggleBtn.innerHTML = '<i data-lucide="volume-2"></i>';
    lucide.createIcons();
  }
}

function startWeatherSoundSynthesis(theme) {
  const ctx = appState.audioContext;
  const bufferSize = 2 * ctx.sampleRate;
  const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const output = noiseBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1;
  }

  const whiteNoise = ctx.createBufferSource();
  whiteNoise.buffer = noiseBuffer;
  whiteNoise.loop = true;

  // Filter based on weather condition (Rain vs Breeze)
  const filter = ctx.createBiquadFilter();
  if (theme.includes('rain') || theme.includes('thunder')) {
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, ctx.currentTime);
  } else {
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(450, ctx.currentTime);
    filter.Q.setValueAtTime(1.5, ctx.currentTime);
  }

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.001, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 1.2);

  whiteNoise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  whiteNoise.start();
  appState.audioGain = gain;
}

// ==========================================================================
// Translation & Helpers
// ==========================================================================
function updateI18nText() {
  const dict = i18n[appState.lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) el.textContent = dict[key];
  });
  dom.cityInput.placeholder = dict.searchPlaceholder;
}

function formatTemperature(tempC) {
  if (tempC === null || tempC === undefined) return '--';
  if (appState.unit === 'f') {
    return Math.round((tempC * 9/5) + 32);
  }
  return Math.round(tempC);
}

function getUnitSymbol() {
  return appState.unit === 'f' ? '°F' : '°C';
}

function getThemeName(theme, isDay) {
  if (theme === 'clear') return isDay ? 'clear-day' : 'clear-night';
  if (theme === 'cloudy') return isDay ? 'cloudy-day' : 'cloudy-night';
  return theme; // rainy, thunderstorm, snowy, foggy
}

function updateBodyThemeClass(themeClass) {
  document.body.className = `weather-theme-${themeClass}`;
}

function getCompassDirectionName(deg) {
  const dirsUz = ['Shimoliy', 'Shimoli-sharqiy', 'Sharqiy', 'Janubi-sharqiy', 'Janubiy', 'Janubi-g\'arbiy', 'G\'arbiy', 'Shimoli-g\'arbiy'];
  const dirsRu = ['Северный', 'Северо-восточный', 'Восточный', 'Юго-восточный', 'Южный', 'Юго-западный', 'Западный', 'Северо-западный'];
  const dirsEn = ['North', 'North-East', 'East', 'South-East', 'South', 'South-West', 'West', 'North-West'];

  const arr = appState.lang === 'ru' ? dirsRu : (appState.lang === 'en' ? dirsEn : dirsUz);
  return arr[Math.round(deg / 45) % 8];
}

function formatIsoTime(isoStr) {
  if (!isoStr) return '--:--';
  const d = new Date(isoStr);
  return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
}

// UI State Management
function showLoader() {
  dom.loaderBox.style.display = 'flex';
  dom.errorBox.style.display = 'none';
  dom.weatherGrid.style.display = 'none';
}

function showContent() {
  dom.loaderBox.style.display = 'none';
  dom.errorBox.style.display = 'none';
  dom.weatherGrid.style.display = 'grid';
}

function showErrorScreen() {
  dom.loaderBox.style.display = 'none';
  dom.errorBox.style.display = 'flex';
  dom.weatherGrid.style.display = 'none';
  lucide.createIcons();
}
