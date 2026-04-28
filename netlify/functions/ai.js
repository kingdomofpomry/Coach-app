exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" })
    };
  }

  try {
    const body = JSON.parse(event.body || "{}");

    const message = body.message;
    const category = body.category || "okänd";
    const previous = body.previous || "";
    const language = body.language || "sv";

    if (!message) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          reply: language === "en"
            ? "I didn't receive anything – try writing something."
            : "Jag fick inget svar – skriv gärna något."
        })
      };
    }

    const systemPrompt =
      language === "en"
        ? "You are a professional mental performance coach. Give short, clear, actionable advice. Always end with one reflective question."
        : "Du är en professionell livscoach. Ge korta, konkreta och personliga svar. Avsluta alltid med en följdfråga.";

    const userPrompt =
      language === "en"
        ? `Category: ${category}
Previous reflection: ${previous || "None"}
New reflection: ${message}`
        : `Kategori: ${category}
Tidigare reflektion: ${previous || "Ingen"}
Ny reflektion: ${message}`;

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
            content: systemPrompt
          },
          {
            role: "user",
            content: userPrompt
          }
        ]
      })
    });

    const data = await response.json();

    const reply =
      data?.choices?.[0]?.message?.content ||
      (language === "en"
        ? "I'm here with you 🌱 Something went wrong — try again?"
        : "Jag är här med dig 🌱 Något gick fel — prova igen?");

    return {
      statusCode: 200,
      body: JSON.stringify({ reply })
    };

  } catch (error) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        reply: "ERROR: " + error.message
      })
    };
  }
};
