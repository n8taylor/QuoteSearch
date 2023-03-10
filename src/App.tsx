import { useState, useEffect } from 'react';
import './App.css'
import { QuoteBlob } from './components/QuoteBlob';

interface Quote {
  _id: string;
  content: string;
  author: string;
}

function App() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [search, setSearch] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [badSearch, setBadSearch] = useState("");

  async function submitSearch() {
    setNoResults(false);

    const results = await fetch(`https://usu-quotes-mimic.vercel.app/api/search?query=${search}`)
      .then(r => r.json())
      .then(json => json.results);

    let quoteList: Quote[] = [];

    for (let i = 0; i < results.length; i++) {
      const q: Quote = results[i];
      quoteList.push(q);
    }

    setQuotes(quoteList);
  }

  async function loadRandomQuote() {
    const result = await fetch("https://usu-quotes-mimic.vercel.app/api/random");

    setQuote(await result.json());
  }

  useEffect(() => {
    loadRandomQuote();
  }, [])

  useEffect(() => {
    if (quotes.length === 0) {
      setNoResults(true);
      setBadSearch(search);
    }
  }, [quotes])

  return (
    <div>
      <div className={searchPerformed ? "top" : "centered"}>
        <h1 className={searchPerformed ? "small-title" : ""}>Quote Search</h1>
        <form onSubmit={(e) => {
          e.preventDefault();
          submitSearch();
          setSearchPerformed(true);
        }}>
          <input 
          type="search" 
          id="fsearch" 
          value={search}
          onChange={e => setSearch(e.target.value)} 
          placeholder="Albert Einstein"/>
        </form>
      </div>
      <br/>
      <div>
        {!searchPerformed && (
          <div id='random-quote'>
            <h3>{quote != null ? quote.content : "Random quotes lead to random wisdom..."}</h3>
            <h3>-{quote != null ? quote.author : "Common Sense"}</h3>
          </div>
        )}
        {searchPerformed && (
          <div>
            {
              quotes.map((q) => (
                <div key={q._id}>
                  <QuoteBlob quote={q.content} author={q.author} />
                </div>
              ))
            }
            {noResults && <p className='error'>No results found for "{badSearch}".</p>}
          </div>
        )}
      </div>
    </div>
  );
}

export default App
