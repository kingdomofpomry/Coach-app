const previousAnswer = document.getElementById("previous-answer");
console.log("app.js laddad");

/* ÖVNINGAR */

const exercises = {

stress:[
{title:"Reflektion",text:"Vad är den största källan till stress i ditt liv just nu?"},
{title:"Handling",text:"Skriv ner EN sak du kan göra idag för att minska stressen."},
{title:"Tankemönster",text:"Vilken tanke gör stressen värre – och hur kan du formulera den mer vänligt?"}
],

relation:[
{title:"Reflektion",text:"Vilken relation upptar mest av dina tankar just nu?"},
{title:"Handling",text:"Finns det ett samtal du behöver ta?"},
{title:"Tankemönster",text:"Vilken roll tar du ofta i relationer?"}
],

energi:[
{title:"Reflektion",text:"När på dagen känner du dig mest trött?"},
{title:"Handling",text:"Vad är en liten sak som skulle ge dig mer energi imorgon?"},
{title:"Tankemönster",text:"Hur pratar du med dig själv när du är trött?"}
],

självkänsla:[
{title:"Reflektion",text:"När tvivlar du mest på dig själv?"},
{title:"Handling",text:"Skriv ner en sak du gjorde bra idag."},
{title:"Tankemönster",text:"Hur skulle du prata med en vän i samma situation?"}
],

ekonomi:[
{title:"Reflektion",text:"Vad i din ekonomi skapar mest oro just nu?"},
{title:"Handling",text:"Vilken liten ekonomisk förbättring kan du göra denna vecka?"},
{title:"Tankemönster",text:"Vilken tanke har du kring pengar som begränsar dig?"}
],

utveckling:[
{title:"Reflektion",text:"Vad vill du egentligen växa inom just nu?"},
{title:"Handling",text:"Vilket litet steg kan du ta denna vecka?"},
{title:"Tankemönster",text:"Vad håller dig tillbaka – rädsla eller vana?"}
]

};


/* STATE */

let currentCategory=null;
let currentStep=0;


/* ELEMENT */

const card=document.getElementById("exercise-card");
const title=document.getElementById("card-title");
const text=document.getElementById("card-text");
const nextBtn=document.getElementById("next-btn");
const progress=document.getElementById("progress");
const todayPlan = document.getElementById("today-plan");

/* VÄLJ KATEGORI */

function selectCategory(category){

currentCategory=category;
currentStep=0;

showExercise();

}


/* VISA ÖVNING */

function showExercise(){

const step=exercises[currentCategory][currentStep];

title.textContent=step.title;
text.textContent=step.text;

progress.textContent = (currentStep + 1) + " / " + exercises[currentCategory].length;

card.classList.remove("hidden");
  todayPlan.textContent =
"Din plan idag: " +
currentCategory +
" – steg " +
(currentStep + 1) +
"/" +
exercises[currentCategory].length;

todayPlan.classList.remove("hidden");
  
localStorage.setItem("coachCategory", currentCategory);
localStorage.setItem("coachStep", currentStep);

const key = currentCategory + "_step_" + currentStep;
const saved = localStorage.getItem(key);

if(saved){
  previousAnswer.textContent = "Din förra reflektion: " + saved;
  previousAnswer.classList.remove("hidden");
}else{
  previousAnswer.classList.add("hidden");
}


/* NÄSTA */

nextBtn.onclick=function(){

currentStep++;

const steps=exercises[currentCategory];

if(currentStep<steps.length){

showExercise();

}else{

title.textContent="Avslut";
text.textContent="Bra jobbat. Vill du fortsätta med en ny kategori eller repetera denna?";

nextBtn.style.display="none";

}

};


/* PÅMINNELSER */

function enableReminders(){

if(!("Notification" in window)){

alert("Din webbläsare stödjer inte notiser");
return;

}

Notification.requestPermission().then(permission=>{

if(permission==="granted"){

alert("Påminnelser aktiverade 🔔");

}

});

}

function scheduleDaily(){

alert("Daglig påminnelse sparad ⏰");

}


/* SPRÅK */

document.getElementById("lang-sv")?.addEventListener("click",()=>{

alert("Svenska valt");

});

document.getElementById("lang-en")?.addEventListener("click",()=>{

alert("English coming soon");

});
const savedCategory = localStorage.getItem("coachCategory");
const savedStep = localStorage.getItem("coachStep");

if(savedCategory){

currentCategory = savedCategory;
currentStep = parseInt(savedStep) || 0;

showExercise();

}

}
else if(currentCategory === "energi"){
  aiReply = "Bra att du uppmärksammar din energi. Vad ger dig energi – och vad tar den?";
}
else{
  aiReply = "Stark reflektion. Vad blir ditt nästa lilla steg framåt?";
}

alert("Svar sparat ✅\n\nAI Coach:\n" + aiReply);

input.value = "";

}
async function send(){

const input = document.getElementById("input");
const text = input.value.trim();

if(!text) return;

// spara svar
const key = currentCategory + "_step_" + currentStep;
localStorage.setItem(key, text);

try{

const res = await fetch("/.netlify/functions/ai", {
  method: "POST",
  body: JSON.stringify({
    message: text,
    category: currentCategory
  })
});

const data = await res.json();

alert("AI Coach:\n\n" + data.reply);

}catch(err){
  alert("AI funkar inte just nu");
}

input.value = "";

}
