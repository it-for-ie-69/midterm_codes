document.addEventListener("DOMContentLoaded", function () {
  const nameInput = document.querySelector("#name");
  const phoneInput = document.querySelector("#phone");
  const emailInput = document.querySelector("#email");
  const noteInput = document.querySelector("#note");

  const btnClear = document.querySelector("#btnClear");
  const btnConfirm = document.querySelector("#btnConfirm");
  const bookingCountText = document.querySelector("#booking-count");

  let currentCount = 0;

  if (btnClear) {
    btnClear.addEventListener("click", function () {
      nameInput.value = "";
      phoneInput.value = "";
      emailInput.value = "";
      noteInput.value = "";
    });
  }

  if (btnConfirm) {
    btnConfirm.addEventListener("click", function () {
      const name = nameInput.value;
      const phone = phoneInput.value;
      const email = emailInput.value;

      if (name == "" || phone == "" || email == "") {
        alert(
          "Please fill in your Name, Phone Number, and Email before confirming.",
        );
      } else {
        alert(`Reservation Confirmed!`);
        currentCount++;
        if (bookingCountText) {
          bookingCountText.textContent = currentCount;
        }
      }
    });
  }

  // Promo Code
  const btnPromoApply = document.querySelector("#btnPromoApply");
  const promoInput = document.querySelector("#promoInput");
  const promoMessage = document.querySelector("#promoMessage");

  if (btnPromoApply) {
    btnPromoApply.addEventListener("click", function () {
      const code = promoInput.value;

      if (code === "WHYU2026") {
        promoMessage.textContent = "Success! 10% Discount Applied.";
        promoMessage.style.color = "#4CAF50";
      } else if (code === "") {
        promoMessage.textContent = "Please enter a code.";
        promoMessage.style.color = "#f44336";
      } else {
        promoMessage.textContent = "Sorry, this promo code is invalid.";
        promoMessage.style.color = "#f44336";
      }
    });
  }

  // Search Menu
  const menuSearch = document.querySelector("#menuSearch");
  if (menuSearch) {
    menuSearch.addEventListener("input", function () {
      const query = menuSearch.value.toLowerCase();
      const menuItems = document.querySelectorAll(".menu-item");

      for (let i = 0; i < menuItems.length; i++) {
        const itemName = menuItems[i]
          .querySelector(".menu-item-name")
          .textContent.toLowerCase();

        if (itemName.includes(query)) {
          menuItems[i].style.display = "";
        } else {
          menuItems[i].style.display = "none";
        }
      }
    });
  }
});
