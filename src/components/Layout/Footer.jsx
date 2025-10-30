import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Genshin Impact DB</h3>
          <p>Base de datos no oficial de Genshin Impact</p>
        </div>

        <div className="footer-section">
          <h4>Enlaces Rápidos</h4>
          <div className="footer-links">
            <Link to="/characters">Personajes</Link>
            <Link to="/weapons">Armas</Link>
            <Link to="/artifacts">Artefactos</Link>
            <Link to="/about">Acerca de</Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; {currentYear} Genshin Impact DB -
          <Link to="/about" className="credits-link">
            {' '}
            Créditos
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
