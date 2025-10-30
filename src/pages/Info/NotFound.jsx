import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="page">
      <div className="not-found-content">
        <div className="not-found-illustration">
          <div className="error-emoji">😵</div>
          <h1>404</h1>
          <h2>Página No Encontrada</h2>
        </div>

        <div className="not-found-message">
          <p>¡Vaya! Parece que te has perdido en el vasto mundo de Teyvat.</p>
          <p>La página que buscas no existe o ha sido movida.</p>
        </div>

        <div className="not-found-actions">
          <button onClick={() => navigate(-1)} className="back-button">
            ← Volver Atrás
          </button>
          <Link to="/" className="home-button">
            🏠 Ir al Inicio
          </Link>
        </div>

        <div className="not-found-suggestions">
          <h3>Tal vez quisiste visitar:</h3>
          <div className="suggestion-links">
            <Link to="/characters">👤 Personajes</Link>
            <Link to="/weapons">⚔️ Armas</Link>
            <Link to="/artifacts">🎭 Artefactos</Link>
            <Link to="/enemies">👹 Enemigos</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
