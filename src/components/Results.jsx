import React from 'react';
import Track from './Track';
import tracks from '../assets/data/exampleData';

export default function Results() {
  return (
    <>
      <p>Results</p>
      {tracks.map((track, index) => (
        <Track
          key={index}
          songTitle={track.songTitle}
          artist={track.artist}
          album={track.album}
        />
      ))}
    </>
  );
}
