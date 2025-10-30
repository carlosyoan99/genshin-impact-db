import React, { useState, useMemo } from 'react';
import { useGenshinData } from '../../hooks/useGenshinData';
import PotionCard from '../../components/Cards/PotionCard';
import SearchBox from '../../components/Filters/SearchBox';
import LoadingSpinner from '../../components/Common/LoadingSpinner';

const Potions = () => {
  const { potions, loading, error } = useGenshinData();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPotions = useMemo(() => {
    return potions.filter(potion =>
      potion.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [potions, searchTerm]);

  if (loading) return <LoadingSpinner message="Cargando pociones..." />;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="page">
      <header className="page-header">
        <h1>Pociones</h1>
        <p>Explora las pociones y sus efectos en batalla</p>
      </header>

      <div className="filters-section">
        <div className="search-section">
          <SearchBox
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            placeholder="Buscar pociones..."
          />
        </div>
      </div>

      <div className="stats">
        <span>
          Mostrando {filteredPotions.length} de {potions.length} pociones
        </span>
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="clear-filters-btn"
          >
            Limpiar búsqueda
          </button>
        )}
      </div>

      <div className="cards-grid">
        {filteredPotions.map(potion => (
          <PotionCard key={potion.id} potion={potion} />
        ))}
      </div>

      {filteredPotions.length === 0 && (
        <div className="no-results">
          <h3>No se encontraron pociones</h3>
          <p>Intenta ajustar los términos de búsqueda</p>
        </div>
      )}
    </div>
  );
};

export default Potions;
