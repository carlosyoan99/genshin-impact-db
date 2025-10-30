import React from 'react';
import SearchBox from './SearchBox';

const WeaponFilters = ({
  filters,
  onFilterChange,
  weapons,
  searchTerm,
  onSearchChange,
}) => {
  const weaponTypes = ['all', ...new Set(weapons.map(weapon => weapon.type))];
  const rarities = ['all', ...new Set(weapons.map(weapon => weapon.rarity))];

  const getWeaponEmoji = weaponType => {
    const weaponMap = {
      'Espada Ligera': '⚔️',
      Mandoble: '🪓',
      Arco: '🏹',
      Catalizador: '📖',
      Lanza: '🔱',
    };
    return weaponMap[weaponType] || '🗡️';
  };

  return (
    <div className="filters-section">
      <div className="search-section">
        <SearchBox
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
          placeholder="Buscar armas..."
        />
      </div>

      <div className="filters-container">
        <h3>Filtros</h3>

        <div className="filters-grid">
          <div className="filter-group">
            <label>Tipo:</label>
            <select
              value={filters.weaponType}
              onChange={e => onFilterChange('weaponType', e.target.value)}
              className="filter-select"
            >
              {weaponTypes.map(type => (
                <option key={type} value={type}>
                  {type === 'all' ? 'Todos' : `${getWeaponEmoji(type)} ${type}`}
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
        {(filters.weaponType !== 'all' ||
          filters.rarity !== 'all' ||
          searchTerm) && (
          <div className="active-filters">
            <span>Filtros activos: </span>
            {searchTerm && (
              <span className="active-filter-tag">🔍 "{searchTerm}"</span>
            )}
            {filters.weaponType !== 'all' && (
              <span className="active-filter-tag">
                {getWeaponEmoji(filters.weaponType)} {filters.weaponType}
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

export default WeaponFilters;
