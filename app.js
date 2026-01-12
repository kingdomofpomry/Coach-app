console.log("app.js laddad");

function selectCategory(category) {
  alert("Kategori klickad: " + category);
}

function send() {
  const text = document.getElementById("input").value;
  alert("Skickat: " + text);
}

document.getElementById("lang-sv")?.addEventListener("click", () => {
  alert("Svenska vald");
});

document.getElementById("lang-en")?.addEventListener("click", () => {
  alert("English selected");
});
