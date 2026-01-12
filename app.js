let currentLang = "sv";

const texts = {
  sv: {
    title: "Din Coach",
    placeholder: "Skriv här...",
  },
  en: {
    title: "Your Coach",
    placeholder: "Write here...",
  }
};

function setLanguage(lang) {
  currentLang = lang;
  document.querySelector("h1").innerText = texts[lang].title;
  document.querySelector("textarea").placeholder = texts[lang].placeholder;
}

function selectCategory(name) {
  document.querySelector(".categories").style.display = "none";
  document.getElementById("guidance").classList.remove("hidden");
  document.getElementById("title").innerText = name;
}

function goBack() {
  document.getElementById("guidance").classList.add("hidden");
  document.querySelector(".categories").style.display = "grid";
}
