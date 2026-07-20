import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ExampleQueries } from '../components/search/ExampleQueries';
import { FiltersPanel } from '../components/search/FiltersPanel';
import { SearchBar } from '../components/search/SearchBar';
import { useSearch } from '../hooks/useSearch';

export function Home() {
  const { query, filters, loading, setQuery, setFilters, search } = useSearch(); const navigate = useNavigate();
  async function submit() { if (!query.trim()) return; navigate('/results'); await search(); }
  async function choose(example: string) { setQuery(example); navigate('/results'); await search(example, filters); }
  return <main className="home"><div className="hero-pattern" /><motion.section className="hero shell" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .45 }}>
    <p className="eyebrow">An archive of teachings and memories</p><h1>Prabhupāda Vāṇī</h1><p className="tagline">Search the teachings of Srila Prabhupāda — his words, his books, and his disciples’ memories.</p>
    <div className="search-area"><SearchBar query={query} onQueryChange={setQuery} onSubmit={submit} loading={loading} /><FiltersPanel filters={filters} onChange={setFilters} /><ExampleQueries onChoose={choose} /></div>
  </motion.section></main>;
}
