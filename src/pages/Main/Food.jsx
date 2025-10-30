import React, { useState, useMemo } from 'react';
import { useGenshinData } from '../../hooks/useGenshinData';
import FoodCard from '../../components/Cards/FoodCard';
import FoodFilters from '../../components/Filters/FoodFilters';
import LoadingSpinner from '../../components/Common/LoadingSpinner';

const Food = () => {
  const { food, loading, error } = useGenshinData();
  const [filters, setFilters] = useState({ dishType: 'all', rarity: 'all' });
  const [searchTerm, setSearchTerm] = useState('');

  const handleFilterChange = (filterType, value) => {
    if (filterType === 'clear') {
      setFilters({ dishType: 'all', rarity: 'all' });
      setSearchTerm('');
    } else {
      setFilters(prev => ({ ...prev, [filterType]: value }));
    }
  };

  const filteredFood = useMemo(() => {
    return food.filter(item => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesType =
        filters.dishType === 'all' || item.dish_type === filters.dishType;
      const matchesRarity =
        filters.rarity === 'all' || item.rarity?.toString() === filters.rarity;

      return matchesSearch && matchesType && matchesRarity;
    });
  }, [food, filters, searchTerm]);

  if (loading) return <LoadingSpinner message="Cargando comidas..." />;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="page">
      <header className="page-header">
        <h1>Comidas</h1>
        <p>Descubre todas las recetas culinarias de Teyvat y sus efectos</p>
      </header>

      <FoodFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        food={food}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <div className="stats">
        <span>
          Mostrando {filteredFood.length} de {food.length} comidas
        </span>
      </div>

      <div className="cards-grid">
        {filteredFood.map(foodItem => (
          <FoodCard key={foodItem.id} food={foodItem} />
        ))}
      </div>

      {filteredFood.length === 0 && (
        <div className="no-results">
          <h3>No se encontraron comidas</h3>
          <p>Intenta ajustar los filtros o términos de búsqueda</p>
        </div>
      )}
    </div>
  );
};

export default Food;
