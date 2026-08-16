document.addEventListener("DOMContentLoaded", function () {
  function toggleFavorite() {
    const item = this;
    const already = item.classList.contains("favorited");

    if (already) {
      item.classList.remove("favorited");
      const msg = document.getElementById("fav-msg-" + item.dataset.hobbyId);
      if (msg) {
        msg.remove();
      }
    } else {
      item.classList.add("favorited");

      const para = document.createElement("p");
      para.id = "fav-msg-" + item.dataset.hobbyId;
      para.textContent = "You favorited: " + item.textContent;
      document.getElementById("favorites-output").appendChild(para);
    }

    const total = document.querySelectorAll(".item.favorited").length;
    document.getElementById("favorite-count").textContent =
      "Favorites selected: " + total;
  }

  const hobbyItems = document.querySelectorAll(".item");

  for (let i = 0; i < hobbyItems.length; i++) {
    hobbyItems[i].dataset.hobbyId = i;
    hobbyItems[i].addEventListener("click", toggleFavorite);
  }

  /* ================================================================
     TYPING interaction #1 (index.html)
     Type a name -> a paragraph with a personalized greeting is
     created (or updated) below the input box.
  ================================================================ */
  function updateGreeting() {
    const name = this.value.trim();
    const output = document.getElementById("greeting-output");

    output.textContent = name
      ? "Hi " + name + ", thanks for visiting my page!"
      : "";
  }

  const nameInput = document.getElementById("name-input");
  if (nameInput) {
    nameInput.addEventListener("input", updateGreeting);
  }

  /* ================================================================
     CLICK interaction #2 (activities.html)
     Click an activity -> a paragraph with extra detail is created
     and appended under it. Click again -> the paragraph is removed.
  ================================================================ */
  function toggleActivityDetail() {
    const li = this;
    const existing = li.querySelector(".activity-detail");

    if (existing) {
      existing.remove();
    } else {
      const para = document.createElement("p");
      para.className = "activity-detail";
      para.textContent = li.dataset.detail;
      li.appendChild(para);
    }
  }

  const activityItems = document.querySelectorAll("#activity-list li");

  for (let i = 0; i < activityItems.length; i++) {
    activityItems[i].addEventListener("click", toggleActivityDetail);
  }

  /* ================================================================
     TYPING interaction #2 (activities.html)
     Type in the filter box -> loop through every activity and hide
     the ones that don't match what was typed.
  ================================================================ */
  function filterActivities() {
    const query = this.value.toLowerCase();

    for (let i = 0; i < activityItems.length; i++) {
      const text = activityItems[i].textContent.toLowerCase();

      if (text.includes(query)) {
        activityItems[i].classList.remove("filtered-out");
      } else {
        activityItems[i].classList.add("filtered-out");
      }
    }
  }

  const filterBox = document.getElementById("filter-box");
  if (filterBox) {
    filterBox.addEventListener("input", filterActivities);
  }

  /* ================================================================
     3RD INTERACTION TYPE: SCROLL (both pages)
     As the page is scrolled, a bar at the top fills up to show
     how far down the page the user has scrolled.
  ================================================================ */
  function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    document.getElementById("scroll-progress").style.width = percent + "%";
  }

  if (document.getElementById("scroll-progress")) {
    window.addEventListener("scroll", updateScrollProgress);
  }
});
