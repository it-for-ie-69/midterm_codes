// clickin
const tags_genre = document.querySelectorAll(".genre-pill");
const display = document.getElementById("genreDisplay");

tags_genre.forEach((tag) => {
  tag.addEventListener("click", (e) => {
    display.textContent = e.target.textContent;
  });
});

// Typing
const nameBox = document.getElementById("nameBox");
const greetText = document.getElementById("greetText");

if (nameBox) {
  nameBox.addEventListener("input", (e) => {
    const text = e.target.value;

    if (text) {
      greetText.textContent = "Welcome to DramaList, " + text + "!";
    } else {
      greetText.textContent = "Welcome to DramaList!";
    }
  });
}

// recommend

const cards = document.querySelectorAll(".card");

cards.forEach((card) => {
  card.addEventListener("dblclick", () => {
    card.classList.toggle("favorite");
  });
});
