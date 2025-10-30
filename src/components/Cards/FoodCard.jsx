import React from 'react';

const FoodCard = ({ food }) => {
  const getDishTypeEmoji = type => {
    const emojiMap = {
      normal: '🍽️',
      specialty: '🌟',
      recovery: '❤️',
      atk: '⚔️',
      def: '🛡️',
      stamina: '⚡',
    };
    return emojiMap[type] || '🍳';
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
      className="food-card card"
      style={{ borderColor: getRarityColor(food.rarity) }}
    >
      <div className="card-image">
        {food.images?.icon ? (
          <img src={food.images.icon} alt={food.name} />
        ) : (
          <div className="image-placeholder">
            {getDishTypeEmoji(food.dish_type)}
          </div>
        )}

        <div
          className="rarity-badge"
          style={{ backgroundColor: getRarityColor(food.rarity) }}
        >
          {'⭐'.repeat(food.rarity)}
        </div>
      </div>

      <div className="card-info">
        <h3 className="card-name">{food.name}</h3>

        <div className="card-details">
          <div className="detail-item">
            <span className="detail-emoji">
              {getDishTypeEmoji(food.dish_type)}
            </span>
            <span>{food.dish_type || 'Comida'}</span>
          </div>

          {food.character && (
            <div className="detail-item">
              <span>Especialidad de: {food.character}</span>
            </div>
          )}
        </div>

        {food.effect && <p className="effect">Efecto: {food.effect}</p>}

        {food.description && (
          <p className="description">{food.description.substring(0, 80)}...</p>
        )}
      </div>
    </div>
  );
};

export default FoodCard;
