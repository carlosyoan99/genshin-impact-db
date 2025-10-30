import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useTranslation();

  const navItems = [
    { path: '/', label: t('nav.home'), emoji: '🏠' },
    { path: '/characters', label: t('nav.characters'), emoji: '👤' },
    { path: '/weapons', label: t('nav.weapons'), emoji: '⚔️' },
    { path: '/artifacts', label: t('nav.artifacts'), emoji: '🎭' },
    { path: '/materials', label: t('nav.materials'), emoji: '📦' },
    { path: '/food', label: t('nav.food'), emoji: '🍳' },
    { path: '/potions', label: t('nav.potions'), emoji: '🧪' },
    { path: '/achievements', label: t('nav.achievements'), emoji: '🏆' },
    { path: '/enemies', label: t('nav.enemies'), emoji: '👹' },
    { path: '/about', label: t('nav.about'), emoji: 'ℹ️' },
  ];

  const isActive = path => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link
          to="/"
          className="nav-logo"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <span className="logo-emoji">⚔️</span>
          <span className="logo-text">Genshin DB</span>
        </Link>

        <div className="nav-menu">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
            >
              <span className="nav-emoji">{item.emoji}</span>
              <span className="nav-label">{item.label}</span>
            </Link>
          ))}
        </div>

        <div className="nav-controls">
          <LanguageSelector />
          <ThemeToggle />
        </div>

        <button
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Menú de navegación"
        >
          ☰
        </button>

        {isMobileMenuOpen && (
          <div className="mobile-menu">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`mobile-nav-link ${isActive(item.path) ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="nav-emoji">{item.emoji}</span>
                <span className="nav-label">{item.label}</span>
              </Link>
            ))}

            <div className="mobile-controls">
              <LanguageSelector />
              <ThemeToggle />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
