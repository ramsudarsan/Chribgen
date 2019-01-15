import React from 'react';

const Search = ({updateSearch}) => {
    return (
        <div>
            <input id="searchbar" type="search" onChange={updateSearch}></input>
        </div>
    );
}

export default Search;