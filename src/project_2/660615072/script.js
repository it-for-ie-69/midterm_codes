const recommendBtn = document.getElementById("recommendBtn");
const recommendationResult = document.getElementById("recommendationResult");
const hikingPlaces = [
  "Doi Pha Klong",
  "Huay Tueng Thao Waterfall",
  "Pha Lat Trail",
];

const cafePlaces = ["LONDON.cnx", "Rob's Berry", "ākho"];

recommendBtn.addEventListener("click", function () {
  const selectedActivity = document.querySelector(
    'input[name="activity"]:checked',
  );
  console.log(selectedActivity);

  if (selectedActivity === null) {
    console.log("Please choose an activity.");
  } else {
    console.log(selectedActivity.value);
    if (selectedActivity.value === "hiking") {
      const randomIndex = Math.floor(Math.random() * hikingPlaces.length);
      recommendationResult.textContent =
        "🥾 Today's pick : " + hikingPlaces[randomIndex];
    } else if (selectedActivity.value === "cafe") {
      const randomIndex = Math.floor(Math.random() * cafePlaces.length);
      recommendationResult.textContent =
        "☕ Today's pick : " + cafePlaces[randomIndex];
    }
  }
});
