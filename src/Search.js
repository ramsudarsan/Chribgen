import React from 'react';
import './Search.css';

const Search = ({updateSearch}) => {
    return (
        <div>
            <input id="searchbar" type="search" onChange={updateSearch}></input>
        </div>
    );
}

export default Search;