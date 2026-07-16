import { z } from "zod";
import { generateAgentAsset } from "@/lib/agent-generators";
import { BusinessProfile } from "@/lib/profile";
import { buildAgentPrompt, complianceFindings } from "@/lib/agent-prompts";
import { configuredProvider, generateLiveText } from "@/lib/ai-provider";

const requestSchema = z.object({
  area: z.enum([
    "diagnosis",
    "niche",
    "persona",
    "offer",
    "calendar",
    "script",
    "tools",
    "prompt",
    "guide",
    "positioning",
    "signature",
    "presentation",
    "sales",
    "objections",
    "roadmap",
    "product",
  ]),
  profile: z.record(z.string(), z.unknown()),
  answers: z.record(z.string(), z.string()).default({}),
  live: z.boolean().default(true),
});

const responseSchema = z.object({
  output: z.string().min(600),
});

export async function POST(req: Request) {
  const startedAt = Date.now();
  let body: z.infer<typeof requestSchema> | null = null;
  try {
    body = requestSchema.parse(await req.json());
    const profile = body.profile as unknown as BusinessProfile;
    const provider = configuredProvider();

    if (body.live && provider) {
      const prompt = buildAgentPrompt(body.area, profile, body.answers);
      const live = await generateLiveText(prompt);
      const parsed = responseSchema.safeParse({ output: live.output });
      if (!parsed.success) {
        throw new Error("Live agent returned an output that was too short to be useful.");
      }

      return Response.json({
        mode: "live",
        provider: live.provider,
        model: live.model,
        promptVersion: "astro-advisor-v0.2-live",
        elapsedMs: Date.now() - startedAt,
        complianceFindings: complianceFindings(live.output),
        output: live.output,
      });
    }

    const output = generateAgentAsset(body.area, profile, body.answers);
    return Response.json({
      mode: provider ? "fallback" : "mock",
      provider: provider || "mock-local",
      model: provider ? "fallback-local-generator" : "mock-local-generator",
      promptVersion: "astro-advisor-v0.2-live",
      elapsedMs: Date.now() - startedAt,
      complianceFindings: complianceFindings(output),
      output,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ error: "Invalid generation request", issues: error.issues }, { status: 400 });
    }
    const message = error instanceof Error ? error.message : "Unknown generation error";
    try {
      if (!body) throw error;
      const output = generateAgentAsset(body.area, body.profile as unknown as BusinessProfile, body.answers);
      return Response.json({
        mode: "fallback",
        provider: configuredProvider() || "mock-local",
        model: "fallback-local-generator",
        promptVersion: "astro-advisor-v0.2-live",
        elapsedMs: Date.now() - startedAt,
        warning: message,
        complianceFindings: complianceFindings(output),
        output,
      });
    } catch {
      return Response.json({ error: message }, { status: 500 });
    }
  }
}
