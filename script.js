const input = document.getElementById('citySearch');
const loader = document.getElementById('loader');

async function updateWeather(city) {
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
        const temp = Math.round(current.temperature);
        
        let icon = "☀️";
        if (temp <= 0) icon = "❄️";
        else if (temp > 0 && temp < 15) icon = "☁️";
        else if (temp >= 15 && temp < 25) icon = "🌤️";
        else icon = "🔥";

        loader.style.width = "100%";
        
        document.getElementById('temp').innerText = temp + "°";
        document.getElementById('cityName').innerText = loc.name;
        document.getElementById('icon').innerText = icon;
        document.getElementById('wind').innerText = Math.round(current.windspeed) + " km/h";
        document.getElementById('localTime').innerText = "Místní čas: " + current.time.split("T")[1];

        const root = document.documentElement;
        if(temp <= 0) root.style.setProperty('--accent-color', '#38bdf8');
        else if(temp > 25) root.style.setProperty('--accent-color', '#fbbf24');
        else root.style.setProperty('--accent-color', '#34d399');

        setTimeout(() => loader.style.width = "0%", 400);

    } catch (e) {
        loader.style.width = "0%";
    }
}

input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') updateWeather(input.value);
});