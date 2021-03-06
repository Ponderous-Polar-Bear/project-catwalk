import React from 'react';

const Search = (props) => {
  const handleSearch = (e) => {
    const text = e.target.value;
    props.sendSearch(text);
  };
  return (
    <label htmlFor="reviewSearch">
      <span style={{'display': 'none'}}>Search: </span>
      <input
        id="reviewSearch"
        type='text'
        placeholder="search"
        onChange={handleSearch}>
        </input>
    </label>
  );
};

export default Search;
