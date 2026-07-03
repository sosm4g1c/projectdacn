import { FEEDBACK_PROMPT } from "../../../services/Constants";
import { OpenAI } from "openai";
import { NextResponse } from "next/server";
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export async function POST(req) {
  const { conversation } = await req.json();
  const FINAL_PROMPT = FEEDBACK_PROMPT.replace(
    "{{conversation}}",
    JSON.stringify(conversation)
  );
  try {
    await delay(3000);
    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "meta-llama/llama-4-scout-17b-16e-instruct",
      // model: "google/gemini-2.5-pro-exp-03-25:free",
      // model:"mistralai/mistral-small-3.1-24b-instruct:free",
      messages: [{ role: "user", content: FINAL_PROMPT }],
    });
    console.log(
      "Raw completion response:",
      JSON.stringify(completion, null, 2)
    );
    console.log(completion.choices[0].message.content);
    return NextResponse.json(completion.choices[0].message);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
