import { createContext, useContext, useState, type PropsWithChildren } from 'react';
import { searchTeachings } from '../lib/api';
import { defaultFilters, type SearchFilters, type SearchResponse } from '../types/search';

type SearchState = {
  query: string; filters: SearchFilters; data: SearchResponse | null; loading: boolean; error: string | null;
  setQuery: (query: string) => void; setFilters: (filters: SearchFilters) => void;
  search: (query?: string, filters?: SearchFilters) => Promise<void>;
};

const SearchContext = createContext<SearchState | null>(null);

export function SearchProvider({ children }: PropsWithChildren) {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>(defaultFilters);
  const [data, setData] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  async function search(nextQuery = query, nextFilters = filters) {
    const trimmed = nextQuery.trim();
    if (!trimmed || loading) return;
    setQuery(nextQuery); setFilters(nextFilters); setLoading(true); setError(null);
    try { setData(await searchTeachings(trimmed, nextFilters)); }
    catch (reason) { setData(null); setError(reason instanceof Error ? reason.message : 'The archive could not be reached. Please try again.'); }
    finally { setLoading(false); }
  }
  return <SearchContext.Provider value={{ query, filters, data, loading, error, setQuery, setFilters, search }}>{children}</SearchContext.Provider>;
}

export function useSearch() {
  const state = useContext(SearchContext);
  if (!state) throw new Error('useSearch must be used within SearchProvider');
  return state;
}
