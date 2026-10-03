const OpenAI = require("openai");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers: {"Content-Type":"application/json"}, body: JSON.stringify({error:"Method not allowed"}) };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const message = String(body.message || "").trim();

    if (!message) {
      return { statusCode: 400, headers: {"Content-Type":"application/json"}, body: JSON.stringify({error:"Message is required"}) };
    }

    if (message.length > 6000) {
      return { statusCode: 413, headers: {"Content-Type":"application/json"}, body: JSON.stringify({error:"Message is too long"}) };
    }

    if (!process.env.OPENAI_API_KEY) {
      return { statusCode: 500, headers: {"Content-Type":"application/json"}, body: JSON.stringify({error:"OPENAI_API_KEY is not configured"}) };
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-6-luna",
      instructions: "You are Aditya-Verse.AI, a helpful, concise AI assistant. Be clear and honest. Do not claim to have performed actions you cannot perform.",
      input: message
    });

    return {
      statusCode: 200,
      headers: {"Content-Type":"application/json", "Cache-Control":"no-store"},
      body: JSON.stringify({ reply: response.output_text || "I couldn't generate a response." })
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({error:"AI request failed"})
    };
  }
};