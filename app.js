function selectCategory(name) {
  document.querySelector(".categories").style.display = "none";
  document.getElementById("guidance").classList.remove("hidden");
  document.getElementById("title").innerText = name;
}

function goBack() {
  document.getElementById("guidance").classList.add("hidden");
  document.querySelector(".categories").style.display = "grid";
}
