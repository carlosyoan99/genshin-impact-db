import React, { useState, useMemo } from 'react';
import { useGenshinData } from '../../hooks/useGenshinData';
import AchievementCard from '../../components/Cards/AchievementCard';
import SearchBox from '../../components/Filters/SearchBox';
import LoadingSpinner from '../../components/Common/LoadingSpinner';

const Achievements = () => {
  const { achievements, loading, error } = useGenshinData();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAchievements = useMemo(() => {
    return achievements.filter(
      achievement =>
        achievement.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        achievement.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [achievements, searchTerm]);

  if (loading) return <LoadingSpinner message="Cargando logros..." />;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="page">
      <header className="page-header">
        <h1>Logros</h1>
        <p>Descubre todos los logros y recompensas disponibles</p>
      </header>

      <div className="filters-section">
        <div className="search-section">
          <SearchBox
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            placeholder="Buscar logros..."
          />
        </div>
      </div>

      <div className="stats">
        <span>
          Mostrando {filteredAchievements.length} de {achievements.length}{' '}
          logros
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

      <div className="cards-grid achievements-grid">
        {filteredAchievements.map(achievement => (
          <AchievementCard key={achievement.id} achievement={achievement} />
        ))}
      </div>

      {filteredAchievements.length === 0 && (
        <div className="no-results">
          <h3>No se encontraron logros</h3>
          <p>Intenta ajustar los términos de búsqueda</p>
        </div>
      )}
    </div>
  );
};

export default Achievements;
