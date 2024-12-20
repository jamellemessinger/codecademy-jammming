import React, { useState } from 'react';

export default function Track({
  id,
  songTitle,
  artist,
  album,
  uri,
  addToPlaylist,
  removeFromPlaylist,
  inPlaylist,
}) {
  const handleAdd = () => {
    addToPlaylist({
      id: id,
      songTitle: songTitle,
      artist: artist,
      album: album,
      uri: uri,
    });
  };

  const handleRemove = () => {
    removeFromPlaylist({
      id: id,
    });
  };

  return (
    <>
      <div className="track-container">
        <div>
          <p>{songTitle}</p>
          <p>
            {artist} | {album}
          </p>
        </div>
        <div>
          {inPlaylist ? (
            <button onClick={handleRemove}>remove</button>
          ) : (
            <button onClick={handleAdd}>add</button>
          )}
        </div>
      </div>
    </>
  );
}
