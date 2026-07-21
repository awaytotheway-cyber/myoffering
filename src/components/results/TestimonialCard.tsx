import { Quote } from 'lucide-react';
import type { SearchResult } from '../../types/search';
export function TestimonialCard({ result }: { result: SearchResult }) { return <div className="testimonial-note"><Quote size={18} /><div><strong>{result.discipleName || 'Disciple testimonial'}</strong>{result.discipleRole && <span>{result.discipleRole}</span>}</div></div>; }
