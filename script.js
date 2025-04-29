let cislo = 0;
const zobraz = document.getElementById("cislo");

function aktualizujCislo() {
    zobraz.textContent = cislo;
    zobraz.style.transform = "scale(1.2)";
    setTimeout(() => {
        zobraz.style.transform = "scale(1)";
    }, 150);
}

function zvys() {
    cislo++;
    aktualizujCislo();
}

function sniz() {
    cislo--;
    aktualizujCislo();
}

function reset() {
    cislo = 0;
    aktualizujCislo();
}

document.getElementById("modeToggle").addEventListener("change", () => {
    document.body.classList.toggle("dark");
    document.body.classList.toggle("light");
});
