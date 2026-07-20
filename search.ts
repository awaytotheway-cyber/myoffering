export type SourceType = 'book' | 'lecture' | 'letter' | 'conversation' | 'testimonial' | 'decision';

export interface SearchFilters {
  keyword: string;
  location: string;
  dateFrom: string;
  dateTo: string;
  sourceTypes: SourceType[];
}

export interface SearchResult {
  id: string;
  type: SourceType;
  excerpt: string;
  source: { title?: string; reference?: string; location?: string; date?: string };
  discipleName?: string | null;
  discipleRole?: string | null;
  audioUrl?: string | null;
  sourceLink?: string | null;
  relevanceScore?: number;
}

export interface SearchResponse { results: SearchResult[]; answerSummary?: string }

export const defaultFilters: SearchFilters = { keyword: '', location: '', dateFrom: '', dateTo: '', sourceTypes: [] };
