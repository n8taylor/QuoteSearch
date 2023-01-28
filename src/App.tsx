import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg'
import './App.css'

interface Quote {
  _id: string;
  content: string;
  author: string;
}

function App() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [search, setSearch] = useState("");

  const checkEnter = (e: KeyboardEvent) => {
    // console.log(e.key);
    if (e.key === "Enter") submitSearch(search);
  }

  async function submitSearch(search: string) {
    const result = await fetch(`https://usu-quotes-mimic.vercel.app/api/search?query=${search}`);
    setQuotes(await result.json());
    console.log(result.json());
  }

  async function loadRandomQuote() {
    const result = await fetch("https://usu-quotes-mimic.vercel.app/api/random");
    // setQuote((await result.json()).results);
    setQuote(await result.json());
  }

  useEffect(() => {
    loadRandomQuote();
    document.addEventListener('keypress', checkEnter, true);
  }, [])

  if (quote != null) return (
    <div>
      <h1>Quote Search</h1>
      <input type="search" placeholder="Albert Einstein"></input>
      <p>{ quote != null ? quote.content : "Random quotes lead to random wisdom..." }</p>
      <p>-{ quote != null ? quote.author : "Common Sense" }</p>
    </div>
  )
  return (
    <div></div>
  )


  // const [count, setCount] = useState(0)

  // return (
  //   <div className="App">
  //     <div>
  //       <a href="https://vitejs.dev" target="_blank">
  //         <img src="/vite.svg" className="logo" alt="Vite logo" />
  //       </a>
  //       <a href="https://reactjs.org" target="_blank">
  //         <img src={reactLogo} className="logo react" alt="React logo" />
  //       </a>
  //     </div>
  //     <h1>Vite + React</h1>
  //     <div className="card">
  //       <button onClick={() => setCount((count) => count + 1)}>
  //         count is {count}
  //       </button>
  //       <p>
  //         Edit <code>src/App.tsx</code> and save to test HMR
  //       </p>
  //     </div>
  //     <p className="read-the-docs">
  //       Click on the Vite and React logos to learn more
  //     </p>
  //   </div>
  // )
}

export default App
