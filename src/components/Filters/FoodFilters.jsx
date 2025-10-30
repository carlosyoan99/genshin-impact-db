import React from 'react';
import SearchBox from './SearchBox';

const FoodFilters = ({
  filters,
  onFilterChange,
  food,
  searchTerm,
  onSearchChange,
}) => {
  const dishTypes = ['all', ...new Set(food.map(f => f.dish_type))];
  const rarities = ['all', ...new Set(food.map(f => f.rarity).filter(r => r))];

  const getDishTypeEmoji = type => {
    const emojiMap = {
      normal: '🍽️',
      specialty: '🌟',
      recovery: '❤️',
      atk: '⚔️',
      def: '🛡️',
    };
    return emojiMap[type] || '🍳';
  };

  return (
    <div className="filters-section">
      <div className="search-section">
        <SearchBox
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
          placeholder="Buscar comidas..."
        />
      </div>

      <div className="filters-container">
        <h3>Filtros</h3>

        <div className="filters-grid">
          <div className="filter-group">
            <label>Tipo de Plato:</label>
            <select
              value={filters.dishType}
              onChange={e => onFilterChange('dishType', e.target.value)}
              className="filter-select"
            >
              {dishTypes.map(type => (
                <option key={type} value={type}>
                  {type === 'all'
                    ? 'Todos'
                    : `${getDishTypeEmoji(type)} ${type}`}
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
        {(filters.dishType !== 'all' ||
          filters.rarity !== 'all' ||
          searchTerm) && (
          <div className="active-filters">
            <span>Filtros activos: </span>
            {searchTerm && (
              <span className="active-filter-tag">🔍 "{searchTerm}"</span>
            )}
            {filters.dishType !== 'all' && (
              <span className="active-filter-tag">
                {getDishTypeEmoji(filters.dishType)} {filters.dishType}
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

export default FoodFilters;
