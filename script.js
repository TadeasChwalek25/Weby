let clockInterval; // Proměnná pro ukládání běžících hodin

async function updateWeather(city) {
    const loader = document.getElementById('loader');
    loader.style.width = "50%";

    try {
        const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=cz&format=json`);
        const geoData = await geoRes.json();

        if (!geoData.results) {
            alert("Město nebylo nalezeno");
            loader.style.width = "0%";
            return;
        }

        const loc = geoData.results[0];
        const wRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${loc.latitude}&longitude=${loc.longitude}&current_weather=true&timezone=auto`);
        const wData = await wRes.json();
        
        const current = wData.current_weather;
        
        // Zobrazení dat o počasí
        document.getElementById('temp').innerText = Math.round(current.temperature) + "°";
        document.getElementById('cityName').innerText = loc.name;
        document.getElementById('wind').innerText = Math.round(current.windspeed) + " km/h";
        
        // Nastavení ikon
        const t = current.temperature;
        document.getElementById('icon').innerText = t < 0 ? "❄️" : (t < 20 ? "☁️" : "☀️");

        // SPUŠTĚNÍ HODIN pro danou časovou zónu
        if (clockInterval) clearInterval(clockInterval);
        startClock(wData.timezone);

        loader.style.width = "100%";
        setTimeout(() => loader.style.width = "0%", 400);

    } catch (e) {
        loader.style.width = "0%";
    }
}

function startClock(timezone) {
    const clockElement = document.getElementById('clock');
    
    const tick = () => {
        const now = new Date();
        // Převod času na časovou zónu vyhledaného města
        const timeString = now.toLocaleTimeString('cs-CZ', {
            timeZone: timezone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        clockElement.innerText = timeString;
    };

    tick(); // Spustit ihned
    clockInterval = setInterval(tick, 1000); // Pak každou sekundu
}

document.getElementById('citySearch').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') updateWeather(e.target.value);
});