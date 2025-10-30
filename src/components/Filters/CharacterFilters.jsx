import React from 'react';
import SearchBox from './SearchBox';

const CharacterFilters = ({
  filters,
  onFilterChange,
  characters,
  searchTerm,
  onSearchChange,
}) => {
  const elements = ['all', ...new Set(characters.map(char => char.element))];
  const weaponTypes = [
    'all',
    ...new Set(characters.map(char => char.weapon_type)),
  ];
  const rarities = ['all', ...new Set(characters.map(char => char.rarity))];

  const getElementEmoji = element => {
    const emojiMap = {
      Pyro: '🔥',
      Hydro: '💧',
      Electro: '⚡',
      Cryo: '❄️',
      Anemo: '🌪️',
      Geo: '🪨',
      Dendro: '🌿',
    };
    return emojiMap[element] || '❓';
  };

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
      {/* Búsqueda */}
      <div className="search-section">
        <SearchBox
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
          placeholder="Buscar personajes..."
        />
      </div>

      {/* Filtros */}
      <div className="filters-container">
        <h3>Filtros</h3>

        <div className="filters-grid">
          <div className="filter-group">
            <label>Elemento:</label>
            <select
              value={filters.element}
              onChange={e => onFilterChange('element', e.target.value)}
              className="filter-select"
            >
              {elements.map(element => (
                <option key={element} value={element}>
                  {element === 'all'
                    ? 'Todos'
                    : `${getElementEmoji(element)} ${element}`}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Arma:</label>
            <select
              value={filters.weaponType}
              onChange={e => onFilterChange('weaponType', e.target.value)}
              className="filter-select"
            >
              {weaponTypes.map(weaponType => (
                <option key={weaponType} value={weaponType}>
                  {weaponType === 'all'
                    ? 'Todas'
                    : `${getWeaponEmoji(weaponType)} ${weaponType}`}
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
        {(filters.element !== 'all' ||
          filters.weaponType !== 'all' ||
          filters.rarity !== 'all' ||
          searchTerm) && (
          <div className="active-filters">
            <span>Filtros activos: </span>
            {searchTerm && (
              <span className="active-filter-tag">🔍 "{searchTerm}"</span>
            )}
            {filters.element !== 'all' && (
              <span className="active-filter-tag">
                {getElementEmoji(filters.element)} {filters.element}
              </span>
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

export default CharacterFilters;
