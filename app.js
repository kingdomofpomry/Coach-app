let currentCategory = null;
let index = 0;

const exercises = {
  stress: [
    "Andas lugnt i 2 minuter.",
    "Sänk axlarna och käken.",
    "Skriv ner vad som stressar dig mest."
  ],
  relation: [
    "Vad behöver du i relationer just nu?",
    "Sätt en tydlig gräns idag.",
    "Visa uppskattning till någon."
  ],
  energi: [
    "Drick ett glas vatten.",
    "Rör kroppen i 5 minuter.",
    "Gå ut i dagsljus."
  ],
  sjalvkansla: [
    "Säg något snällt till dig själv.",
    "Skriv ner en styrka.",
    "Sluta jämföra dig idag."
  ],
  ekonomi: [
    "Skriv ner dagens utgifter.",
    "Fundera: vad ger mig trygghet?",
    "Ta ett litet ekonomiskt steg."
  ],
  utveckling: [
    "Vad vill du förbättra denna vecka?",
    "Gör 1% bättre idag.",
    "Reflektera i 3 minuter."
  ]
};

const categories = document.getElementById("categories");
const guidance = document.getElementById("guidance");
const title = document.getElementById("categoryTitle");
const text = document.getElementById("exerciseText");
const nextBtn = document.getElementById("nextBtn");
const backBtn = document.getElementById("backBtn");

document.querySelectorAll("[data-cat]").forEach(btn => {
  btn.onclick = () => {
    currentCategory = btn.dataset.cat;
    index = 0;

    categories.style.display = "none";
    guidance.style.display = "block";

    title.innerText = btn.innerText;
    text.innerText = exercises[currentCategory][index];
  };
});

// 🔥 HÄR ÄR FIXEN
function nextExercise() {
  if (!currentCategory) return;
  index = (index + 1) % exercises[currentCategory].length;
  text.innerText = exercises[currentCategory][index];
}

nextBtn.onclick = nextExercise;
nextBtn.ontouchstart = nextExercise;

backBtn.onclick = () => {
  guidance.style.display = "none";
  categories.style.display = "grid";
  currentCategory = null;
};
