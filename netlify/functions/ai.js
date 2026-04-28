exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Only POST allowed" })
    };
  }

  try {
    const body = JSON.parse(event.body || "{}");

    const message = body.message;
    const category = body.category || "general";
    const previous = body.previous || "";

    if (!message) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          reply: "Skriv något först 💬"
        })
      };
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "Du är en professionell livscoach. Ge korta, konkreta och personliga svar som hjälper användaren framåt."
          },
          {
            role: "user",
            content: `Kategori: ${category}
Tidigare: ${previous}
Ny reflektion: ${message}`
          }
        ]
      })
    });

    const data = await response.json();

    const reply =
      data?.choices?.[0]?.message?.content ||
      "Jag hörde dig 🌱 vill du utveckla lite mer?";

    return {
      statusCode: 200,
      body: JSON.stringify({ reply })
    };
  } catch (error) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        reply: "Något gick fel – prova igen."
      })
    };
  }
};
