const symbols = [
  "🍒", "🍒", "🍒",
  "⭐", "⭐",
  "7️⃣",
  "🍋", "🍉", "🔔"
];

function getRandomSymbol() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}

function spin() {
  const reel1 = document.getElementById("reel1");
  const reel2 = document.getElementById("reel2");
  const reel3 = document.getElementById("reel3");
  const result = document.getElementById("result");

  result.textContent = "";

  reel1.classList.add("spin-animation");
  reel2.classList.add("spin-animation");
  reel3.classList.add("spin-animation");

  let spinCount = 0;

  const interval = setInterval(() => {
    reel1.textContent = getRandomSymbol();
    reel2.textContent = getRandomSymbol();
    reel3.textContent = getRandomSymbol();
    spinCount++;

    if (spinCount > 20) {
      clearInterval(interval);

      reel1.classList.remove("spin-animation");
      reel2.classList.remove("spin-animation");
      reel3.classList.remove("spin-animation");

      const r1 = reel1.textContent;
      const r2 = reel2.textContent;
      const r3 = reel3.textContent;

      if (r1 === r2 && r2 === r3) {
        result.textContent = "🔥 JACKPOT! 🔥";
      } else if (r1 === r2 || r2 === r3 || r1 === r3) {
        result.textContent = "✨ Malá výhra!";
      } else {
        result.textContent = "Zkus to znovu 😄";
      }
    }
  }, 100);
}