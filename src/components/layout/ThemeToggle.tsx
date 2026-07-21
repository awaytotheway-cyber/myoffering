import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [dark, setDark] = useState(() => localStorage.theme ? localStorage.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches);
  useEffect(() => { document.documentElement.classList.toggle('dark', dark); localStorage.theme = dark ? 'dark' : 'light'; }, [dark]);
  return <button className="icon-button" type="button" aria-label={dark ? 'Use light theme' : 'Use dark theme'} onClick={() => setDark(value => !value)}>{dark ? <Sun size={18} /> : <Moon size={18} />}</button>;
}
