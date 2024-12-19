import React, { useState } from 'react';

export default function SearchBar({ onSearchSong }) {
  const [song, setSong] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearchSong(song);
  };

  const handleOnChange = ({ target }) => {
    setSong(target.value);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input onChange={handleOnChange} type="text" value={song} />
        <button type="submit">Search</button>
      </form>
    </>
  );
}
