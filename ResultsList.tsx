import type { SearchResult } from '../../types/search';
import { ResultCard } from './ResultCard';
export function ResultsList({ results }: { results: SearchResult[] }) { return <div className="results-list">{results.map((result, index) => <ResultCard key={result.id} result={result} index={index} />)}</div>; }
