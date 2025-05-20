const products = [
  { name: "iPhone 14", price: 29990, category: "Mobily", desc: "Výkonný iPhone s čipem A15." },
  { name: "Samsung Galaxy S24", price: 25990, category: "Mobily", desc: "Nový model s vylepšeným displejem." },
  { name: "Google Pixel 8", price: 21990, category: "Mobily", desc: "Čistý Android, top fotoaparát." },
  { name: "Xiaomi 13T Pro", price: 17990, category: "Mobily", desc: "Skvělý výkon za super cenu." },
  { name: "Samsung OLED TV", price: 40990, category: "TV", desc: "OLED kvalita obrazu." },
  { name: "LG NanoCell", price: 34990, category: "TV", desc: "HDR a živé barvy." },
  { name: "Philips Ambilight", price: 29990, category: "TV", desc: "Podsvícení Ambilight pro atmosféru." },
  { name: "Sony Bravia 4K", price: 37990, category: "TV", desc: "Plynulý obraz a skvělý zvuk." },
  { name: "Lenovo IdeaPad", price: 18990, category: "Notebooky", desc: "Spolehlivý notebook pro každého." },
  { name: "MacBook Air M1", price: 35990, category: "Notebooky", desc: "Lehký, tichý, výkonný." },
  { name: "HP Pavilion", price: 21990, category: "Notebooky", desc: "Připravený pro školu i práci." },
  { name: "Asus ZenBook", price: 27990, category: "Notebooky", desc: "Kompaktní a výkonný." },
  { name: "Sony WH-1000XM5", price: 7990, category: "Sluchátka", desc: "Špičkový zvuk a ANC." },
  { name: "JBL Tune 760NC", price: 2990, category: "Sluchátka", desc: "Skvělý poměr cena/výkon." },
  { name: "Apple AirPods Pro", price: 6490, category: "Sluchátka", desc: "Aktivní potlačení hluku." },
  { name: "iPad 10.2", price: 10990, category: "Tablety", desc: "Oblíbený tablet pro každého." },
  { name: "Samsung Galaxy Tab S8", price: 19990, category: "Tablety", desc: "Velký výkon v malém těle." },
  { name: "Lenovo Tab P11", price: 8990, category: "Tablety", desc: "Ideální na multimedia." },
  { name: "Xiaomi Pad 6", price: 12990, category: "Tablety", desc: "Kvalitní displej a výkon za dobrou cenu." }
];

let currentProducts = [...products];
let cart = [];

function renderProducts(list = currentProducts) {
  const container = document.getElementById("products");
  container.innerHTML = "";
  list.forEach((p, index) => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <h3>${p.name}</h3>
      <p>${p.category}</p>
      <p>${p.price} Kč</p>
      <button onclick="showDetails(${products.indexOf(p)})">Detail</button>
      <button onclick="addToCart(${products.indexOf(p)})">Do košíku</button>
    `;
    container.appendChild(div);
  });
}

function addToCart(index) {
  cart.push(products[index]);
  updateCart();
}

function updateCart() {
  document.getElementById("cart-count").textContent = cart.length;
  const items = document.getElementById("cart-items");
  items.innerHTML = "";
  cart.forEach((item, i) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} – ${item.price} Kč`;
    const btn = document.createElement("button");
    btn.textContent = "❌";
    btn.onclick = () => {
      cart.splice(i, 1);
      updateCart();
    };
    li.appendChild(btn);
    items.appendChild(li);
  });
  document.getElementById("total").textContent = `Celkem: ${cart.reduce((a, b) => a + b.price, 0)} Kč`;
}

function toggleCart() {
  document.getElementById("cart-panel").classList.toggle("hidden");
}

function showDetails(index) {
  document.getElementById("modal").classList.remove("hidden");
  document.getElementById("modal-name").textContent = products[index].name;
  document.getElementById("modal-desc").textContent = products[index].desc;
  document.getElementById("modal-price").textContent = products[index].price + " Kč";
}

function closeModal() {
  document.getElementById("modal").classList.add("hidden");
}

function filterCategory(cat) {
  if (cat === "Vše") {
    currentProducts = [...products];
  } else {
    currentProducts = products.filter(p => p.category === cat);
  }
  renderProducts(currentProducts);
}

document.getElementById("search").addEventListener("input", function () {
  const query = this.value.toLowerCase();
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query)
  );
  renderProducts(filtered);
});

// Inicializace
renderProducts(products);
