let selectedCategory = "";

function selectCategory(category) {
  selectedCategory = category;

  document.querySelector(".categories").style.display = "none";
  document.getElementById("guidance").classList.remove("hidden");

  document.getElementById("categoryTitle").innerText = category;

  const texts = {
    "Stress": "Stress uppstår ofta när vi bär mer än vi orkar. Vad känns tyngst just nu?",
    "Relation": "Relationer speglar våra behov. Vad längtar du efter?",
    "Energi": "Vad tar energi – och vad ger?",
    "Självkänsla": "Hur talar du till dig själv i svåra stunder?",
    "Ekonomi": "Vad vill du förändra i din ekonomiska situation?",
    "Personlig utveckling": "Vad vill du växa inom?"
  };

  document.getElementById("categoryText").innerText = texts[category];
}

function getGuidance() {
  const input = document.getElementById("userInput").value;
  const response = document.getElementById("response");

  if (!input.trim()) {
    response.innerText = "Skriv något först 🌱";
    return;
  }

  response.innerText =
    "Tack för att du delar. Reflektera över ett litet steg du kan ta idag.";
}

function goBack() {
  document.getElementById("guidance").classList.add("hidden");
  document.querySelector(".categories").style.display = "grid";
  document.getElementById("response").innerText = "";
  document.getElementById("userInput").value = "";
}
