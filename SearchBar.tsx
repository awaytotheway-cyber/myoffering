import { Search } from 'lucide-react';
import type { FormEvent } from 'react';

export function SearchBar({ query, onQueryChange, onSubmit, loading, compact = false }: { query: string; onQueryChange: (value: string) => void; onSubmit: () => void; loading: boolean; compact?: boolean }) {
  function submit(event: FormEvent) { event.preventDefault(); onSubmit(); }
  return <form className={`search-bar ${compact ? 'compact' : ''}`} onSubmit={submit}><Search size={20} aria-hidden="true" /><input value={query} onChange={event => onQueryChange(event.target.value)} placeholder="Ask about a teaching, verse, or moment from Srila Prabhupāda's life…" aria-label="Search the archive" /><button className="primary-button" type="submit" disabled={loading || !query.trim()}>{loading ? 'Searching…' : 'Search'}</button></form>;
}
