import React from 'react';

const MaterialCard = ({ material }) => {
  const getMaterialTypeEmoji = type => {
    const emojiMap = {
      common: '📦',
      local: '🗺️',
      talent: '📚',
      weapon: '⚔️',
      character: '👤',
      forge: '⚒️',
      cooking: '🍳',
    };
    return emojiMap[type] || '📋';
  };

  const getRarityColor = rarity => {
    const colors = {
      1: '#95a5a6',
      2: '#2ecc71',
      3: '#3498db',
      4: '#9b59b6',
      5: '#f39c12',
    };
    return colors[rarity] || '#3498db';
  };

  return (
    <div
      className="material-card card"
      style={{ borderColor: getRarityColor(material.rarity) }}
    >
      <div className="card-image">
        {material.images?.icon ? (
          <img src={material.images.icon} alt={material.name} />
        ) : (
          <div className="image-placeholder">
            {getMaterialTypeEmoji(material.type)}
          </div>
        )}

        {material.rarity && (
          <div
            className="rarity-badge"
            style={{ backgroundColor: getRarityColor(material.rarity) }}
          >
            {'⭐'.repeat(material.rarity)}
          </div>
        )}
      </div>

      <div className="card-info">
        <h3 className="card-name">{material.name}</h3>

        <div className="card-details">
          <div className="detail-item">
            <span className="detail-emoji">
              {getMaterialTypeEmoji(material.type)}
            </span>
            <span>{material.type || 'Material'}</span>
          </div>

          {material.category && (
            <div className="detail-item">
              <span>Categoría: {material.category}</span>
            </div>
          )}
        </div>

        {material.description && (
          <p className="description">
            {material.description.substring(0, 100)}...
          </p>
        )}

        {material.source && (
          <p className="source">Fuente: {material.source.join(', ')}</p>
        )}
      </div>
    </div>
  );
};

export default MaterialCard;
