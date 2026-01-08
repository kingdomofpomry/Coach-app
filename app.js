let language = "sv";

const guidance = {
  stress: {
    title: "Stress",
    text: `
Stress uppstår ofta när vi tar ansvar för mer än vi har utrymme för.

🌱 Reflektera:
• Vad stressar dig mest just nu?
• Är det något du kan pausa eller förenkla?

🧘 Övning:
Sätt en timer på 2 minuter. Andas lugnt och fråga dig själv:
“Vad behöver jag just nu – egentligen?”
`
  },

  relation: {
    title: "Relation",
    text: `
Relationer väcker både längtan och sårbarhet.

❤️ Reflektera:
• Känner du dig sedd och hörd?
• Vad längtar du efter mer av?

✍️ Övning:
Skriv ner tre saker du behöver i en relation – utan att censurera dig själv.
`
  },

  energi: {
    title: "Energi",
    text: `
Låg energi är ofta ett tecken på obalans.

⚡ Reflektera:
• Vad tar mest energi från dig?
• Vad ger dig energi, även i små doser?

🌿 Övning:
Gör EN sak idag som ger dig lite mer liv – även om den känns obetydlig.
`
  },

  självkänsla: {
    title: "Självkänsla",
    text: `
Självkänsla handlar om hur du möter dig själv.

🌱 Reflektera:
• Hur pratar du med dig själv när du gör fel?
• Vems röst är det egentligen?

💬 Övning:
Säg högt: “Jag gör så gott jag kan – och det räcker just nu.”
`
  },

  ekonomi: {
    title: "Ekonomi",
    text: `
Ekonomi är ofta kopplat till trygghet och självvärde.

💰 Reflektera:
• Vad skapar mest oro kring pengar?
• Vad betyder “ekonomisk trygghet” för dig?

📊 Övning:
Skriv ner ALLA inkomster och utgifter – bara för att skapa klarhet, inte skuld.
`
  },

  personlig: {
    title: "Personlig utveckling",
    text: `
Utveckling börjar med medvetenhet.

🚀 Reflektera:
• Vem vill du vara om 1 år?
• Vad håller dig tillbaka idag?

🛤 Övning:
Välj EN vana du vill stärka denna vecka – inte fler.
`
  }
};

function setLanguage(lang) {
  language = lang;
}

function selectCategory(type) {
  document.querySelector(".buttons").style.display = "none";
  document.querySelector(".lang").style.display = "none";

  document.getElementById("resultTitle").innerText = guidance[type].title;
  document.getElementById("resultText").innerText = guidance[type].text;

  document.getElementById("result").classList.remove("hidden");
}

function goBack() {
  document.getElementById("result").classList.add("hidden");
  document.querySelector(".buttons").style.display = "grid";
  document.querySelector(".lang").style.display = "flex";
}
