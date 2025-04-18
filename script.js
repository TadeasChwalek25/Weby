let cislo = 0;
const zobraz = document.getElementById("cislo");

function zvys() {
    cislo++;
    zobraz.textContent = cislo;
}

function sniz() {
    cislo--;
    zobraz.textContent = cislo;
}

function reset() {
    cislo = 0;
    zobraz.textContent = cislo;
}
