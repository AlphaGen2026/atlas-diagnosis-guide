import { createServerFn } from "@tanstack/react-start";
import { createOpenAI } from "@ai-sdk/openai";
import { streamText, Output } from "ai";
import { z } from "zod";

import { books, categoryLabels } from "@/data/books";

const InputSchema = z.object({
  symptoms: z.string().min(5).max(4000),
  age: z.string().max(10).nullable(),
  gender: z.string().max(30).nullable(),
  duration: z.string().max(120).nullable(),
  history: z.string().max(1000).nullable(),
});

const ResultSchema = z.object({
  summary: z.string(),
  urgency: z.enum(["past", "ortacha", "yuqori", "shoshilinch"]),
  urgencyReason: z.string(),
  conditions: z.array(
    z.object({
      name: z.string(),
      likelihood: z.number(),
      reasoning: z.string(),
      source: z.string(),
    }),
  ),
  redFlags: z.array(z.string()),
  tests: z.array(z.string()),
  advice: z.array(z.string()),
  specialist: z.string(),
});

export type DiagnosisResult = z.infer<typeof ResultSchema>;

const bookList = books
  .map((b) => `- "${b.title}" — ${b.author} [${categoryLabels[b.category]}]`)
  .join("\n");

const systemPrompt = `Sen "MediAI" tibbiy yordamchi tizimisan. Faqat o'zbek tilida (lotin yozuvida) javob berasan.

Fikrlashingni FAQAT quyidagi klassik tibbiy manbalar mazmuniga tayanib qurasan:
${bookList}

Qoidalar:
1. Har bir taxminiy holat uchun "source" maydonida shu ro'yxatdagi kitob nomini va qaysi mavzu bo'limi asos bo'lganini yoz (masalan: Harrison's Principles of Internal Medicine — ichki kasalliklar differensial tashxisi).
2. "likelihood" — 0 dan 100 gacha butun son (ehtimollik foizi).
3. 2 dan 5 tagacha taxminiy holat ber, eng ehtimollisi birinchi bo'lsin.
4. "redFlags" — darhol shoshilinch yordamga murojaat qilish kerak bo'lgan xavfli belgilar.
5. "tests" — tavsiya etiladigan tekshiruvlar. "advice" — uy sharoitidagi ehtiyot choralari.
6. Dori nomlari va dozalarini yozma. Faqat shifokor tayinlashi kerakligini eslat.
7. Bu yakuniy tashxis emas, faqat ma'lumot uchun tahlil — buni "summary" oxirida qisqa eslatib o't.`;

export const diagnose = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => InputSchema.parse(data))
  .handler(async ({ data }): Promise<DiagnosisResult> => {
    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) throw new Error("AI xizmati sozlanmagan");

    const lovable = createOpenAI({
      baseURL: "https://ai.gateway.lovable.dev/v1",
      apiKey,
      headers: {
        "Lovable-API-Key": apiKey,
        "X-Lovable-AIG-SDK": "vercel-ai-sdk",
      },
    });

    const prompt = [
      `Shikoyatlar: ${data.symptoms}`,
      data.age ? `Yosh: ${data.age}` : null,
      data.gender ? `Jinsi: ${data.gender}` : null,
      data.duration ? `Davomiyligi: ${data.duration}` : null,
      data.history ? `Qo'shimcha (kasalliklar, dorilar): ${data.history}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    const result = streamText({
      model: lovable.responses("openai/gpt-6-astra"),
      system: systemPrompt,
      prompt,
      output: Output.object({ schema: ResultSchema }),
      providerOptions: {
        openai: {
          forceReasoning: true,
          reasoningEffort: "low",
          reasoningSummary: "auto",
          store: false,
          include: ["reasoning.encrypted_content"],
        },
      },
    });

    return await result.output;
  });
