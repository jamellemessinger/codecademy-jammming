import React, { useState } from 'react';
import styles from './css/App.module.css';
import tracks from './assets/data/exampleData';
import { SearchBar, Results, Playlist } from './components';

function App() {
  const [results, setResults] = useState([]);
  const [playlist, setPlaylist] = useState([])

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

  const createPlaylist = (obj) => {
    setPlaylist((prev) => [...prev, obj])
  };

  console.log(playlist)

  return (
    <>
      <h1>Jammming</h1>
      <SearchBar onSearch={Search} />
      <div>
        <Results results={results} createPlaylist={createPlaylist}/>
        <Playlist playlist={playlist} />
      </div>
    </>
  );
}

export default App;
