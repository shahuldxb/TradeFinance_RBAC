/**
 * Azure OpenAI Client for MLC Trade Finance System
 * Uses Azure OpenAI GPT-4o for intelligent MT message processing
 */

// Azure OpenAI Configuration
const AZURE_OPENAI_ENDPOINT = process.env.AZURE_OPENAI_ENDPOINT;
const AZURE_OPENAI_API_KEY = process.env.AZURE_OPENAI_API_KEY;
const AZURE_OPENAI_DEPLOYMENT = process.env.AZURE_OPENAI_CHAT_DEPLOYMENT;
const AZURE_OPENAI_API_VERSION = process.env.AZURE_OPENAI_API_VERSION;

export interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface AzureOpenAIResponse {
  id: string;
  model: string;
  choices: Array<{
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface InvokeParams {
  messages: Message[];
  maxTokens?: number;
  temperature?: number;
}

/**
 * Invoke Azure OpenAI GPT-4o for chat completions
 */
export async function invokeAzureOpenAI(params: InvokeParams): Promise<AzureOpenAIResponse> {
  const { messages, maxTokens = 4096, temperature = 0.7 } = params;

  // Check if API key is configured
  if (!AZURE_OPENAI_API_KEY) {
    throw new Error("AZURE_OPENAI_API_KEY is not configured. Please set the environment variable.");
  }

  // Remove trailing slash from endpoint if present
  const baseEndpoint = AZURE_OPENAI_ENDPOINT.replace(/\/$/, "");
  const url = `${baseEndpoint}/openai/deployments/${AZURE_OPENAI_DEPLOYMENT}/chat/completions?api-version=${AZURE_OPENAI_API_VERSION}`;

  const payload = {
    messages: messages.map(m => ({
      role: m.role,
      content: m.content,
    })),
    max_tokens: maxTokens,
    temperature: temperature,
  };

  console.log(`[Azure OpenAI] Calling ${AZURE_OPENAI_DEPLOYMENT} at ${AZURE_OPENAI_ENDPOINT}`);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": AZURE_OPENAI_API_KEY,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`[Azure OpenAI] Error: ${response.status} - ${errorText}`);
    throw new Error(`Azure OpenAI API call failed: ${response.status} ${response.statusText} - ${errorText}`);
  }

  const result = await response.json() as AzureOpenAIResponse;
  
  console.log(`[Azure OpenAI] Success - Model: ${result.model}, Tokens: ${result.usage?.total_tokens || 0}`);
  
  return result;
}

/**
 * Get the model name for logging purposes
 */
export function getAzureModelName(): string {
  return `Azure OpenAI ${AZURE_OPENAI_DEPLOYMENT}`;
}
