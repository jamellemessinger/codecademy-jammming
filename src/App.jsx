import React from 'react';
import styles from './css/App.module.css';
import { SearchBar, SearchResults, TrackList, Track, Playlist } from './components';

function App() {
  return (
    <>
      <h1>Jammming</h1>
      <SearchBar />
      <div>
        <SearchResults />
        <TrackList />
      </div>
    </>
  );
}

export default App;
