import React, { useState } from 'react';
import styles from './css/App.module.css';
import tracks from './assets/data/exampleData';
import { SearchBar, Results, Playlist } from './components';

function App() {
  const [results, setResults] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [id, setId] = useState(0);

  const Search = (searchValue) => {
    const filteredResults = [];
    for (let obj of tracks) {
      for (let key in obj) {
        if (
          obj[key].toLowerCase().includes(searchValue.toLowerCase()) &&
          searchValue
        ) {
          if (filteredResults.includes(obj)) {
            continue;
          } else {
            filteredResults.push(obj);
          }
        }
      }
    }

    setResults(filteredResults);
  };

  const addToPlaylist = (obj) => {
    setId(id + 1);
    setPlaylist((prev) => [...prev, { ...obj, id: id }]);
  };

  const removeFromPlaylist = (obj) => {
    setPlaylist((prev) => prev.filter((item) => item.id !== obj.id));
  };

  return (
    <>
      <h1>Jammming</h1>
      <SearchBar onSearch={Search} />
      <div>
        <Results results={results} addToPlaylist={addToPlaylist} />
        <Playlist playlist={playlist} removeFromPlaylist={removeFromPlaylist} />
      </div>
    </>
  );
}

export default App;
