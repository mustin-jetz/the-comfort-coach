export type GenerateTextRequest = {
  system: string;
  input: string;
  temperature?: number;
};

export type AiClient = {
  generateText: (request: GenerateTextRequest) => Promise<string>;
};

/**
 * AWS-ready client.
 * Expected backend contract (API Gateway → Lambda → Bedrock/etc.):
 * POST {VITE_AI_API_URL}
 * body: { system, input, temperature? }
 * response: { text: string } | { output: string } | { choices: [{ output: string }] }
 */
function createAwsAiClient(baseUrl: string, apiKey?: string): AiClient {
  return {
    async generateText({ system, input, temperature = 0.9 }) {
      const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
        },
        body: JSON.stringify({ system, input, temperature }),
      });

      if (!response.ok) {
        throw new Error(`AI API error ${response.status}`);
      }

      const data = (await response.json()) as {
        text?: string;
        output?: string;
        choices?: Array<{ output?: string; text?: string }>;
      };

      return (
        data.text ||
        data.output ||
        data.choices?.[0]?.output ||
        data.choices?.[0]?.text ||
        ''
      );
    },
  };
}

/** Local/dev fallback when no AWS endpoint is configured. */
function createMockAiClient(): AiClient {
  return {
    async generateText({ input }) {
      const associateLine =
        /The associate just said: "([^"]*)"/.exec(input)?.[1]?.trim() || '';
      if (!associateLine) {
        return "Hi there — just looking around for now.";
      }
      if (/welcome|hi |hello|how are you|weather/i.test(associateLine)) {
        return "Hey, thanks. Pretty nice out today. We're mostly just getting ideas.";
      }
      if (/room|project|looking for|sofa|recliner|couch/i.test(associateLine)) {
        return "Probably the living room. Our old sofa's seen better days.";
      }
      if (/budget|price|cost|spend/i.test(associateLine)) {
        return "I'd rather not get too hung up on numbers yet — I just want it to feel right.";
      }
      if (/protect|warranty|delivery/i.test(associateLine)) {
        return "Yeah, that stuff matters. I don't want surprises later.";
      }
      return "Okay… yeah. Tell me a little more about that?";
    },
  };
}

const apiUrl = (import.meta.env.VITE_AI_API_URL as string | undefined)?.trim();
const apiKey = (import.meta.env.VITE_AI_API_KEY as string | undefined)?.trim();

export const aiClient: AiClient = apiUrl
  ? createAwsAiClient(apiUrl, apiKey)
  : createMockAiClient();

export const aiProviderLabel = apiUrl ? 'AWS API' : 'Local mock';
