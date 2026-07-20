import { ExternalLink, MapPin, Volume2, X } from 'lucide-react';
import { useEffect, type ReactNode } from 'react';
import type { SearchResult } from '../../types/search';
import { TestimonialCard } from './TestimonialCard';

export function ResultDetailModal({ result, onClose, footer }: { result: SearchResult; onClose: () => void; footer?: ReactNode }) {
  useEffect(() => { const escape = (event: KeyboardEvent) => event.key === 'Escape' && onClose(); window.addEventListener('keydown', escape); return () => window.removeEventListener('keydown', escape); }, [onClose]);
  return <div className="detail-backdrop" role="presentation" onMouseDown={onClose}><section className="detail-modal" role="dialog" aria-modal="true" aria-label="Archive record detail" onMouseDown={event => event.stopPropagation()}>
    <button className="modal-close icon-button" type="button" aria-label="Close detail" onClick={onClose}><X size={18} /></button>
    <span className={`type-badge ${result.type}`}>{result.type === 'decision' ? 'Key decision' : result.type}</span>
    {result.type === 'testimonial' && <TestimonialCard result={result} />}
    {result.excerpt ? <blockquote className="detail-quote">{result.excerpt}</blockquote> : <p className="missing-excerpt">An excerpt was not supplied for this record.</p>}
    <div className="detail-citation"><strong>{result.source.title || 'Archive record'}</strong>{result.source.reference && <span>{result.source.reference}</span>}{result.source.location && <span><MapPin size={14} /> {result.source.location}</span>}{result.source.date && <span>{result.source.date}</span>}</div>
    <div className="detail-actions">{result.audioUrl && <div className="audio-control"><Volume2 size={16} /><audio controls preload="none" src={result.audioUrl} aria-label="Play associated audio"><track kind="captions" /></audio></div>}{result.sourceLink && <a className="text-button" href={result.sourceLink} target="_blank" rel="noreferrer"><ExternalLink size={15} /> Open source</a>}{footer}</div>
  </section></div>;
}
