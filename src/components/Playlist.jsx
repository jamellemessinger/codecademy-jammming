import React, { useState } from 'react';
import Track from './Track';

export default function Playlist({
  savePlaylist,
  playlist,
  removeFromPlaylist,
}) {
  const [playlistName, setPlaylistName] = useState('');
  const inPlaylist = true;

  const handleSubmit = (event) => {
    event.preventDefault();
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
        />
        {playlist.map((obj, index) => (
          <Track
            id={obj.id}
            key={index}
            songTitle={obj.songTitle}
            artist={obj.artist}
            album={obj.album}
            removeFromPlaylist={removeFromPlaylist}
            inPlaylist={inPlaylist}
          />
        ))}
        <button onClick={handleOnClick}>Save To Spotify</button>
      </form>
    </>
  );
}
