let lang = "sv";
let currentCategory = "";
let exerciseIndex = 0;

const data = {
  stress: [
    "Andas lugnt i 2 minuter. Släpp axlarna.",
    "Skriv ner 1 sak du kan förenkla idag.",
    "Ta 5 min paus utan mobil."
  ],
  relation: [
    "Tänk: Vad behöver jag just nu i relationer?",
    "Sätt en vänlig gräns idag.",
    "Visa uppskattning till någon."
  ],
  energi: [
    "Drick ett glas vatten.",
    "Rör på kroppen i 5 minuter.",
    "Gå och lägg dig 30 min tidigare."
  ],
  självkänsla: [
    "Säg: Jag duger som jag är.",
    "Skriv ner 1 styrka du har.",
    "Jämför dig inte idag."
  ],
  ekonomi: [
    "Skriv ner dagens utgifter.",
    "Fundera: Vad ger mig trygghet?",
    "Ta ett litet ekonomiskt steg."
  ],
  utveckling: [
    "Vad vill jag förbättra denna vecka?",
    "Gör 1% bättre idag.",
    "Reflektera 3 minuter."
  ]
};

function setLanguage(l) {
  lang = l;
}

function selectCategory(cat) {
  currentCategory = cat;
  exerciseIndex = 0;

  document.querySelector(".categories").style.display = "none";
  document.getElementById("guidance").classList.remove("hidden");

  document.getElementById("categoryTitle").innerText = cat.toUpperCase();
  document.getElementById("dailyText").innerText = data[cat][exerciseIndex];
}

function nextExercise() {
  exerciseIndex++;
  if (exerciseIndex >= data[currentCategory].length) {
    exerciseIndex = 0;
  }
  document.getElementById("dailyText").innerText =
    data[currentCategory][exerciseIndex];
}

function goBack() {
  document.getElementById("guidance").classList.add("hidden");
  document.querySelector(".categories").style.display = "grid";
}
