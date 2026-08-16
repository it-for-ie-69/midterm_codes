const input = document.getElementById("message");
const button = document.getElementById("submitBtn");
const result = document.getElementById("result");

// Typing Event
if (input && button && result) {
  // Typing Event
  input.addEventListener("input", function () {
    result.textContent = "Typing: " + input.value;
  });

  // Click Event
  button.addEventListener("click", function () {
    if (input.value.trim() === "") {
      result.textContent = "Please enter a message.";
    } else {
      result.textContent = "Thank you! Your message has been submitted.";
      input.value = "";
    }
  });
}

const factBtn = document.getElementById("factBtn");
const factText = document.getElementById("factText");

if (factBtn && factText) {
  factBtn.addEventListener("click", function () {
    if (factText.style.display === "none") {
      factText.style.display = "block";
      factBtn.textContent = "Hide It";
    } else {
      factText.style.display = "none";
      factBtn.textContent = "Get To Know Me";
    }
  });
}

const drink = document.getElementById("drink");
const drinkResult = document.getElementById("drinkResult");

// Change Event
if (drink && drinkResult) {
  drink.addEventListener("change", function () {
    if (drink.value === "Coffee") {
      drinkResult.textContent = " Correct Kub!😊";
    } else if (drink.value === "") {
      drinkResult.textContent = "";
    } else {
      drinkResult.textContent = " Mai Chai Kub.😅";
    }
  });
}
