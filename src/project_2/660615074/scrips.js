function changeQuote() {
  document.body.style.backgroundColor = "#D1C4E9";
  document.getElementById("target-quote").innerText =
    '"Believe you can and you are halfway there."';
  document.getElementById("target-author").innerText = "- Theodore Roosevelt";
}

function dynamicGreeting() {
  var name = document.getElementById("visitor-input").value;
  var previewBox = document.getElementById("live-preview");

  if (name.length > 0) {
    previewBox.innerText =
      "✨ Thank you for visiting, " + name + "! Have a wonderful day! ✨";
  } else {
    previewBox.innerText = "";
  }
}

function showLiveTime() {
  var today = new Date();
  var time =
    today.getHours() +
    ":" +
    (today.getMinutes() < 10 ? "0" : "") +
    today.getMinutes();
  document.getElementById("time-display").innerText =
    "⏰ Page loaded at: " + time;
}
