document.addEventListener("DOMContentLoaded", () => {
  // ====================================================
  // 1. CLICK INTERACTION: Viewer Counter (Starts at 0)
  // ====================================================
  const viewBtn = document.getElementById("view-btn");
  const viewerCountDisplay = document.getElementById("viewer-count");

  const DEFAULT_COUNT = 0;

  if (viewerCountDisplay) {
    // Load saved count from localStorage or default to 0
    let savedCount = localStorage.getItem("pageViewerCount");
    let count = savedCount ? parseInt(savedCount, 10) : DEFAULT_COUNT;

    // Display initial count on page load
    viewerCountDisplay.textContent = count;

    // Increase count on button click & save to memory
    if (viewBtn) {
      viewBtn.addEventListener("click", () => {
        count++;
        viewerCountDisplay.textContent = count;
        localStorage.setItem("pageViewerCount", count);
      });
    }
  }

  // ====================================================
  // 2. HOVER & MULTI-IMAGE CAROUSEL MODAL
  // ====================================================
  const cards = document.querySelectorAll(".craft-card");
  const modal = document.getElementById("image-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalImg = document.getElementById("modal-img");
  const closeModal = document.getElementById("close-modal");

  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const imgCounter = document.getElementById("img-counter");

  let currentImgList = [];
  let currentImgIndex = 0;

  // Update modal image source and index counter
  function updateModalImage() {
    if (currentImgList.length > 0) {
      modalImg.src = currentImgList[currentImgIndex];
      imgCounter.textContent = `${currentImgIndex + 1} / ${currentImgList.length}`;
    }
  }

  // Setup cards for Hover and Click
  cards.forEach((card) => {
    const statusText = card.querySelector(".card-status");

    // Mouse Enter / Leave Hover Effects
    card.addEventListener("mouseenter", () => {
      card.style.backgroundColor = "#9d5eb6";
      card.style.borderColor = "#663d7f";
      if (statusText) statusText.textContent = "Click to view photos!";
    });

    card.addEventListener("mouseleave", () => {
      card.style.backgroundColor = "#e5b7f9";
      card.style.borderColor = "#e5b7f9";
      if (statusText) statusText.textContent = "Hover over me!";
    });

    // Open Modal Viewer on Click
    card.addEventListener("click", () => {
      const title = card.getAttribute("data-title");
      const imgsAttr = card.getAttribute("data-imgs");

      if (imgsAttr) {
        currentImgList = imgsAttr.split(",");
        currentImgIndex = 0;

        if (modalTitle) modalTitle.textContent = title;
        updateModalImage();
        if (modal) modal.style.display = "flex";
      }
    });
  });

  // Carousel Controls
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (currentImgList.length > 0) {
        currentImgIndex = (currentImgIndex + 1) % currentImgList.length;
        updateModalImage();
      }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if (currentImgList.length > 0) {
        currentImgIndex =
          (currentImgIndex - 1 + currentImgList.length) % currentImgList.length;
        updateModalImage();
      }
    });
  }

  // Close Modal Controls
  if (closeModal && modal) {
    closeModal.addEventListener("click", () => {
      modal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  }

  // ====================================================
  // 3. PERSISTENT COMMENTS SECTION (localStorage)
  // ====================================================
  const commentInput = document.getElementById("comment-input");
  const submitBtn = document.getElementById("submit-comment-btn");
  const commentsContainer = document.getElementById("comments-container");

  if (commentsContainer) {
    // Function to render comments on page
    function displayComments() {
      const storedComments =
        JSON.parse(localStorage.getItem("userComments")) || [];

      commentsContainer.innerHTML = "";

      if (storedComments.length === 0) {
        commentsContainer.innerHTML =
          '<p class="no-comments">No comments yet. Be the first to leave one!</p>';
        return;
      }

      storedComments.forEach((commentText) => {
        const card = document.createElement("div");
        card.className = "comment-card";

        const textPara = document.createElement("p");
        textPara.textContent = commentText;

        card.appendChild(textPara);
        commentsContainer.appendChild(card);
      });
    }

    // Load comments on initial page load
    displayComments();

    // Add new comment
    if (submitBtn && commentInput) {
      submitBtn.addEventListener("click", () => {
        const text = commentInput.value.trim();

        if (text === "") {
          alert("Please type a comment before submitting!");
          return;
        }

        const storedComments =
          JSON.parse(localStorage.getItem("userComments")) || [];
        storedComments.push(text);
        localStorage.setItem("userComments", JSON.stringify(storedComments));

        commentInput.value = "";
        displayComments();
      });
    }
  }
});
