import React from 'react';
import styles from './css/App.module.css';
import {
  SearchBar,
  Results,
  Track,
  Playlist,
} from './components';

function App() {
  const SearchSong = (song) => {
    alert(`received ${song} from SearchBar component`);
  };
  return (
    <>
      <h1>Jammming</h1>
      <SearchBar onSearchSong={SearchSong} />
      <div>
        <Results />
        <Playlist />
      </div>
    </>
  );
}

export default App;
