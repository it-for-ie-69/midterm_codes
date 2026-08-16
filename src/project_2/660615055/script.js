// Typing interaction on the Home page
const nameInput = document.getElementById("nameInput");
const welcomeText = document.getElementById("welcomeText");

if (nameInput && welcomeText) {
  nameInput.addEventListener("input", function () {
    if (nameInput.value === "") {
      welcomeText.textContent = "Hello!";
    } else {
      welcomeText.textContent = "Hello, " + nameInput.value + "!";
    }
  });
}

// Clicking interaction on the Home page
const messageButton = document.getElementById("messageButton");
const messageText = document.getElementById("messageText");

if (messageButton && messageText) {
  messageButton.addEventListener("click", function () {
    messageText.textContent = "Thank you for visiting my website!";
  });
}

// Mouse interaction on the Interests page
const interestCards = document.querySelectorAll(".interest-card");

interestCards.forEach(function (card) {
  card.addEventListener("mouseenter", function () {
    card.style.backgroundColor = "#e8f2ec";
  });

  card.addEventListener("mouseleave", function () {
    card.style.backgroundColor = "#ffffff";
  });
});
