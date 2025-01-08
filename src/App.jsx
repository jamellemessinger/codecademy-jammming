import React, { useEffect, useState } from 'react';
import styles from './css/App.module.css';
import { SearchBar, Results, Playlist } from './components';

function App() {
  const [results, setResults] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [id, setId] = useState(0);
  const [playlistName, setPlaylistName] = useState('');
  // const [uriArr, setUriArr] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState('');

  const spotifyAuthEndpoint = 'https://accounts.spotify.com/authorize';
  const responseType = 'token';
  const clientId = 'd4a8f32db9e84a53b0fb2dae69364cef';
  const redirectUri = 'http://localhost:5173';
  const scope = 'playlist-modify-public';
  const loginLink = `${spotifyAuthEndpoint}?response_type=${responseType}&client_id=${clientId}&scope=${scope}&redirect_uri=${redirectUri}&show_dialog=true`;

  const search = async (searchValue) => {
    // get search response from spotify api
    const spotifySearchEndpoint = 'https://api.spotify.com/v1/search?q=';
    searchValue = searchValue.toLowerCase();
    const seachValueSplit = searchValue.split(' ');
    searchValue = seachValueSplit.join('+');
    const type = '&type=track';
    const searchRequestUrl = spotifySearchEndpoint + searchValue + type;

    // use try...catch for error handling
    try {
      // async code to fetch the search result data from spotify
      const searchResultDataJson = await fetch(searchRequestUrl, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      // convert response to json
      const searchResultDataObj = await searchResultDataJson.json();
      // store only the needed data in the response object into 'items'
      const items = await searchResultDataObj.tracks.items;

      // filter response obj with only data that we want to use
      // create an empty array to store the data we want to filter from the items array
      let filteredResponse = [];
      for (const track of items) {
        // push an object literal of only the data we want to the filteredResponse array
        filteredResponse.push({
          songTitle: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri,
        });
      }
      // set the results variable to be equal to the filtered response
      setResults(filteredResponse);
    } catch (error) {
      console.error('An error occured while using the search API', error);
    }
  };

  // use this function to update the id attribute in order to be able to remove individual tracks from the playlist. This allows us to remove one instance at a time if multiple instances persist at the same time in the playlist.
  const addToPlaylist = (obj) => {
    // increments the Id variable
    setId(id + 1);
    // adds the object to the playlist array while adding a new key to the object called id
    setPlaylist((prev) => [...prev, { ...obj, id: id }]);
  };

  // filters the playlist array
  const removeFromPlaylist = (obj) => {
    setPlaylist((prev) => prev.filter((item) => item.id !== obj.id));
  };

  // a separate function that clears the name of the playlist. Can be used in a separate function later if desired
  const clearPlaylistName = () => {
    setPlaylistName('');
  };

  // a separate function to clear the songs in the playlist. Can be used in a separate function later if desired
  const clearPlaylist = () => {
    setPlaylist([]);
  };

  const savePlaylist = async (uriArr) => {
    // setUriArr(arr);
    let userId;
    let playlistId;
    // get user profile data
    try {
      const userProfileDataResponse = await fetch(
        'https://api.spotify.com/v1/me',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const userProfileDataResponseObj = await userProfileDataResponse.json();
      userId = await userProfileDataResponseObj.id;
    } catch (error) {
      console.error('An error occured trying to get the User ID', error);
    }

    // create a new playlist
    try {
      const createPlaylistResponse = await fetch(
        `https://api.spotify.com/v1/users/${userId}/playlists`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: playlistName,
          }),
        }
      );
      const createPlaylistResponseObj = await createPlaylistResponse.json();
      playlistId = await createPlaylistResponseObj.id;
    } catch (error) {
      console.error('An error occured creating the playlist', error);
    }

    // modify playlist
    try {
      const modifyPlaylistResponse = await fetch(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            uris: uriArr,
          }),
        }
      );
      const modifyPlaylistResponseObj = await modifyPlaylistResponse.json()
      const snapshotId = await modifyPlaylistResponseObj.snapshot_id;
      if (snapshotId) {
        alert(`Playlist ${playlistName} has been saved to Spotify!`);
        clearPlaylist();
        clearPlaylistName();
      } else {
        alert('Error: could not add songs to your playlist');
      }
    } catch (error) {
      console.error('An error occured creating the playlist', error);
    }
  };

  // gets the access token from the url of the page after the user authenticates with spotify and gets redirected back to the application
  const getAccessToken = (hash) => {
    // substring(1) returns the string from the given index to the end of the string
    const stringAfterHashtag = hash.substring(1);
    // split the string on every &
    const paramsInUrl = stringAfterHashtag.split('&');
    // returns an object with key value pairs formatted from the params in url arr
    const paramsObj = paramsInUrl.reduce((accumulator, currentValue) => {
      const [key, value] = currentValue.split('=');
      accumulator[key] = value;
      return accumulator;
    }, {});
    return paramsObj;
  };

  // utilize useEffect so that the function will check the window location whenever the page updates i.e. after the user authenticates
  useEffect(() => {
    if (window.location.hash) {
      // use object destructuring for cleaner code
      const { access_token, expires_in, token_type } = getAccessToken(
        window.location.hash
      );
      // toggles the boolean so that the main app can be displayed
      setLoggedIn(true);
      // saves the access token to the accessToken variable
      setAccessToken(access_token);
      // clear the paramaters from the url
      window.history.replaceState(null, null, window.location.pathname);
    }
  }, []);

  return (
    <>
      <h1>Jammming</h1>
      {loggedIn ? (
        <>
          <SearchBar search={search} />
          <div>
            <Results results={results} addToPlaylist={addToPlaylist} />
            <Playlist
              playlist={playlist}
              removeFromPlaylist={removeFromPlaylist}
              savePlaylist={savePlaylist}
              playlistName={playlistName}
              setPlaylistName={setPlaylistName}
            />
          </div>
        </>
      ) : (
        <>
          <p>Please login to continue</p>
          <a href={loginLink}>Login with Spotify</a>
        </>
      )}
    </>
  );
}

export default App;
