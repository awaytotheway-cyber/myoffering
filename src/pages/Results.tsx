import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ErrorState } from '../components/results/ErrorState';
import { EmptyState } from '../components/results/EmptyState';
import { LoadingShimmer } from '../components/results/LoadingShimmer';
import { ResultsList } from '../components/results/ResultsList';
import { FiltersPanel } from '../components/search/FiltersPanel';
import { SearchBar } from '../components/search/SearchBar';
import { useSearch } from '../hooks/useSearch';

export function Results() {
  const { query, filters, data, loading, error, setQuery, setFilters, search } = useSearch(); const navigate = useNavigate(); const [params] = useSearchParams();
  const keyword = params.get('keyword');
  useEffect(() => { if (keyword && keyword !== query && !loading) { const nextFilters = { ...filters, keyword }; setQuery(keyword); void search(keyword, nextFilters); } }, [keyword, query, loading, filters, setQuery, search]);
  async function submit() { if (!query.trim()) return; await search(); }
  if (!query && !loading && !data && !error) navigate('/');
  return <main className="results-page shell"><div className="results-heading"><p className="eyebrow">Archive search</p><h1>Search results</h1></div><SearchBar compact query={query} onQueryChange={setQuery} onSubmit={submit} loading={loading} />
    <div className="results-layout"><aside><FiltersPanel sidebar filters={filters} onChange={setFilters} /></aside><section className="results-main" aria-live="polite">
      {loading ? <LoadingShimmer /> : error ? <ErrorState message={error} onRetry={submit} /> : data?.answerSummary && <div className="summary-card"><p className="eyebrow">Archive summary</p><p>{data.answerSummary}</p></div>}
      {!loading && !error && data && (data.results.length ? <ResultsList results={data.results} /> : <EmptyState />)}
    </section></div>
  </main>;
}
