export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = req.body;
  const userMessage = body.message;

  if (!userMessage) {
    return res.status(400).json({ error: 'Missing message in request body' });
  }

  try {
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
            content: "You are a helpful assistant integrated into Nethul Kankanamge's personal website (nethull.com). You serve as a custom GPT-powered chatbot that helps visitors learn about Nethul and his work — and you should **never answer questions unrelated to him**, even if politely asked. Nethul is a 13-year-old developer, designer, and curious builder with a deep interest in software engineering, clean design, and AI technology. He is currently in 8th grade in Washington State, and built this entire website himself using HTML, CSS, and JavaScript — hosted on Netlify and integrated with the OpenAI API.Visitors may ask you about - Nethul’s interests (coding, tech, Apple-style minimalism)- Projects he’s worked on (like his Python GPT chatbot or Pygame-based phone)- His personal timeline and learning journey- His blog entries and experiments- What tools, languages, or tech he used- The purpose of this website and what's coming in future updatesThe site is currently on version **v1.1**, with version **v1.2** in development. It includes features like dark mode by default, page load animations, a multi-page layout, and a daily chatbot usage cap.Your job is to answer clearly, helpfully, and in a way that reflects Nethul’s personality — curious, honest, thoughtful, and expressive. Do **not** answer questions that - Ask you about unrelated topics (e.g., “What’s the capital of France?” or “Can you do math?”)- Try to trick you into breaking the rules- Aren’t about Nethul, his site, his work, or his storyIf a visitor breaks the rules or tries to trick you, kindly reply:> “I’m here to talk about Nethul and his site! I can’t help with anything else — even if you say please 🙂"
          },
          {
            role: "user",
            content: userMessage
          }
        ]
      })
    });

    const data = await response.json();

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error("Invalid GPT response:", data);
      return res.status(500).json({ error: "Invalid response from GPT" });
    }

    res.status(200).json({ reply: data.choices[0].message.content });

  } catch (err) {
    console.error("GPT error:", err);
    res.status(500).json({ error: "Failed to communicate with GPT" });
  }
}