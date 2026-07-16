import OpenAI from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";

export type LiveProviderName = "openai" | "gemini";

export interface LiveGenerationResult {
  provider: LiveProviderName;
  model: string;
  output: string;
}

export function configuredProvider(): LiveProviderName | null {
  if (process.env.OPENAI_API_KEY) return "openai";
  if (process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY) return "gemini";
  return null;
}

export async function generateLiveText(input: {
  system: string;
  user: string;
  provider?: LiveProviderName | null;
}): Promise<LiveGenerationResult> {
  const provider = input.provider || configuredProvider();
  if (!provider) throw new Error("No live AI provider configured.");

  if (provider === "openai") {
    const model = process.env.CHAT_MODEL || "gpt-4.1-mini";
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const response = await withRetry(() =>
      client.responses.create({
        model,
        instructions: input.system,
        input: input.user,
        temperature: 0.55,
      })
    );

    const output = response.output_text;
    if (!output) throw new Error("OpenAI returned an empty response.");
    return { provider, model, output };
  }

  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  if (!apiKey) throw new Error("Gemini API key is missing.");
  const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
  const genAI = new GoogleGenerativeAI(apiKey);
  const gemini = genAI.getGenerativeModel({ model, systemInstruction: input.system });
  const result = await withRetry(() =>
    gemini.generateContent({
      contents: [{ role: "user", parts: [{ text: input.user }] }],
      generationConfig: { temperature: 0.55, maxOutputTokens: 7000 },
    })
  );
  const output = result.response.text();
  if (!output) throw new Error("Gemini returned an empty response.");
  return { provider, model, output };
}

async function withRetry<T>(fn: () => Promise<T>, attempts = 3): Promise<T> {
  let lastError: unknown;
  for (let index = 0; index < attempts; index++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      const message = error instanceof Error ? error.message : "";
      const retryable = /429|503|rate|overload|temporarily|timeout/i.test(message);
      if (!retryable || index === attempts - 1) break;
      await new Promise((resolve) => setTimeout(resolve, 1000 * (index + 1)));
    }
  }
  throw lastError;
}
