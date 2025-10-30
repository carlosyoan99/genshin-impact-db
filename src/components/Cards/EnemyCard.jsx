import React from 'react';

const EnemyCard = ({ enemy }) => {
  const getEnemyTypeEmoji = type => {
    const emojiMap = {
      Élite: '🛡️',
      Jefe: '👑',
      Común: '⚔️',
      Normal: '😈',
    };
    return emojiMap[type] || '👹';
  };

  return (
    <div className="enemy-card card">
      <div className="card-image">
        {enemy.images?.icon ? (
          <img src={enemy.images.icon} alt={enemy.name} />
        ) : (
          <div className="image-placeholder">
            {getEnemyTypeEmoji(enemy.type)}
          </div>
        )}
      </div>

      <div className="card-info">
        <h3 className="card-name">{enemy.name}</h3>

        <div className="card-details">
          <div className="detail-item">
            <span>Tipo: {enemy.type || 'Desconocido'}</span>
          </div>

          {enemy.category && (
            <div className="detail-item">
              <span>Categoría: {enemy.category}</span>
            </div>
          )}
        </div>

        {enemy.description && (
          <p className="description">
            {enemy.description.substring(0, 100)}...
          </p>
        )}
      </div>
    </div>
  );
};

export default EnemyCard;
