import React from 'react';
import { Link } from 'react-router-dom';
import { useGenshinData } from '../../hooks/useGenshinData';
import LoadingSpinner from '../../components/Common/LoadingSpinner';

const Home = () => {
  const {
    characters,
    weapons,
    artifacts,
    enemies,
    materials,
    food,
    potions,
    achievements,
    loading,
    error,
  } = useGenshinData();

  if (loading) return <LoadingSpinner message="Cargando mundo de Teyvat..." />;
  if (error) return <div className="error">{error}</div>;

  const stats = [
    {
      label: 'Personajes',
      count: characters.length,
      path: '/characters',
      emoji: '👤',
      color: '#48dbfb',
    },
    {
      label: 'Armas',
      count: weapons.length,
      path: '/weapons',
      emoji: '⚔️',
      color: '#ff9ff3',
    },
    {
      label: 'Artefactos',
      count: artifacts.length,
      path: '/artifacts',
      emoji: '🎭',
      color: '#feca57',
    },
    {
      label: 'Materiales',
      count: materials.length,
      path: '/materials',
      emoji: '📦',
      color: '#2ecc71',
    },
    {
      label: 'Comidas',
      count: food.length,
      path: '/food',
      emoji: '🍳',
      color: '#e74c3c',
    },
    {
      label: 'Pociones',
      count: potions.length,
      path: '/potions',
      emoji: '🧪',
      color: '#9b59b6',
    },
    {
      label: 'Logros',
      count: achievements.length,
      path: '/achievements',
      emoji: '🏆',
      color: '#f39c12',
    },
    {
      label: 'Enemigos',
      count: enemies.length,
      path: '/enemies',
      emoji: '👹',
      color: '#ff6b6b',
    },
  ];

  return (
    <div className="page">
      <header className="page-header">
        <h1>Genshin Impact Database</h1>
        <p>Explora todo el contenido del mundo de Teyvat</p>
      </header>

      <section className="stats-section">
        <div className="stats-grid">
          {stats.map(stat => (
            <Link key={stat.path} to={stat.path} className="stat-card">
              <div
                className="stat-emoji"
                style={{ backgroundColor: stat.color }}
              >
                {stat.emoji}
              </div>
              <div className="stat-info">
                <h3>{stat.label}</h3>
                <p className="stat-count">{stat.count} elementos</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
