import React from 'react';

const SearchBox = ({
  searchTerm,
  onSearchChange,
  placeholder = 'Buscar...',
}) => {
  return (
    <div className="search-box">
      <div className="search-icon">🔍</div>
      <input
        type="text"
        value={searchTerm}
        onChange={e => onSearchChange(e.target.value)}
        placeholder={placeholder}
        className="search-input"
        aria-label="Buscar"
      />
      {searchTerm && (
        <button
          onClick={() => onSearchChange('')}
          className="clear-search"
          aria-label="Limpiar búsqueda"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default SearchBox;
