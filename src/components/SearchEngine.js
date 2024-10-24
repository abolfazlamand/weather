import React from "react";
import {useTranslation} from "react-i18next";

function SearchEngine({ query, setQuery, search }) {
    const {i18n, t} = useTranslation();
    //handler function
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      search(e);
    }
  };

  return (
    <div className="SearchEngine">
      <input
        type="text"
        className="city-search"
        placeholder={t('search_place_holder')}
        name="query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyUp={handleKeyPress}
      />
      <button onClick={search}><i className="fas fa-search" style={{ fontSize: "18px" }}></i></button>
    </div>
  );
}

export default SearchEngine;
