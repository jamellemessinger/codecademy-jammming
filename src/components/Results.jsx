import React from 'react';
import Track from './Track';

export default function Results({ results }) {
  return (
    <>
      <p>Results</p>
      {results
        ? results.map((obj, index) => (
            <Track
              key={index}
              songTitle={obj.songTitle}
              artist={obj.artist}
              album={obj.album}
            />
          ))
        : undefined}
    </>
  );
}
