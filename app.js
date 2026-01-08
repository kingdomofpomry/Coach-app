let language = "sv";
let area = "";
let focus = "";

const texts = {
  sv: {
    stress: "Stress uppstår ofta när vi tar ansvar för mer än vi har utrymme för. Vad pressar dig mest just nu?",
    relation: "Relationer speglar ofta våra inre behov. Känns det som längtan, frustration eller osäkerhet?",
    energy: "Låg energi kan vara ett tecken på att något viktigt saknas. Vila, glädje eller tydliga gränser?",
    confidence: "Självkänsla byggs genom hur vi talar till oss själva. Vad säger din inre röst oftast?"
  },
  en: {
    stress: "Stress often appears when we carry too much. What feels heaviest right now?",
    relation: "Relationships often reflect inner needs. Is it longing, frustration, or uncertainty?",
    energy: "Low energy may signal unmet needs. Rest, joy, or boundaries?",
    confidence: "Confidence grows from self-talk. What does your inner voice say?"
  }
};

function setLanguage(lang) {
  language = lang;
}

function chooseArea(selected) {
  area = selected;
  document.getElementById("step1").classList.add("hidden");
  document.getElementById("step2").classList.remove("hidden");
}

function chooseFocus(selected) {
  focus = selected;
  document.getElementById("step2").classList.add("hidden");
  document.getElementById("step3").classList.remove("hidden");
}

function getGuidance() {
  const response = document.getElementById("response");
  response.innerText = texts[language][focus];
  response.classList.remove("hidden");
}
