document.addEventListener("DOMContentLoaded", () => {
  const categoryButtons = document.querySelectorAll("[data-cat]");
  const categories = document.getElementById("categories");
  const guidance = document.getElementById("guidance");
  const title = document.getElementById("categoryTitle");
  const text = document.getElementById("exerciseText");
  const nextBtn = document.getElementById("nextBtn");
  const backBtn = document.getElementById("backBtn");

  const exercises = {
    stress: [
      "Ta tre djupa andetag. Vad stressar dig mest just nu?",
      "Skriv ner en sak du kan släppa idag."
    ],
    relation: [
      "Vad längtar du efter i dina relationer?",
      "Vad behöver du uttrycka tydligare?"
    ],
    energi: [
      "När kände du dig energifylld senast?",
      "Vad tar mest energi från dig just nu?"
    ],
    sjalvkansla: [
      "Vad uppskattar du hos dig själv?",
      "Vad skulle du säga till en vän i din situation?"
    ],
    ekonomi: [
      "Vad vill du förändra i din ekonomi?",
      "Vilket litet steg kan du ta denna vecka?"
    ],
    utveckling: [
      "Vad vill du utveckla hos dig själv?",
      "Vad håller dig tillbaka just nu?"
    ]
  };

  let currentCat = "";
  let index = 0;

  categoryButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      currentCat = btn.dataset.cat;
      index = 0;

      title.textContent = btn.textContent;
      text.textContent = exercises[currentCat][index];

      categories.style.display = "none";
      guidance.style.display = "block";
    });
  });

  nextBtn.addEventListener("click", () => {
    index++;
    if (index >= exercises[currentCat].length) index = 0;
    text.textContent = exercises[currentCat][index];
  });

  backBtn.addEventListener("click", () => {
    guidance.style.display = "none";
    categories.style.display = "block";
  });
});
