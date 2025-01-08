import React, { useState } from 'react';

export default function SearchBar({ search }) {
  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    search(searchValue);
    setSearchValue('');
  };

  const handleOnChange = ({ target }) => {
    setSearchValue(target.value);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleOnChange}
          type="text"
          value={searchValue}
          placeholder="Enter a song or artist"
        />
        <button>Search</button>
      </form>
    </>
  );
}
