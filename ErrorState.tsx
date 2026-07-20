import { RefreshCw, WifiOff } from 'lucide-react';
export function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) { return <div className="state-card error"><WifiOff size={31} /><h2>The archive could not be reached</h2><p>{message}</p><button className="primary-button" onClick={onRetry}><RefreshCw size={16} /> Try again</button></div>; }
