import type { ChatGateway } from '../../application/off-duty/conversation';

const ENDPOINT = 'https://openrouter.ai/api/v1/chat/completions';

export const askAI: ChatGateway = async (persona, history, message) => {
  const key = import.meta.env.PUBLIC_OPENROUTER_KEY ?? '';
  if (!key) throw new Error('no-key');

  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`,
      'HTTP-Referer': window.location.origin,
    },
    body: JSON.stringify({
      model: 'google/gemini-2.0-flash-001',
      messages: [
        { role: 'system', content: persona },
        ...history,
        { role: 'user', content: message },
      ],
    }),
  });

  if (!response.ok) throw new Error(`OpenRouter ${response.status}`);
  const data = await response.json();
  return data?.choices?.[0]?.message?.content ?? 'Hmm, I got nothing. Try again?';
};
