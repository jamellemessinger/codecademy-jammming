import React, { useState } from 'react';
import styles from './css/App.module.css';
import tracks from './assets/data/exampleData';
import { SearchBar, Results, Playlist } from './components';

function App() {
  const [results, setResults] = useState([]);

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
  return (
    <>
      <h1>Jammming</h1>
      <SearchBar onSearch={Search} />
      <div>
        <Results results={results} />
        <Playlist />
      </div>
    </>
  );
}

export default App;
