import React from 'react';

const PotionCard = ({ potion }) => {
  const getPotionTypeEmoji = type => {
    const emojiMap = {
      atk: '⚔️',
      def: '🛡️',
      elemental: '✨',
      stamina: '⚡',
      resistance: '❄️',
    };
    return emojiMap[type] || '🧪';
  };

  return (
    <div className="potion-card card">
      <div className="card-image">
        {potion.images?.icon ? (
          <img src={potion.images.icon} alt={potion.name} />
        ) : (
          <div className="image-placeholder">
            {getPotionTypeEmoji(potion.type)}
          </div>
        )}
      </div>

      <div className="card-info">
        <h3 className="card-name">{potion.name}</h3>

        <div className="card-details">
          <div className="detail-item">
            <span className="detail-emoji">
              {getPotionTypeEmoji(potion.type)}
            </span>
            <span>{potion.type || 'Poción'}</span>
          </div>

          {potion.rarity && (
            <div className="detail-item">
              <span>Rareza: {'⭐'.repeat(potion.rarity)}</span>
            </div>
          )}
        </div>

        {potion.effect && <p className="effect">Efecto: {potion.effect}</p>}

        {potion.crafting && potion.crafting.length > 0 && (
          <p className="crafting">Ingredientes: {potion.crafting.length}</p>
        )}
      </div>
    </div>
  );
};

export default PotionCard;
