import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

const LanguageSelector = () => {
  const { currentLanguage, languages, changeLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = languages.find(lang => lang.code === currentLanguage);

  return (
    <div className="language-selector">
      <button
        className="language-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Change language"
      >
        <span className="language-flag">{currentLang?.flag}</span>
        <span className="language-code">{currentLanguage.toUpperCase()}</span>
        <span className="dropdown-arrow">▼</span>
      </button>

      {isOpen && (
        <div className="language-dropdown">
          {languages.map(language => (
            <button
              key={language.code}
              className={`language-option ${currentLanguage === language.code ? 'active' : ''}`}
              onClick={() => {
                changeLanguage(language.code);
                setIsOpen(false);
              }}
            >
              <span className="language-flag">{language.flag}</span>
              <span className="language-name">{language.nativeName}</span>
              <span className="language-english">{language.name}</span>
            </button>
          ))}
        </div>
      )}

      {/* Overlay para cerrar al hacer click fuera */}
      {isOpen && (
        <div className="dropdown-overlay" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
};

export default LanguageSelector;
