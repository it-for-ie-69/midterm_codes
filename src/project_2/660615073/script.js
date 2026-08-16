// ==========================================
// 1. TYPING INTERACTION (หน้า songs.html)
// ==========================================
const searchInput = document.getElementById("songSearch");
const songCards = document.querySelectorAll(".song-card");

if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();

    songCards.forEach((card) => {
      const songTitle = card.querySelector("h3").textContent.toLowerCase();
      const lyrics = card
        .querySelector(".lyrics-preview")
        .textContent.toLowerCase();

      if (songTitle.includes(searchTerm) || lyrics.includes(searchTerm)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
}

// ==========================================
// 2. CLICK INTERACTION (หน้า songs.html)
// ==========================================
const modal = document.getElementById("songModal");
const modalTitle = document.getElementById("modalTitle");
const modalLyrics = document.getElementById("modalLyrics");
const closeModalBtn = document.querySelector(".close-modal");

if (songCards.length > 0 && modal) {
  songCards.forEach((card) => {
    card.addEventListener("click", () => {
      const title = card.querySelector("h3").textContent;
      const lyrics = card.querySelector(".lyrics-preview").textContent;

      modalTitle.textContent = title;
      modalLyrics.textContent =
        lyrics + " (เนื้อเพลงฉบับเต็มคลิกฟังต่อได้ที่ช่อง Official Smallroom)";

      modal.style.display = "flex";
    });
  });

  closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
}

// ==========================================
// 3. ADDITIONAL INTERACTION: HOVER (หน้า index.html)
// ==========================================
const memberCards = document.querySelectorAll(".member-card");

memberCards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "scale(1.08)";
    card.style.backgroundColor = "#DE3831";
    card.style.color = "#ffffff";
    card.style.transition = "all 0.3s ease";
    card.style.cursor = "pointer";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "scale(1)";
    card.style.backgroundColor = "#f58f8f";
    card.style.color = "#111111";
  });
});
