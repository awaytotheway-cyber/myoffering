import { Clipboard, ExternalLink, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import type { SearchResult } from '../../types/search';
import { TestimonialCard } from './TestimonialCard';
const label: Record<string, string> = { book: 'Book', lecture: 'Lecture', letter: 'Letter', conversation: 'Conversation', testimonial: 'Testimonial' };
export function ResultCard({ result, index }: { result: SearchResult; index: number }) {
  const [expanded, setExpanded] = useState(false); const [copied, setCopied] = useState(false);
  const citation = [result.source.title, result.source.reference, result.source.location, result.source.date].filter(Boolean).join(' · ');
  async function copyCitation() { await navigator.clipboard?.writeText(citation); setCopied(true); window.setTimeout(() => setCopied(false), 1800); }
  return <motion.article className="result-card" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .35, delay: index * .05 }}>
    <div className="card-top"><span className={`type-badge ${result.type}`}>{label[result.type]}</span>{typeof result.relevanceScore === 'number' && <span className="score">{Math.round(result.relevanceScore * 100)}% match</span>}</div>
    {result.type === 'testimonial' && <TestimonialCard result={result} />}
    {result.excerpt ? <blockquote className={expanded ? 'expanded' : ''}>{result.excerpt}</blockquote> : <p className="missing-excerpt">An excerpt was not supplied for this record.</p>}
    {result.excerpt.length > 280 && <button className="text-button" onClick={() => setExpanded(!expanded)}>{expanded ? 'Show less' : 'Read more'}</button>}
    {citation && <p className="citation">{result.source.title || 'Archive record'}{result.source.reference && <> <span>·</span> {result.source.reference}</>}{result.source.location && <><span>·</span> <MapPin size={13} /> {result.source.location}</>}{result.source.date && <> <span>·</span> {result.source.date}</>}</p>}
    <div className="card-actions"><button className="text-button" onClick={copyCitation}><Clipboard size={15} /> {copied ? 'Copied' : 'Copy citation'}</button>{result.audioUrl && <audio controls preload="none" src={result.audioUrl} aria-label="Play associated audio"><track kind="captions" /></audio>}{result.sourceLink && <a className="text-button" href={result.sourceLink} target="_blank" rel="noreferrer"><ExternalLink size={15} /> Source</a>}</div>
  </motion.article>;
}
