const payBtn = document.getElementById("pay-btn");
const retryBtn = document.getElementById("retry-btn");
const statusBox = document.getElementById("payment-status");
const loader = document.getElementById("loader");
const success = document.getElementById("success");
const error = document.getElementById("error");
const soundSuccess = document.getElementById("sound-success");
const form = document.getElementById("card-form");
const cardNumber = document.getElementById("card-number");
const expiry = document.getElementById("expiry");
const remember = document.getElementById("remember");

// 🟢 Automatické mezery v čísle karty
cardNumber.addEventListener("input", () => {
  let value = cardNumber.value.replace(/\D/g, "").slice(0, 16);
  value = value.match(/.{1,4}/g)?.join(" ") || "";
  cardNumber.value = value;
});

// 🟢 Automatické lomítko v expiraci
expiry.addEventListener("input", () => {
  let value = expiry.value.replace(/\D/g, "").slice(0, 4);
  if (value.length >= 3) {
    value = `${value.slice(0, 2)}/${value.slice(2)}`;
  }
  expiry.value = value;
});

// 🟢 Zaplacení
payBtn.addEventListener("click", () => {
  const method = document.querySelector('input[name="method"]:checked').value;

  if (method === "card") {
    const inputs = form.querySelectorAll("input[type='text']");
    let allFilled = true;

    inputs.forEach((input) => {
      if (!input.value.trim()) {
        input.style.border = "2px solid red";
        allFilled = false;
      } else {
        input.style.border = "none";
      }
    });

    if (!allFilled) return;

    if (remember.checked) {
      localStorage.setItem("cardName", document.getElementById("card-name").value);
      localStorage.setItem("cardNumber", cardNumber.value);
      localStorage.setItem("expiry", expiry.value);
    }
  }

  statusBox.classList.remove("hidden");
  loader.classList.remove("hidden");
  success.classList.add("hidden");
  error.classList.add("hidden");

  setTimeout(() => {
    loader.classList.add("hidden");
    const paymentSuccess = Math.random() < 0.8;

    if (paymentSuccess) {
      success.classList.remove("hidden");
      soundSuccess.play();
    } else {
      error.classList.remove("hidden");
    }
  }, 2000);
});

// 🟢 Retry
retryBtn?.addEventListener("click", () => {
  loader.classList.remove("hidden");
  success.classList.add("hidden");
  error.classList.add("hidden");

  setTimeout(() => {
    loader.classList.add("hidden");
    if (Math.random() < 0.8) {
      success.classList.remove("hidden");
      soundSuccess.play();
    } else {
      error.classList.remove("hidden");
    }
  }, 2000);
});

// 🟢 Načtení uložených údajů (pokud existují)
window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("cardName")) {
    document.getElementById("card-name").value = localStorage.getItem("cardName");
    cardNumber.value = localStorage.getItem("cardNumber");
    expiry.value = localStorage.getItem("expiry");
    remember.checked = true;
  }
});


