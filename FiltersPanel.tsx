import { CalendarDays, ChevronDown, Filter, MapPin, Tag, X } from 'lucide-react';
import { useState } from 'react';
import type { SearchFilters, SourceType } from '../../types/search';

const sourceTypes: { value: SourceType; label: string }[] = [{ value: 'book', label: 'Books' }, { value: 'lecture', label: 'Lectures' }, { value: 'letter', label: 'Letters' }, { value: 'conversation', label: 'Conversations' }, { value: 'testimonial', label: 'Testimonials' }];
const locations = ['', 'Vrindavan', 'Mayapur', 'Los Angeles', 'London', 'Bombay', 'New York', 'Room Conversation', 'Morning Walk'];

export function FiltersPanel({ filters, onChange, sidebar = false }: { filters: SearchFilters; onChange: (filters: SearchFilters) => void; sidebar?: boolean }) {
  const [open, setOpen] = useState(sidebar);
  const update = (key: keyof SearchFilters, value: string | SourceType[]) => onChange({ ...filters, [key]: value });
  const active = [filters.keyword, filters.location, filters.dateFrom, filters.dateTo, ...filters.sourceTypes].filter(Boolean).length;
  const clear = () => onChange({ keyword: '', location: '', dateFrom: '', dateTo: '', sourceTypes: [] });
  return <section className={`filters ${sidebar ? 'filters-sidebar' : ''}`} aria-label="Search filters">
    <button className="filters-toggle" type="button" onClick={() => setOpen(!open)} aria-expanded={open}><Filter size={17} /> <span>{sidebar ? 'Refine search' : 'Filters'}</span>{active > 0 && <b>{active}</b>}<ChevronDown className={open ? 'rotate' : ''} size={17} /></button>
    {open && <div className="filters-content">
      <label><span><Tag size={14} /> Keyword or topic</span><input value={filters.keyword} onChange={e => update('keyword', e.target.value)} placeholder="e.g. Bhakti" /></label>
      <label><span><MapPin size={14} /> Location</span><select value={filters.location} onChange={e => update('location', e.target.value)}>{locations.map(location => <option key={location} value={location}>{location || 'Any location'}</option>)}</select></label>
      <div className="date-fields"><label><span><CalendarDays size={14} /> From</span><input type="date" min="1966-01-01" max="1977-12-31" value={filters.dateFrom} onChange={e => update('dateFrom', e.target.value)} /></label><label><span>To</span><input type="date" min="1966-01-01" max="1977-12-31" value={filters.dateTo} onChange={e => update('dateTo', e.target.value)} /></label></div>
      <fieldset><legend>Source type</legend><div className="source-chips">{sourceTypes.map(source => <label key={source.value} className={filters.sourceTypes.includes(source.value) ? 'selected' : ''}><input type="checkbox" checked={filters.sourceTypes.includes(source.value)} onChange={() => update('sourceTypes', filters.sourceTypes.includes(source.value) ? filters.sourceTypes.filter(item => item !== source.value) : [...filters.sourceTypes, source.value])} />{source.label}</label>)}</div></fieldset>
      {active > 0 && <button className="clear-button" type="button" onClick={clear}><X size={14} /> Clear filters</button>}
    </div>}
  </section>;
}
