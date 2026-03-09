console.log("app.js laddad");

/* =========================
DATA – ÖVNINGAR
========================= */

const exercises = {
stress: [
{title:"Reflektion",text:"Vad är den största källan till stress i ditt liv just nu?"},
{title:"Handling",text:"Skriv ner EN sak du kan göra idag för att minska stressen."},
{title:"Tankemönster",text:"Vilken tanke gör stressen värre – och hur kan du formulera den mer vänligt?"}
],

relation: [
{title:"Reflektion",text:"Vilken relation upptar mest av dina tankar just nu?"},
{title:"Handling",text:"Finns det ett samtal du behöver ta?"}, 
{title:"Tankemönster",text:"Vilken roll tar du ofta i relationer?"}
],

energi: [
{title:"Reflektion",text:"När på dagen känner du dig mest trött?"}, 
{title:"Handling",text:"Vad är en liten sak som skulle ge dig mer energi imorgon?"}, 
{title:"Tankemönster",text:"Hur pratar du med dig själv när du är trött?"}
],

självkänsla: [
{title:"Reflektion",text:"När tvivlar du mest på dig själv?"}, 
{title:"Handling",text:"Skriv ner en sak du gjorde bra idag."}, 
{title:"Tankemönster",text:"Hur skulle du prata med en vän i samma situation?"}
],

ekonomi: [
{title:"Reflektion",text:"Vad i din ekonomi skapar mest oro just nu?"}, 
{title:"Handling",text:"Vilken liten ekonomisk förbättring kan du göra denna vecka?"}, 
{title:"Tankemönster",text:"Vilken tanke har du kring pengar som begränsar dig?"}
],

utveckling: [
{title:"Reflektion",text:"Vad vill du egentligen växa inom just nu?"}, 
{title:"Handling",text:"Vilket litet steg kan du ta denna vecka?"}, 
{title:"Tankemönster",text:"Vad håller dig tillbaka – rädsla eller vana?"}
]
};

/* =========================
STATE
========================= */

let currentCategory = null;
let currentStep = 0;

/* =========================
ELEMENT
========================= */

const chat = document.querySelector(".chat");
const input = document.getElementById("input");

/* =========================
CATEGORY
========================= */

function selectCategory(category){

currentCategory = category;
currentStep = 0;

chat.innerHTML="";

addBotMessage(
exercises[category][0].title,
exercises[category][0].text
);

showNextButton();

}

/* =========================
SEND TEXT
========================= */

function send(){

const text=input.value.trim();
if(!text)return;

addUserMessage(text);

input.value="";

}

/* =========================
NEXT STEP
========================= */

function nextExercise(){

if(!currentCategory)return;

currentStep++;

const steps=exercises[currentCategory];

if(currentStep<steps.length){

addBotMessage(
steps[currentStep].title,
steps[currentStep].text
);

}else{

addBotMessage(
"Avslut",
"Bra jobbat. Vill du fortsätta med en ny kategori eller repetera denna?"
);

hideNextButton();

}

}

/* =========================
UI
========================= */

function addUserMessage(text){

const div=document.createElement("div");
div.className="user-msg";
div.textContent=text;

chat.appendChild(div);

}

function addBotMessage(title,text){

const div=document.createElement("div");
div.className="bot-msg";

div.innerHTML=`<strong>${title}</strong><br>${text}`;

chat.appendChild(div);

}

function showNextButton(){

let btn=document.getElementById("next-btn");

if(!btn){

btn=document.createElement("button");
btn.id="next-btn";
btn.textContent="Nästa övning";
btn.onclick=nextExercise;
btn.style.marginTop="12px";

chat.appendChild(btn);

}

}

function hideNextButton(){

const btn=document.getElementById("next-btn");

if(btn)btn.remove();

}

/* =========================
REMINDERS
========================= */

function enableReminders(){

if(!("Notification" in window)){

alert("Din webbläsare stödjer inte notiser");

return;

}

Notification.requestPermission().then(permission=>{

if(permission==="granted"){

alert("Påminnelser aktiverade 🔔");

localStorage.setItem("reminders","on");

}

});

}

function scheduleDaily(){

if(Notification.permission!=="granted"){

alert("Aktivera påminnelser först");

return;

}

localStorage.setItem("dailyReminder","20:00");

alert("Daglig påminnelse satt till 20:00");

}

/* =========================
CHECK REMINDER
========================= */

setInterval(()=>{

const time=localStorage.getItem("dailyReminder");

if(!time)return;

const now=new Date();

const current=now.toTimeString().slice(0,5);

if(current===time && !window._notified){

new Notification("Din Coach",{

body:"Dags för dagens övning ✨"

});

window._notified=true;

setTimeout(()=>window._notified=false,60000);

}

},30000);

/* =========================
LANGUAGE
========================= */

document.getElementById("lang-sv")?.addEventListener("click",()=>{
alert("Svenska valt");
});

document.getElementById("lang-en")?.addEventListener("click",()=>{
alert("English coming soon");
});
