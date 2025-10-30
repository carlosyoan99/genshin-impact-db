import React, { useState, useMemo } from 'react';
import { useGenshinData } from '../../hooks/useGenshinData';
import WeaponCard from '../../components/Cards/WeaponCard';
import WeaponFilters from '../../components/Filters/WeaponFilters';
import LoadingSpinner from '../../components/Common/LoadingSpinner';

const Weapons = () => {
  const { weapons, loading, error } = useGenshinData();
  const [filters, setFilters] = useState({ weaponType: 'all', rarity: 'all' });
  const [searchTerm, setSearchTerm] = useState('');

  const handleFilterChange = (filterType, value) => {
    if (filterType === 'clear') {
      setFilters({ weaponType: 'all', rarity: 'all' });
      setSearchTerm('');
    } else {
      setFilters(prev => ({ ...prev, [filterType]: value }));
    }
  };

  const filteredWeapons = useMemo(() => {
    return weapons.filter(weapon => {
      const matchesSearch = weapon.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesType =
        filters.weaponType === 'all' || weapon.type === filters.weaponType;
      const matchesRarity =
        filters.rarity === 'all' || weapon.rarity.toString() === filters.rarity;

      return matchesSearch && matchesType && matchesRarity;
    });
  }, [weapons, filters, searchTerm]);

  if (loading) return <LoadingSpinner message="Cargando armas..." />;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="page">
      <header className="page-header">
        <h1>Armas</h1>
        <p>Descubre todas las armas disponibles en Teyvat</p>
      </header>

      <WeaponFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        weapons={weapons}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <div className="stats">
        <span>
          Mostrando {filteredWeapons.length} de {weapons.length} armas
        </span>
      </div>

      <div className="cards-grid">
        {filteredWeapons.map(weapon => (
          <WeaponCard key={weapon.id} weapon={weapon} />
        ))}
      </div>

      {filteredWeapons.length === 0 && (
        <div className="no-results">
          <h3>No se encontraron armas</h3>
          <p>Intenta ajustar los filtros o términos de búsqueda</p>
        </div>
      )}
    </div>
  );
};

export default Weapons;
