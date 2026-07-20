import { Flower2, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
  const [open, setOpen] = useState(false);
  return <header className="site-header"><nav className="nav shell" aria-label="Primary navigation">
    <NavLink className="brand" to="/" onClick={() => setOpen(false)}><Flower2 size={22} aria-hidden="true" /><span>Prabhupāda Vāṇī</span></NavLink>
    <button className="menu-button" aria-label="Toggle menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    <div className={`nav-links ${open ? 'open' : ''}`}><NavLink to="/" onClick={() => setOpen(false)}>Search</NavLink><NavLink to="/timeline" onClick={() => setOpen(false)}>Timeline</NavLink><NavLink to="/about" onClick={() => setOpen(false)}>About</NavLink><ThemeToggle /></div>
  </nav></header>;
}
