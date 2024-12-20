import React, { useState } from 'react';
import Track from './Track';

export default function Playlist({ SavePlaylist, playlist }) {
  const [playlistName, setPlaylistName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefualt();
  };

  const handleOnChange = ({ target }) => {
    setPlaylistName(target.value);
  };

  const handleOnClick = () => {};

  return (
    <>
      <p>Playlist</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={handleOnChange}
          value={playlistName}
          placeholder="Playlist Name"
          required
        />
        {playlist.map((obj, index) => (
                    <Track
                      key={index}
                      songTitle={obj.songTitle}
                      artist={obj.artist}
                      album={obj.album}
                    />
                  ))}
        <button onClick={handleOnClick}>Save To Spotify</button>
      </form>
    </>
  );
}
