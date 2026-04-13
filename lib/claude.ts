import Anthropic from "@anthropic-ai/sdk";

/**
 * Wrapper minimaliste autour du SDK Anthropic. Instancie un client
 * paresseusement (une seule fois par process) et expose `askClaude`
 * pour envoyer un prompt system + user et récupérer le texte.
 *
 * Le SDK est mis à disposition côté serveur uniquement. Les routes
 * API Next.js (app/api/.../route.ts) sont les seules à devoir
 * l'importer. Ne jamais l'utiliser depuis un composant client.
 */

let client: Anthropic | null = null;

function getClient(): Anthropic {
  if (client) return client;
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY manquante.");
  }
  client = new Anthropic({ apiKey });
  return client;
}

export interface AskClaudeParams {
  model: string;
  system: string;
  userMessage: string;
  maxTokens?: number;
  temperature?: number;
}

export interface AskClaudeResult {
  text: string;
  stopReason: string | null;
  usage: {
    inputTokens: number;
    outputTokens: number;
  };
}

/**
 * Envoie un prompt non-streamé à Claude et retourne le premier bloc
 * texte concaténé. Lève si la clé API est manquante ou si la réponse
 * ne contient aucun bloc texte exploitable.
 */
export async function askClaude(
  params: AskClaudeParams,
): Promise<AskClaudeResult> {
  const {
    model,
    system,
    userMessage,
    maxTokens = 2000,
    temperature = 0.7,
  } = params;

  const response = await getClient().messages.create({
    model,
    max_tokens: maxTokens,
    temperature,
    system,
    messages: [{ role: "user", content: userMessage }],
  });

  const text = response.content
    .filter((block): block is Extract<typeof block, { type: "text" }> =>
      block.type === "text",
    )
    .map((block) => block.text)
    .join("")
    .trim();

  if (!text) {
    throw new Error("Réponse Claude vide : aucun bloc texte exploitable.");
  }

  return {
    text,
    stopReason: response.stop_reason ?? null,
    usage: {
      inputTokens: response.usage.input_tokens,
      outputTokens: response.usage.output_tokens,
    },
  };
}

/**
 * Tente de parser un JSON strict éventuellement entouré d'un
 * préambule ou de balises markdown. Claude est instruit de renvoyer
 * du JSON pur, mais on reste défensif contre les backticks/fences.
 */
export function extractJsonObject<T = unknown>(raw: string): T {
  const trimmed = raw.trim();

  // Cas nominal : tout le texte est déjà un JSON.
  if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
    return JSON.parse(trimmed) as T;
  }

  // Fallback : extraire entre la première accolade ouvrante et la
  // dernière fermante. Utile si le modèle ajoute du texte autour
  // malgré les instructions.
  const firstBrace = trimmed.indexOf("{");
  const lastBrace = trimmed.lastIndexOf("}");
  if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
    throw new Error("Aucun objet JSON détectable dans la réponse Claude.");
  }

  const candidate = trimmed.slice(firstBrace, lastBrace + 1);
  return JSON.parse(candidate) as T;
}
