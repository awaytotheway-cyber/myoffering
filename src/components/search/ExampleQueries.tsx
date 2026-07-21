const examples = ['Teachings on chanting', 'Guidance for family life', 'Letters from Vrindavan'];
export function ExampleQueries({ onChoose }: { onChoose: (query: string) => void }) { return <div className="examples"><span>Try asking</span>{examples.map(example => <button type="button" key={example} onClick={() => onChoose(example)}>{example}</button>)}</div>; }
