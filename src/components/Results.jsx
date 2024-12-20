import React, { useState } from 'react';
import Track from './Track';

export default function Results({ results, createPlaylist }) {

  return (
    <>
      <p>Results</p>
      {results[0] ? (
        results.map((obj, index) => (
          <Track
            key={index}
            songTitle={obj.songTitle}
            artist={obj.artist}
            album={obj.album}
            onResultClicked={createPlaylist}
          />
        ))
      ) : (
        <p>NO RESULTS FOUND</p>
      )}
    </>
  );
}
