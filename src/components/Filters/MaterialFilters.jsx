import React from 'react';
import SearchBox from './SearchBox';

const MaterialFilters = ({
  filters,
  onFilterChange,
  materials,
  searchTerm,
  onSearchChange,
}) => {
  const materialTypes = ['all', ...new Set(materials.map(m => m.type))];
  const rarities = [
    'all',
    ...new Set(materials.map(m => m.rarity).filter(r => r)),
  ];

  const getMaterialTypeEmoji = type => {
    const emojiMap = {
      common: '📦',
      local: '🗺️',
      talent: '📚',
      weapon: '⚔️',
      character: '👤',
    };
    return emojiMap[type] || '📋';
  };

  return (
    <div className="filters-section">
      <div className="search-section">
        <SearchBox
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
          placeholder="Buscar materiales..."
        />
      </div>

      <div className="filters-container">
        <h3>Filtros</h3>

        <div className="filters-grid">
          <div className="filter-group">
            <label>Tipo:</label>
            <select
              value={filters.materialType}
              onChange={e => onFilterChange('materialType', e.target.value)}
              className="filter-select"
            >
              {materialTypes.map(type => (
                <option key={type} value={type}>
                  {type === 'all'
                    ? 'Todos'
                    : `${getMaterialTypeEmoji(type)} ${type}`}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Rareza:</label>
            <select
              value={filters.rarity}
              onChange={e => onFilterChange('rarity', e.target.value)}
              className="filter-select"
            >
              {rarities.map(rarity => (
                <option key={rarity} value={rarity}>
                  {rarity === 'all'
                    ? 'Todas'
                    : `${'⭐'.repeat(parseInt(rarity))}`}
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
        {(filters.materialType !== 'all' ||
          filters.rarity !== 'all' ||
          searchTerm) && (
          <div className="active-filters">
            <span>Filtros activos: </span>
            {searchTerm && (
              <span className="active-filter-tag">🔍 "{searchTerm}"</span>
            )}
            {filters.materialType !== 'all' && (
              <span className="active-filter-tag">
                {getMaterialTypeEmoji(filters.materialType)}{' '}
                {filters.materialType}
              </span>
            )}
            {filters.rarity !== 'all' && (
              <span className="active-filter-tag">
                {'⭐'.repeat(parseInt(filters.rarity))}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MaterialFilters;
