import React from 'react';
import SearchBox from './SearchBox';

const ArtifactFilters = ({
  filters,
  onFilterChange,
  artifacts,
  searchTerm,
  onSearchChange,
}) => {
  const rarities = [
    'all',
    ...new Set(artifacts.flatMap(artifact => artifact.rarity)),
  ].sort((a, b) => a - b);

  return (
    <div className="filters-section">
      <div className="search-section">
        <SearchBox
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
          placeholder="Buscar artefactos..."
        />
      </div>

      <div className="filters-container">
        <h3>Filtros</h3>

        <div className="filters-grid">
          <div className="filter-group">
            <label>Rareza Mínima:</label>
            <select
              value={filters.minRarity}
              onChange={e => onFilterChange('minRarity', e.target.value)}
              className="filter-select"
            >
              {rarities.map(rarity => (
                <option key={rarity} value={rarity}>
                  {rarity === 'all'
                    ? 'Todas'
                    : `${'⭐'.repeat(parseInt(rarity))}+`}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <button
              onClick={() => onFilterChange('clear', null)}
              className="clear-filters"
            >
              🗑️ Limpiar
            </button>
          </div>
        </div>

        {/* Filtros activos */}
        {(filters.minRarity !== 'all' || searchTerm) && (
          <div className="active-filters">
            <span>Filtros activos: </span>
            {searchTerm && (
              <span className="active-filter-tag">🔍 "{searchTerm}"</span>
            )}
            {filters.minRarity !== 'all' && (
              <span className="active-filter-tag">
                {'⭐'.repeat(parseInt(filters.minRarity))}+
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtifactFilters;
