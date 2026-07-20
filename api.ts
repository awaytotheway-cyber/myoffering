import type { SearchFilters, SearchResponse, SearchResult, SourceType } from '../types/search';

const timeoutMs = Number(import.meta.env.VITE_N8N_TIMEOUT_MS) || 20_000;
const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL?.trim();
const apiKey = import.meta.env.VITE_N8N_API_KEY?.trim();

const asText = (value: unknown) => typeof value === 'string' ? value : '';
const asType = (value: unknown): SourceType => ['book', 'lecture', 'letter', 'conversation', 'testimonial'].includes(String(value)) ? value as SourceType : 'book';

function normalizeResult(value: unknown, index: number): SearchResult {
  const item = value && typeof value === 'object' ? value as Record<string, unknown> : {};
  const rawSource = item.source && typeof item.source === 'object' ? item.source as Record<string, unknown> : {};
  return {
    id: asText(item.id) || `result-${index}`,
    type: asType(item.type), excerpt: asText(item.excerpt),
    source: { title: asText(rawSource.title), reference: asText(rawSource.reference), location: asText(rawSource.location), date: asText(rawSource.date) },
    discipleName: asText(item.discipleName) || null, discipleRole: asText(item.discipleRole) || null,
    audioUrl: asText(item.audioUrl) || null, sourceLink: asText(item.sourceLink) || null,
    relevanceScore: typeof item.relevanceScore === 'number' ? item.relevanceScore : undefined,
  };
}

function normalizeResponse(payload: unknown): SearchResponse {
  const root = payload && typeof payload === 'object' ? payload as Record<string, unknown> : {};
  const results = Array.isArray(root.results) ? root.results.map(normalizeResult) : [];
  const answerSummary = asText(root.answerSummary);
  return answerSummary ? { results, answerSummary } : { results };
}

async function makeRequest(query: string, filters: SearchFilters): Promise<SearchResponse> {
  if (!webhookUrl) throw new Error('The archive connection has not been configured yet.');
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(webhookUrl, { method: 'POST', signal: controller.signal, headers: { 'Content-Type': 'application/json', ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}) }, body: JSON.stringify({ query, filters }) });
    if (!response.ok) throw new Error(`The archive could not complete this search (${response.status}).`);
    return normalizeResponse(await response.json());
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') throw new Error('The search took too long. Please try again.');
    throw error;
  } finally { window.clearTimeout(timer); }
}

/** Sends a search to the n8n webhook, retrying one transient network failure. */
export async function searchTeachings(query: string, filters: SearchFilters): Promise<SearchResponse> {
  try { return await makeRequest(query, filters); }
  catch (error) {
    const shouldRetry = error instanceof TypeError;
    if (!shouldRetry) throw error;
    await new Promise(resolve => window.setTimeout(resolve, 450));
    return makeRequest(query, filters);
  }
}
