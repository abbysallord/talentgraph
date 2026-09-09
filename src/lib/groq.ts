import { Groq } from 'groq-sdk';

const apiKey = process.env.GROQ_API_KEY || '';

export const groq = new Groq({
  apiKey: apiKey,
});

export const DEFAULT_MODEL = 'openai/gpt-oss-120b';
export const FAST_MODEL = 'qwen/qwen3.8-27b';

export async function askLLMJson<T>(systemPrompt: string, userPrompt: string, fallbackData: T): Promise<T> {
  if (!apiKey) {
    console.warn('GROQ_API_KEY is not set. Falling back to local data.');
    return fallbackData;
  }

  try {
    const response = await groq.chat.completions.create({
      model: DEFAULT_MODEL,
      temperature: 0.1,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: `${systemPrompt}\nIMPORTANT: You must respond in valid JSON format matching the requested schema.` },
        { role: 'user', content: userPrompt },
      ],
    });

    const content = response.choices[0]?.message?.content || '{}';
    return JSON.parse(content) as T;
  } catch (error) {
    console.error('Groq LLM error:', error);
    return fallbackData;
  }
}
