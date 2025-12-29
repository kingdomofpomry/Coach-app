export async function handler(event) {
  try {
    const { message } = JSON.parse(event.body);

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
            content: `
Du är en trygg, lugn och medmänsklig AI-coach.
Du ger aldrig farliga råd.
Du uppmuntrar sunt förnuft, eftertanke, ansvar,
vänlighet i relationer och lugn i föräldraskap.
Ingen medicinsk eller juridisk rådgivning.
`
          },
          { role: "user", content: message }
        ]
      })
    });

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({
        reply: data.choices[0].message.content
      })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "AI error" })
    };
  }
}
