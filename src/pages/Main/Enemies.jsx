import React, { useState, useMemo } from 'react';
import { useGenshinData } from '../../hooks/useGenshinData';
import EnemyCard from '../../components/Cards/EnemyCard';
import SearchBox from '../../components/Filters/SearchBox';
import LoadingSpinner from '../../components/Common/LoadingSpinner';

const Enemies = () => {
  const { enemies, loading, error } = useGenshinData();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEnemies = useMemo(() => {
    return enemies.filter(enemy =>
      enemy.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [enemies, searchTerm]);

  if (loading) return <LoadingSpinner message="Cargando enemigos..." />;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="page">
      <header className="page-header">
        <h1>Enemigos</h1>
        <p>Conoce a los enemigos que encontrarás en tu aventura por Teyvat</p>
      </header>

      <div className="filters-section">
        <div className="search-section">
          <SearchBox
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            placeholder="Buscar enemigos..."
          />
        </div>
      </div>

      <div className="stats">
        <span>
          Mostrando {filteredEnemies.length} de {enemies.length} enemigos
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
        {filteredEnemies.map(enemy => (
          <EnemyCard key={enemy.id} enemy={enemy} />
        ))}
      </div>

      {filteredEnemies.length === 0 && (
        <div className="no-results">
          <h3>No se encontraron enemigos</h3>
          <p>Intenta ajustar los términos de búsqueda</p>
        </div>
      )}
    </div>
  );
};

export default Enemies;
