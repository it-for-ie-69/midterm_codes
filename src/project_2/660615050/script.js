// =========================================================
// script.js — shared JavaScript for both index.html and flowers.html
// Based on lecture: DOM API, addEventListener, external file
// =========================================================

// Seed values used the very first time a visitor opens the site
const DEFAULT_LIKES = {
  thongkwao: 24,
  ratchaphruek: 15,
  sieo: 9,
  "fueang-fa": 31,
  "lhuang-india": 6,
  inthanin: 12,
};

const STORAGE_KEY = "cmu-flower-likes";

// Reads saved like counts from localStorage
function loadLikes() {
  let saved = {};
  try {
    saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch (err) {
    saved = {};
  }
  return Object.assign({}, DEFAULT_LIKES, saved);
}

function saveLikes(likes) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(likes));
  } catch (err) {
    // Fail silently in private mode
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const likes = loadLikes();

  // ---------------------------------------------------------
  // 1) CLICK interaction — tap-to-like heart (flowers.html)
  // ---------------------------------------------------------
  const heartButtons = document.querySelectorAll(".heart-btn");

  heartButtons.forEach(function (btn) {
    const flowerId = btn.dataset.flowerId;
    const countEl = btn.querySelector(".heart-count");

    if (flowerId && likes[flowerId] !== undefined) {
      countEl.textContent = likes[flowerId];
    }

    btn.addEventListener("click", function () {
      if (!flowerId) return;

      likes[flowerId] += 1;
      countEl.textContent = likes[flowerId];
      saveLikes(likes);

      updateTotal();

      // Pop animation retriggered on repeat clicks
      btn.classList.remove("is-pulsing");
      void btn.offsetWidth;
      btn.classList.add("is-pulsing");
    });
  });

  // ---------------------------------------------------------
  // Read-only heart badges (index.html)
  // ---------------------------------------------------------
  const heartBadges = document.querySelectorAll(".heart-badge");

  heartBadges.forEach(function (badge) {
    const flowerId = badge.dataset.flowerId;
    const countEl = badge.querySelector(".heart-count");
    if (flowerId && likes[flowerId] !== undefined) {
      countEl.textContent = likes[flowerId];
    }
  });

  // ---------------------------------------------------------
  // Nav total — sum of every flower's saved like count
  // ---------------------------------------------------------
  const totalLikesEl = document.querySelector("#total-likes");

  function updateTotal() {
    const total = Object.values(likes).reduce((sum, n) => sum + n, 0);
    if (totalLikesEl) {
      totalLikesEl.textContent = total;
    }
  }

  updateTotal();

  // ---------------------------------------------------------
  // 2) TYPING interaction — live search filter (flowers.html)
  // ---------------------------------------------------------
  const searchInput = document.querySelector("#flower-search");
  const specimens = document.querySelectorAll(".specimen");

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const query = searchInput.value.trim().toLowerCase();

      specimens.forEach(function (card) {
        const name = card.querySelector("h3").textContent.toLowerCase();
        const sci = card.querySelector(".sci").textContent.toLowerCase();
        const isMatch = name.includes(query) || sci.includes(query);
        card.style.display = isMatch ? "" : "none";
      });
    });
  }

  // ---------------------------------------------------------
  // 3) ADDITIONAL interaction — sort dropdown (flowers.html)
  // ---------------------------------------------------------
  const sortSelect = document.querySelector("#sort-select");
  const specimenGrid = document.querySelector(".specimen-grid");

  if (sortSelect && specimenGrid) {
    sortSelect.addEventListener("change", function () {
      const cards = Array.from(specimenGrid.querySelectorAll(".specimen"));

      cards.sort(function (a, b) {
        if (sortSelect.value === "name") {
          const nameA = a.querySelector("h3").textContent.trim();
          const nameB = b.querySelector("h3").textContent.trim();
          return nameA.localeCompare(nameB);
        }
        if (sortSelect.value === "month") {
          const monthA = parseInt(a.dataset.startMonth, 10);
          const monthB = parseInt(b.dataset.startMonth, 10);
          return monthA - monthB;
        }
        return 0; // "default" — leave original order
      });

      cards.forEach(function (card) {
        specimenGrid.appendChild(card);
      });
    });
  }
});
