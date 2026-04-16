export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" })
    };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const message = body.message;
    const previous = body.previous;

    if (!message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ reply: "Jag hörde inget. Skriv gärna igen 🌱" })
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
              "Du är en trygg, lugn och varm AI-coach. " +
              "Du ger reflektion, stöd och enkla råd. " +
              "Ingen medicinsk, juridisk eller professionell rådgivning."
          },
          {
            role: "user",
            content: message
          }
        ]
      })
    });

    if (!response.ok) {
      throw new Error("OpenAI API error");
    }

    const data = await response.json();
    const reply =
      data?.choices?.[0]?.message?.content ||
      "Jag är här med dig 🌱 Vill du berätta lite mer?";

    return {
      statusCode: 200,
      body: JSON.stringify({ reply })
    };

  } catch (error) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        reply:
          "Det verkar vara lite tekniskt strul just nu 🌧️ " +
          "Ta ett djupt andetag och prova igen om en stund."
      })
    };
  }
}
