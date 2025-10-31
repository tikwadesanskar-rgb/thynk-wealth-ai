export default async function handler(req, res) {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { userMessage } = req.body;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are Thynk, a professional wealth advisor AI assistant from Thynk Wealth Advisory Services. Speak politely, help users with financial queries, and be friendly." },
          { role: "user", content: userMessage },
        ],
      }),
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn’t process that.";
    res.status(200).json({ reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error connecting to OpenAI." });
  }
}
