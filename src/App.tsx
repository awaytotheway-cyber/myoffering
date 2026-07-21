import { Routes, Route } from 'react-router-dom';
import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import { SearchProvider } from './hooks/useSearch';
import { About } from './pages/About';
import { Home } from './pages/Home';
import { Results } from './pages/Results';
import { Timeline } from './pages/Timeline';
export default function App() { return <SearchProvider><div className="app-shell"><Header /><Routes><Route path="/" element={<Home />} /><Route path="/results" element={<Results />} /><Route path="/timeline" element={<Timeline />} /><Route path="/about" element={<About />} /></Routes><Footer /></div></SearchProvider>; }
