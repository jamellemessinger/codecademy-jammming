import React, { useState } from 'react';
import Track from './Track';

export default function Playlist({
  savePlaylist,
  playlist,
  removeFromPlaylist,
  playlistName,
  setPlaylistName,
}) {
  const inPlaylist = true;

  const handleOnSubmit = (event) => {
    event.preventDefault();
    let uriArr = [];
    playlist.forEach((obj) => uriArr.push(obj.uri));
    savePlaylist(uriArr);
  };

  const handleOnChange = ({ target }) => {
    setPlaylistName(target.value);
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
          required
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
        <br />
        <br />
        <button type="submit">Save To Spotify</button>
      </form>
    </>
  );
}
