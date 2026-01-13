function updateClock() {
    const now = new Date();

    // ČAS
    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();

    const secDeg = (seconds / 60) * 360;
    const minDeg = ((minutes / 60) * 360) + ((seconds / 60) * 6);
    const hrDeg = ((hours % 12 / 12) * 360) + ((minutes / 60) * 30);

    document.getElementById('second').style.transform = `translateX(-50%) rotate(${secDeg}deg)`;
    document.getElementById('minute').style.transform = `translateX(-50%) rotate(${minDeg}deg)`;
    document.getElementById('hour').style.transform = `translateX(-50%) rotate(${hrDeg}deg)`;

    // DATUM
    const day = now.getDate();
    const month = now.getMonth() + 1; // Měsíce jsou 0-11
    const year = now.getFullYear();
    
    // Formátování: přidáme nulu, pokud je číslo menší než 10
    const formattedDate = `${day < 10 ? '0' + day : day}. ${month < 10 ? '0' + month : month}. ${year}`;
    document.getElementById('date-display').innerText = formattedDate;
}

setInterval(updateClock, 1000);
updateClock();