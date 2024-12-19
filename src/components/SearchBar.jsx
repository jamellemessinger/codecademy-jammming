import React, { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchValue);
    setSearchValue('');
  };

  const handleOnChange = ({ target }) => {
    setSearchValue(target.value);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input onChange={handleOnChange} type="text" value={searchValue} />
        <button>Search</button>
      </form>
    </>
  );
}
