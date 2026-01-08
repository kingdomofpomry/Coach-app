function send() {
  const input = document.getElementById("input");
  const responseDiv = document.getElementById("response");

  if (!input.value.trim()) {
    responseDiv.innerText = "Skriv något först 🌱";
    return;
  }

  const text = input.value.toLowerCase();

  let reply = "Jag hör dig.\n\nTa ett lugnt andetag.\n\n";

  if (text.includes("stress") || text.includes("trött")) {
    reply +=
      "Stress är ofta ett tecken på att något behöver få lite mer utrymme eller vila.\n\n" +
      "Vad känns mest pressande just nu?";
  } else if (text.includes("relation") || text.includes("partner")) {
    reply +=
      "Relationer väcker mycket känslor, särskilt när man bryr sig.\n\n" +
      "Vad är det du innerst inne önskar ska bli bättre?";
  } else if (text.includes("barn") || text.includes("familj")) {
    reply +=
      "När det gäller barn och familj är lugn och närvaro viktigare än perfektion.\n\n" +
      "Vad hade känts som ett snällt nästa steg?";
  } else {
    reply +=
      "Det du delar är viktigt.\n\n" +
      "Vill du utforska känslan bakom det du skrev, eller situationen runt omkring?";
  }

  responseDiv.innerText = reply;
  input.value = "";
}
