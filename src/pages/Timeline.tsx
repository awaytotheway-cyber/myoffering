import { AnimatePresence, motion } from 'framer-motion';
import { BookOpen, Compass, Landmark, Mail, MessageCircle, Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ResultDetailModal } from '../components/results/ResultDetailModal';
import { searchTeachings } from '../lib/api';
import { defaultFilters, type SearchResult, type SourceType } from '../types/search';

const years = Array.from({ length: 11 }, (_, index) => 1967 + index);
const iconFor: Record<SourceType, typeof BookOpen> = { book: BookOpen, lecture: BookOpen, letter: Mail, conversation: MessageCircle, testimonial: MessageCircle, decision: Landmark };
const labelFor: Record<SourceType, string> = { book: 'Book', lecture: 'Lecture', letter: 'Letter', conversation: 'Talk / conversation', testimonial: 'Testimonial', decision: 'Key decision' };

function titleFor(entry: SearchResult) { return entry.source.title || entry.source.reference || 'Archive record'; }

export function Timeline() {
  const [year, setYear] = useState<number | null>(1972); const [records, setRecords] = useState<Record<number, SearchResult[]>>({});
  const [loading, setLoading] = useState(false); const [error, setError] = useState<string | null>(null); const [detail, setDetail] = useState<SearchResult | null>(null);
  useEffect(() => { if (!year || records[year]) return; let current = true; setLoading(true); setError(null);
    searchTeachings(`Archive records from ${year}`, { ...defaultFilters, dateFrom: `${year}-01-01`, dateTo: `${year}-12-31` })
      .then(response => { if (current) setRecords(old => ({ ...old, [year]: response.results })); })
      .catch(reason => { if (current) setError(reason instanceof Error ? reason.message : 'The archive could not be reached.'); })
      .finally(() => { if (current) setLoading(false); });
    return () => { current = false; };
  }, [year, records]);
  const selectYear = (next: number) => { setDetail(null); setError(null); setYear(old => old === next ? null : next); };
  const currentRecords = year ? records[year] : [];
  return <main className="timeline-page shell"><section className="timeline-intro"><p className="eyebrow">1967–1977</p><h1>A life in the archive</h1><p>Choose a year to explore the records returned by the archive. Each entry remains linked to its original citation and context.</p></section>
    <div className="timeline-rail" role="tablist" aria-label="Timeline years">{years.map(item => <button key={item} role="tab" aria-selected={year === item} className={`year-node ${year === item ? 'active' : ''}`} onClick={() => selectYear(item)}><span className="node-dot" /><span>{item}</span></button>)}</div>
    <AnimatePresence initial={false} mode="wait">{year && <motion.section key={year} className="year-panel" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: .35, ease: 'easeOut' }} layout>
      <div className="year-panel-heading"><div><p className="eyebrow">Selected year</p><h2>{year}</h2><p>Archive records dated {year}.</p></div><button className="text-button" type="button" onClick={() => setYear(null)}><X size={15} /> Close year</button></div>
      {loading && <div className="timeline-loading" role="status">Gathering records for {year}…</div>}
      {!loading && error && <div className="timeline-message"><p>{error}</p><button className="text-button" type="button" onClick={() => setRecords(old => { const next = { ...old }; delete next[year]; return next; })}>Try again</button></div>}
      {!loading && !error && currentRecords.length === 0 && <div className="timeline-message"><Compass size={21} /><p>No timeline records were returned for this year yet.</p></div>}
      {!loading && !error && currentRecords.length > 0 && <div className="timeline-records">{currentRecords.map((record, index) => { const Icon = iconFor[record.type]; return <motion.button key={record.id} className="timeline-record" type="button" onClick={() => setDetail(record)} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .3, delay: index * .06 }}><Icon size={19} /><div><span className={`type-badge ${record.type}`}>{labelFor[record.type]}</span><h3>{titleFor(record)}</h3><p>{record.source.location || record.source.date || 'Archive record'}{record.excerpt && <> · {record.excerpt}</>}</p></div></motion.button>; })}</div>}
    </motion.section>}</AnimatePresence>
    {detail && <ResultDetailModal result={detail} onClose={() => setDetail(null)} footer={<Link className="text-button" to={`/results?keyword=${encodeURIComponent(detail.source.title || String(year))}`}><Search size={15} /> Search more like this</Link>} />}
  </main>;
}
