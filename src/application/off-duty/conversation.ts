export type ChatMessage = { role: 'user' | 'assistant'; content: string };

export type ChatGateway = (persona: string, history: ChatMessage[], message: string) => Promise<string>;
export type Conversation = { send(message: string): Promise<string> };

export function createConversation(gateway: ChatGateway, persona: string): Conversation {
  const history: ChatMessage[] = [];

  return {
    async send(message) {
      const response = await gateway(persona, history, message);
      history.push({ role: 'user', content: message }, { role: 'assistant', content: response });
      return response;
    },
  };
}
