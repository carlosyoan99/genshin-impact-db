import React, { useState, useMemo } from 'react';
import { useGenshinData } from '../../hooks/useGenshinData';
import MaterialCard from '../../components/Cards/MaterialCard';
import MaterialFilters from '../../components/Filters/MaterialFilters';
import LoadingSpinner from '../../components/Common/LoadingSpinner';

const Materials = () => {
  const { materials, loading, error } = useGenshinData();
  const [filters, setFilters] = useState({
    materialType: 'all',
    rarity: 'all',
  });
  const [searchTerm, setSearchTerm] = useState('');

  const handleFilterChange = (filterType, value) => {
    if (filterType === 'clear') {
      setFilters({ materialType: 'all', rarity: 'all' });
      setSearchTerm('');
    } else {
      setFilters(prev => ({ ...prev, [filterType]: value }));
    }
  };

  const filteredMaterials = useMemo(() => {
    return materials.filter(material => {
      const matchesSearch = material.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesType =
        filters.materialType === 'all' ||
        material.type === filters.materialType;
      const matchesRarity =
        filters.rarity === 'all' ||
        material.rarity?.toString() === filters.rarity;

      return matchesSearch && matchesType && matchesRarity;
    });
  }, [materials, filters, searchTerm]);

  if (loading) return <LoadingSpinner message="Cargando materiales..." />;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="page">
      <header className="page-header">
        <h1>Materiales</h1>
        <p>
          Encuentra todos los materiales para ascensión, talentos y fabricación
        </p>
      </header>

      <MaterialFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        materials={materials}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <div className="stats">
        <span>
          Mostrando {filteredMaterials.length} de {materials.length} materiales
        </span>
      </div>

      <div className="cards-grid">
        {filteredMaterials.map(material => (
          <MaterialCard key={material.id} material={material} />
        ))}
      </div>

      {filteredMaterials.length === 0 && (
        <div className="no-results">
          <h3>No se encontraron materiales</h3>
          <p>Intenta ajustar los filtros o términos de búsqueda</p>
        </div>
      )}
    </div>
  );
};

export default Materials;
