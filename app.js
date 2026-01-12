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

const categoryButtons = document.querySelectorAll("[data-cat]");
const guidance = document.getElementById("guidance");
const categories = document.getElementById("categories");
const title = document.getElementById("categoryTitle");
const text = document.getElementById("exerciseText");
const nextBtn = document.getElementById("nextBtn");
const backBtn = document.getElementById("backBtn");

categoryButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    currentCategory = btn.dataset.cat;
    index = 0;

    categories.style.display = "none";
    guidance.classList.remove("hidden");

    title.innerText = btn.innerText;
    text.innerText = exercises[currentCategory][index];

    nextBtn.disabled = false;
  });
});

nextBtn.addEventListener("click", () => {
  if (!currentCategory) return;

  index++;
  if (index >= exercises[currentCategory].length) index = 0;
  text.innerText = exercises[currentCategory][index];
});

backBtn.addEventListener("click", () => {
  guidance.classList.add("hidden");
  categories.style.display = "grid";
  currentCategory = null;
});
