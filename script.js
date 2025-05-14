// Funkce pro získání aktuálního času
function updateTime() {
    const timeElement = document.getElementById("time");
    const dateElement = document.getElementById("date");
  
    const now = new Date();
  
    // Formátování času (hodiny:minuty:sekundy)
    let hours = now.getHours().toString().padStart(2, "0");
    let minutes = now.getMinutes().toString().padStart(2, "0");
    let seconds = now.getSeconds().toString().padStart(2, "0");
  
    // Aktualizování času na stránce
    timeElement.textContent = `${hours}:${minutes}:${seconds}`;
  
    // Formátování a zobrazení aktuálního data
    const day = now.getDate();
    const month = now.getMonth() + 1; // Měsíce jsou indexované od 0
    const year = now.getFullYear();
  
    dateElement.textContent = `${day}.${month < 10 ? "0" : ""}${month}.${year}`;
  }
  
  // Aktualizace každou sekundu
  setInterval(updateTime, 1000);
  
  // Inicializace zobrazení při načtení stránky
  updateTime();
  