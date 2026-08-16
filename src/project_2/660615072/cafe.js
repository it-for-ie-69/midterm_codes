const opinionInput = document.getElementById("opinionInput");
const submitBtn = document.getElementById("submitBtn");
const popup = document.getElementById("popup");
const closeBtn = document.getElementById("closeBtn");
const popupTitle = document.getElementById("popupTitle");
const popupMessage = document.getElementById("popupMessage");
const cafeImages = document.querySelectorAll(".gallery img");
submitBtn.addEventListener("click", function () {
  if (opinionInput.value === "") {
    alert("Please enter your opinion.");
  } else {
    popupMessage.textContent = "Thank you for sharing your opinion.";
    popup.style.display = "flex";
  }
});

closeBtn.addEventListener("click", function () {
  popup.style.display = "none";
  opinionInput.value = "";
});

cafeImages.forEach((image) => {
  image.addEventListener("dblclick", function () {
    popupMessage.textContent = "Thank you for liking this photo!❤️";
    popup.style.display = "flex";
  });
});
