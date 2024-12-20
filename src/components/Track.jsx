import React, { useState } from 'react';

export default function Track({ songTitle, artist, album, onResultClicked }) {
  const handleOnClick = () => {
    onResultClicked({
      songTitle: songTitle,
      artist: artist,
      album: album,
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
          <button onClick={handleOnClick}>add</button>
        </div>
      </div>
    </>
  );
}
