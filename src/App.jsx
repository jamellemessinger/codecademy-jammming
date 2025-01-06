import React, { useEffect, useState } from 'react';
import styles from './css/App.module.css';
import tracks from './assets/data/exampleData';
import { SearchBar, Results, Playlist } from './components';

function App() {
  const [results, setResults] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [id, setId] = useState(0);
  const [uriArr, setUriArr] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState('');

  const spotifyEndpoint = 'https://accounts.spotify.com/authorize';
  const responseType = 'token';
  const clientId = 'd4a8f32db9e84a53b0fb2dae69364cef';
  const redirectUri = 'http://localhost:5173';
  const loginLink = `${spotifyEndpoint}?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectUri}`;

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

  const savePlaylist = (arr) => {
    setUriArr(arr);
  };

  const clearPlaylist = () => {
    setPlaylist([]);
  };

  const getAccessToken = (hash) => {
    const stringAfterHashtag = hash.substring(1);
    const paramsInUrl = stringAfterHashtag.split('&');
    const paramsObj = paramsInUrl.reduce((accumulator, currentValue) => {
      const [key, value] = currentValue.split('=');
      accumulator[key] = value;
      return accumulator;
    }, {})
    return paramsObj;
  };

  useEffect(() => {
    if(window.location.hash) {
      const {access_token, expires_in, token_type} = getAccessToken(window.location.hash);
      setLoggedIn(true);
      setAccessToken(access_token);
      // clear the paramaters from the url
      window.history.replaceState(null, null, window.location.pathname);
    }
  }, [])

  return (
    <>
      <h1>Jammming</h1>
      {loggedIn ? (
        <>
          <SearchBar onSearch={Search} />
          <div>
            <Results results={results} addToPlaylist={addToPlaylist} />
            <Playlist
              playlist={playlist}
              removeFromPlaylist={removeFromPlaylist}
              savePlaylist={savePlaylist}
              clearPlaylist={clearPlaylist}
            />
          </div>
        </>
      ) : (
        <>
          <p>Please log in to Spotify to continue to app</p>
          <a href={loginLink}>Log in with Spotify</a>
        </>
      )}
    </>
  );
}

export default App;
