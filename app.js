let language = "sv";

function setLanguage(lang) {
  language = lang;
}

function selectCategory(type) {
  const text = {
    stress: "Stress uppstår när vi bär mer än vi orkar. Vad känns tyngst just nu?",
    relation: "Relationer speglar våra behov. Vad längtar du efter?",
    energi: "Energi visar vad kroppen behöver. Vad saknas just nu?",
    självkänsla: "Hur talar du till dig själv när det är svårt?",
    ekonomi: "Ekonomi handlar om trygghet och val. Vad vill du förändra?",
    personlig: "Personlig utveckling börjar med ärlighet. Vem vill du bli?"
  };

  document.querySelector(".buttons").style.display = "none";
  document.querySelector(".lang").style.display = "none";

  document.getElementById("resultTitle").innerText = type.toUpperCase();
  document.getElementById("resultText").innerText = text[type];

  document.getElementById("result").classList.remove("hidden");
}

function goBack() {
  document.getElementById("result").classList.add("hidden");
  document.querySelector(".buttons").style.display = "grid";
  document.querySelector(".lang").style.display = "flex";
}
