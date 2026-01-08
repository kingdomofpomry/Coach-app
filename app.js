let language = "sv";

function setLanguage(lang) {
  language = lang;
  alert(lang === "sv" ? "Svenska valt" : "English selected");
}

function chooseCategory(category) {
  document.getElementById("step-1").classList.remove("active");
  document.getElementById("step-2").classList.add("active");

  const title = document.getElementById("category-title");
  const text = document.getElementById("coach-text");

  const content = {
    stress: {
      sv: "Stress",
      text: "Stress uppstår ofta när vi bär för mycket. Vad pressar dig mest just nu?"
    },
    relation: {
      sv: "Relation",
      text: "Relationer speglar ofta våra innersta behov. Vad känns oklart för dig?"
    },
    energi: {
      sv: "Energi",
      text: "Låg energi är en signal. Vad tror du saknas i din vardag?"
    },
    självkänsla: {
      sv: "Självkänsla",
      text: "Hur pratar du med dig själv när det är svårt?"
    },
    ekonomi: {
      sv: "Ekonomi",
      text: "Ekonomi handlar både om pengar och trygghet. Vad vill du förändra?"
    },
    personlig: {
      sv: "Personlig utveckling",
      text: "Utveckling börjar med medvetenhet. Vem vill du bli?"
    }
  };

  title.innerText = content[category].sv;
  text.innerText = content[category].text;
}

function goBack() {
  document.getElementById("step-2").classList.remove("active");
  document.getElementById("step-1").classList.add("active");
}
