let currentLanguage = "sv";

const texts = {
  sv: {
    title: "Din Coach",
    subtitle: "Välj område och få vägledning. Detta ersätter inte professionell rådgivning.",
    economy:
      "Ekonomi handlar inte bara om pengar, utan om trygghet och valfrihet. Vill du börja med budget, mål eller relation till pengar?",
    development:
      "Personlig utveckling börjar med självinsikt. Vad vill du stärka just nu – disciplin, självkänsla eller riktning?"
  },
  en: {
    title: "Your Coach",
    subtitle: "Choose an area for guidance. This does not replace professional advice.",
    economy:
      "Economy is not only about money, but about security and freedom of choice. Do you want to start with budgeting, goals, or mindset?",
    development:
      "Personal development starts with awareness. What do you want to strengthen right now – discipline, confidence, or direction?"
  }
};

function setLanguage(lang) {
  currentLanguage = lang;
  document.getElementById("title").innerText = texts[lang].title;
  document.getElementById("subtitle").innerText = texts[lang].subtitle;
  document.getElementById("response").style.display = "none";
}

function selectCategory(category) {
  const box = document.getElementById("response");
  box.innerText = texts[currentLanguage][category];
  box.style.display = "block";
}
