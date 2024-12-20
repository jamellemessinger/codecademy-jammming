import React, { useState } from 'react';
import Track from './Track';

export default function Results({ results, addToPlaylist }) {
  const inPlaylist = false;
  return (
    <>
      <p>Results</p>
      {results[0] ? (
        results.map((obj, index) => {
          return (
            <Track
              key={index}
              songTitle={obj.songTitle}
              artist={obj.artist}
              album={obj.album}
              uri={obj.uri}
              addToPlaylist={addToPlaylist}
              inPlaylist={inPlaylist}
            />
          );
        })
      ) : (
        <p>NO RESULTS FOUND</p>
      )}
    </>
  );
}
