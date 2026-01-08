let language = "sv";

function setLanguage(lang) {
  language = lang;
}

function selectCategory(type) {
  const content = {
    stress: "Stress uppstår när vi bär mer än vi orkar. Vad känns tyngst just nu?",
    relation: "Relationer speglar våra behov. Vad längtar du efter?",
    energi: "Energi visar vad kroppen behöver. Vad saknas just nu?",
    självkänsla: "Hur talar du till dig själv när det är svårt?",
    ekonomi: "Ekonomi handlar om trygghet. Vad vill du förändra?",
    personlig: "Utveckling börjar med medvetenhet. Vem vill du bli?"
  };

  document.querySelector(".buttons").style.display = "none";
  document.querySelector(".lang").style.display = "none";

  const result = document.getElementById("result");
  document.getElementById("title").innerText = type.toUpperCase();
  document.getElementById("text").innerText = content[type];

  result.hidden = false;
}

function reset() {
  document.getElementById("result").hidden = true;
  document.querySelector(".buttons").style.display = "grid";
  document.querySelector(".lang").style.display = "flex";
}
