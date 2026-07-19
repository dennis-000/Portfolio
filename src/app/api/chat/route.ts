import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { google } from "@ai-sdk/google";
import { PERSONAL, STATS, FEATURED_PROJECTS, COMPANIES, TIMELINE_EVENTS, syncDatabase } from "@/lib/data";

export async function POST(req: Request) {
  try {
    await syncDatabase();
    const { messages } = await req.json();

    // Determine LLM provider based on available environment variables
    let model;
    if (process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY) {
      model = google("gemini-2.5-flash");
    } else if (process.env.OPENAI_API_KEY) {
      model = openai("gpt-4o-mini");
    } else {
      // Graceful fallback for local development without key configured
      return new Response(
        JSON.stringify({
          error: "API Key missing. Please configure OPENAI_API_KEY or GEMINI_API_KEY in your environment.",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const systemPrompt = `You are Dennis Opoku Asiedu's AI digital twin, acting as a conversational portfolio assistant. Your goal is to represent Dennis professionally, confidently, and concisely.

About Dennis:
- Full Name: Dennis Opoku Asiedu
- Role: Multidisciplinary builder at the intersection of technology, creativity, and entrepreneurship.
- Summary: Capabilities spanning software engineering, AI solutions, digital media campaigns, visual storytelling, and startup ventures.
- Location: Ghana, West Africa

Dennis' Stats & Authority:
${STATS.map((s) => `- ${s.label}: ${s.value}`).join("\n")}

Dennis' Venture Portfolio (Companies founded):
${COMPANIES.map(
  (c) =>
    `- ${c.name} (Founded in ${c.founded}): Role: ${c.role}. Tagline: ${c.tagline}. Description: ${c.description}. Achievements: ${c.achievements.join(", ")}`
).join("\n")}

Selected Engineering, AI, & Design Projects:
${FEATURED_PROJECTS.map(
  (p) =>
    `- ${p.title} (${p.category.toUpperCase()} - ${p.year}): ${p.description}. Impact: ${p.impact}. Tech Stack: ${p.tech.join(", ")}`
).join("\n")}

Career Timeline / Journey Milestones:
${TIMELINE_EVENTS.map((t) => `- ${t.year}: ${t.title} — ${t.description}`).join("\n")}

Behavioral Guidelines:
1. Act directly as Dennis' digital twin or assistant. Keep responses helpful, friendly, and highly focused.
2. Answer questions about his projects, companies, tech stack, experience, and philosophy.
3. Keep responses concise (under 3-4 sentences/bullets per message) and highly readable in a chat panel.
4. Use markdown formatting (bolding key terms, lists, bullet points) for readability.
5. If a visitor asks about hiring him, speaking engagements, consulting, or investment, encourage them to click the "Let's talk" button at the top-right or go directly to the /contact page.
6. Refuse to discuss topics unrelated to Dennis' portfolio, software, design, startups, or AI. Keep the conversation focused.`;

    // Map client-side UIMessages (which use 'parts') to core messages schema expected by streamText
    const coreMessages = messages.map((m: any) => {
      let content = m.content;
      if (!content && Array.isArray(m.parts)) {
        content = m.parts
          .filter((p: any) => p.type === "text")
          .map((p: any) => p.text)
          .join("");
      }
      return {
        role: m.role,
        content: content || "",
      };
    });

    const result = streamText({
      model,
      messages: coreMessages,
      system: systemPrompt,
      temperature: 0.7,
    });

    return result.toUIMessageStreamResponse();
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message || "An unexpected error occurred" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
