import React, { useState } from 'react';
import YouTubePlayer from '../components/YouTubePlayer';

function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [playing, setPlaying] = useState(null);

  async function handleSearch() {
    const res = await fetch(`/api/media/search/youtube?q=${encodeURIComponent(query)}`);
    setResults(await res.json());
  }

  return (
    <section>
      <h2>Search Videos & Music</h2>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
      <div>
        {results.map(item => (
          <div key={item.id}>
            <img src={item.thumbnail} alt={item.title} />
            <span>{item.title}</span>
            <button onClick={() => setPlaying(item.id)}>Stream</button>
            <a href={`/api/media/download/youtube/${item.id}/audio`} target="_blank" rel="noopener noreferrer">
              <button>Download MP3</button>
            </a>
            {playing === item.id && <YouTubePlayer videoId={item.id} />}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Search;