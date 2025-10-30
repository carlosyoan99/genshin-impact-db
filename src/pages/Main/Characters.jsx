import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useGenshinData } from '../../hooks/useGenshinData';
import CharacterCard from '../../components/Cards/CharacterCard';
import CharacterFilters from '../../components/Filters/CharacterFilters';
import LoadingSpinner from '../../components/Common/LoadingSpinner';

const Characters = () => {
  const { characters, loading, error } = useGenshinData();
  const [filters, setFilters] = useState({
    element: 'all',
    weaponType: 'all',
    rarity: 'all',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const { t } = useTranslation();

  const handleFilterChange = (filterType, value) => {
    if (filterType === 'clear') {
      setFilters({ element: 'all', weaponType: 'all', rarity: 'all' });
      setSearchTerm('');
    } else {
      setFilters(prev => ({ ...prev, [filterType]: value }));
    }
  };

  const filteredCharacters = useMemo(() => {
    return characters.filter(character => {
      const matchesSearch = character.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesElement =
        filters.element === 'all' || character.element === filters.element;
      const matchesWeapon =
        filters.weaponType === 'all' ||
        character.weapon_type === filters.weaponType;
      const matchesRarity =
        filters.rarity === 'all' ||
        character.rarity.toString() === filters.rarity;

      return matchesSearch && matchesElement && matchesWeapon && matchesRarity;
    });
  }, [characters, filters, searchTerm]);

  if (loading) return <LoadingSpinner message={`${t('common.loading')}...`} />;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="page">
      <header className="page-header">
        <h1>{t('characters.title')}</h1>
        <p>{t('characters.subtitle')}</p>
      </header>

      <CharacterFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        characters={characters}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <div className="stats">
        <span>
          {t('common.showing')} {filteredCharacters.length} {t('common.of')}{' '}
          {characters.length} {t('common.items')}
        </span>
      </div>

      <div className="cards-grid">
        {filteredCharacters.map(character => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>

      {filteredCharacters.length === 0 && (
        <div className="no-results">
          <h3>No se encontraron personajes</h3>
          <p>Intenta ajustar los filtros o términos de búsqueda</p>
        </div>
      )}
    </div>
  );
};

export default Characters;
