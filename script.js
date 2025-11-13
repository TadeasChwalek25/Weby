// Herní pole (0 = voda, 1 = loď)
let pole = [
    [0,0,0,1,0,0,0,0,0,0],
    [0,0,0,1,0,0,0,0,1,0],
    [0,0,0,0,0,0,0,0,1,0],
    [0,1,0,0,0,0,0,0,0,0],
    [0,1,0,0,1,0,0,0,0,0],
    [0,0,0,0,1,0,0,0,0,0],
    [0,0,0,0,0,0,1,0,0,0],
    [0,0,0,0,0,0,1,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [1,1,0,0,0,0,0,0,0,0]
];

let odhaleno = []; // kam hráč už klikl
let pocetTahu = 0;

// Vytvoření pole na stránce
const herniPole = document.getElementById("herniPole");

function vytvorPole() {
    herniPole.innerHTML = "";
    odhaleno = [];
    for (let y = 0; y < 10; y++) {
        odhaleno[y] = [];
        for (let x = 0; x < 10; x++) {
            odhaleno[y][x] = false;
            let div = document.createElement("div");
            div.classList.add("pole");
            div.dataset.x = x;
            div.dataset.y = y;
            div.addEventListener("click", klikNaPole);
            herniPole.appendChild(div);
        }
    }
}

// Reakce na klik
function klikNaPole(e) {
    let x = e.target.dataset.x;
    let y = e.target.dataset.y;

    if (odhaleno[y][x]) return; // už odhaleno

    odhaleno[y][x] = true;
    pocetTahu++;
    document.getElementById("pocetTahu").textContent = pocetTahu;
    console.log("Klikl jsi na:", x, y);

    if (pole[y][x] === 1) {
        e.target.classList.add("lod");
    } else {
        e.target.classList.add("voda");
    }
}

// Tlačítko Nová hra
document.getElementById("novaHra").addEventListener("click", function() {
    pocetTahu = 0;
    document.getElementById("pocetTahu").textContent = "0";
    vytvorPole();
});

// Načtení pole při startu
vytvorPole();
