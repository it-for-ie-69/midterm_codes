//— ขีดเส้น ingredients, tools, steps
const checklistItems = document.querySelectorAll(".checklist li");

function toggleCheck(e) {
  const item = e.target;
  if (item.style.textDecoration === "line-through") {
    item.style.textDecoration = "none";
    item.style.opacity = "1";
  } else {
    item.style.textDecoration = "line-through";
    item.style.opacity = "0.6";
  }
}

checklistItems.forEach((item) => {
  item.addEventListener("click", toggleCheck);
});

// ใส่ชื่อ baker.html ----------
const nameInput = document.getElementById("your-name");
const greeting = document.getElementById("greeting");

function updateGreeting(e) {
  const text = e.target.value;
  if (text) {
    greeting.textContent = "Happy baking, " + text + "! 🧁";
  } else {
    greeting.textContent = "Happy baking, friend! 🧁";
  }
}

nameInput.addEventListener("input", updateGreeting);

// ---------- FURBY FACT BUTTON ------
const factBtn = document.getElementById("fact-btn");
const factDisplay = document.getElementById("furby-fact");

const facts = [
  "Furby was first released in 1998 and became one of the best-selling toys of its time.",
  "Furbies can 'learn' English by transitioning out of their made-up 'Furbish' language.",
  "The original Furby had over 700,000 units sold in its first three months.",
  "Furby's design includes sensors for touch, light, and sound.",
];

function random(number) {
  return Math.floor(Math.random() * number);
}

function showRandomFact() {
  const index = random(facts.length);
  factDisplay.textContent = facts[index];
}
factBtn.addEventListener("click", showRandomFact);
