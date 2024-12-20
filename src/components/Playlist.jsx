import React, { useState } from 'react';
import Track from './Track';

export default function Playlist({
  savePlaylist,
  playlist,
  removeFromPlaylist,
}) {
  const [playlistName, setPlaylistName] = useState('Playlist 1');
  const inPlaylist = true;

  const handleOnSubmit = (event) => {
    event.preventDefault();
  };

  const handleOnChange = ({ target }) => {
    setPlaylistName(target.value);
  };

  const handleOnClick = () => {
    let uriArr = [];
    playlist.forEach((obj) => uriArr.push(obj.uri));
    savePlaylist(uriArr);
  };

  return (
    <>
      <p>Playlist</p>
      <form onSubmit={handleOnSubmit}>
        <input
          type="text"
          onChange={handleOnChange}
          value={playlistName}
          placeholder="Enter a playlist name"
        />
        {playlist.map((obj, index) => (
          <Track
            id={obj.id}
            key={index}
            songTitle={obj.songTitle}
            artist={obj.artist}
            album={obj.album}
            uri={obj.uri}
            removeFromPlaylist={removeFromPlaylist}
            inPlaylist={inPlaylist}
          />
        ))}
        <button onClick={handleOnClick}>Save To Spotify</button>
      </form>
    </>
  );
}
