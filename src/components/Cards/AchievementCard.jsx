import React from 'react';

const AchievementCard = ({ achievement }) => {
  const getAchievementCategoryEmoji = category => {
    const emojiMap = {
      combat: '⚔️',
      exploration: '🗺️',
      character: '👤',
      quest: '📖',
      world: '🌍',
      wonders: '🌟',
    };
    return emojiMap[category] || '🏆';
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
      className="achievement-card card"
      style={{ borderColor: getRarityColor(achievement.rarity) }}
    >
      <div className="card-info">
        <div className="achievement-header">
          <div className="achievement-emoji">
            {getAchievementCategoryEmoji(achievement.category)}
          </div>
          <h3 className="card-name">{achievement.name}</h3>
        </div>

        <div className="card-details">
          <div className="detail-item">
            <span>Categoría: {achievement.category}</span>
          </div>

          {achievement.rarity && (
            <div className="detail-item">
              <span>Rareza: {'⭐'.repeat(achievement.rarity)}</span>
            </div>
          )}
        </div>

        {achievement.description && (
          <p className="description">{achievement.description}</p>
        )}

        {achievement.reward && (
          <p className="reward">Recompensa: {achievement.reward}</p>
        )}

        {achievement.requirement && (
          <p className="requirement">Requisito: {achievement.requirement}</p>
        )}
      </div>
    </div>
  );
};

export default AchievementCard;
