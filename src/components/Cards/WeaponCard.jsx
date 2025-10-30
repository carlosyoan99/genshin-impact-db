import React from 'react';
import { useNavigate } from 'react-router-dom';

const WeaponCard = ({ weapon }) => {
  const navigate = useNavigate();

  const getWeaponEmoji = type => {
    const weaponMap = {
      'Espada Ligera': '⚔️',
      Mandoble: '🪓',
      Arco: '🏹',
      Catalizador: '📖',
      Lanza: '🔱',
    };
    return weaponMap[type] || '🗡️';
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
      className="weapon-card card"
      style={{ borderColor: getRarityColor(weapon.rarity) }}
      onClick={() => navigate(`/weapon/${weapon.id}`)}
    >
      <div className="card-image">
        {weapon.images?.icon ? (
          <img src={weapon.images.icon} alt={weapon.name} />
        ) : (
          <div className="image-placeholder">{getWeaponEmoji(weapon.type)}</div>
        )}

        <div
          className="rarity-badge"
          style={{ backgroundColor: getRarityColor(weapon.rarity) }}
        >
          {'⭐'.repeat(weapon.rarity)}
        </div>
      </div>

      <div className="card-info">
        <h3 className="card-name">{weapon.name}</h3>

        <div className="card-details">
          <div className="detail-item">
            <span className="detail-emoji">{getWeaponEmoji(weapon.type)}</span>
            <span>{weapon.type}</span>
          </div>

          {weapon.substat && (
            <div className="detail-item">
              <span>{weapon.substat}</span>
            </div>
          )}
        </div>

        {weapon.attack && <p className="stat">ATQ: {weapon.attack}</p>}
      </div>
    </div>
  );
};

export default WeaponCard;
