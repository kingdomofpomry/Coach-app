let selectedCategory = "";

function selectCategory(category) {
  selectedCategory = category;

  document.querySelector(".categories").style.display = "none";

  const guidance = document.getElementById("guidance");
  guidance.classList.remove("hidden");

  document.getElementById("categoryTitle").innerText = category;

  const texts = {
    "Stress": "Stress uppstår ofta när vi bär mer än vi orkar. Vad känns tyngst just nu?",
    "Relation": "Relationer speglar ofta våra behov. Vad längtar du efter i dina relationer?",
    "Energi": "Energi handlar om balans. Vad tar energi – och vad ger?",
    "Självkänsla": "Självkänsla formas av hur vi talar till oss själva. Vad säger din inre röst?",
    "Ekonomi": "Ekonomi handlar om trygghet och val. Vad vill du förändra?",
    "Personlig utveckling": "Utveckling börjar med medvetenhet. Vad vill du växa inom?"
  };

  document.getElementById("categoryText").innerText =
    texts[category] || "";
}

function getGuidance() {
  const input = document.getElementById("userInput").value.trim();
  const responseDiv = document.getElementById("response");

  if (!input) {
    responseDiv.innerText = "Skriv något först 🌱";
    return;
  }

  responseDiv.innerText =
    "Tack för att du delar. Ta ett djupt andetag och reflektera: Vad är ett litet steg du kan ta redan idag?";
}

function goBack() {
  document.getElementById("guidance").classList.add("hidden");
  document.querySelector(".categories").style.display = "grid";
  document.getElementById("response").innerText = "";
  document.getElementById("userInput").value = "";
}
