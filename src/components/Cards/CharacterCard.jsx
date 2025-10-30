import React from 'react';
import { useNavigate } from 'react-router-dom';

const CharacterCard = ({ character }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/character/${character.id}`);
  };

  const getElementEmoji = element => {
    const emojiMap = {
      Pyro: '🔥',
      Hydro: '💧',
      Electro: '⚡',
      Cryo: '❄️',
      Anemo: '🌪️',
      Geo: '🪨',
      Dendro: '🌿',
    };
    return emojiMap[element] || '❓';
  };

  const getWeaponEmoji = weaponType => {
    const weaponMap = {
      'Espada Ligera': '⚔️',
      Mandoble: '🪓',
      Arco: '🏹',
      Catalizador: '📖',
      Lanza: '🔱',
    };
    return weaponMap[weaponType] || '🗡️';
  };

  const getRarityColor = rarity => {
    return rarity === 5 ? '#f39c12' : '#9b59b6';
  };

  return (
    <div
      className="character-card card"
      style={{ borderColor: getRarityColor(character.rarity) }}
      onClick={handleCardClick}
    >
      <div className="card-image">
        {character.images?.icon ? (
          <img src={character.images.icon} alt={character.name} />
        ) : (
          <div className="image-placeholder">
            {getElementEmoji(character.element)}
          </div>
        )}

        <div
          className="rarity-badge"
          style={{ backgroundColor: getRarityColor(character.rarity) }}
        >
          {'⭐'.repeat(character.rarity)}
        </div>

        <div className="element-badge">
          {getElementEmoji(character.element)}
        </div>
      </div>

      <div className="card-info">
        <h3 className="card-name">{character.name}</h3>

        <div className="card-details">
          <div className="detail-item">
            <span className="detail-emoji">
              {getElementEmoji(character.element)}
            </span>
            <span>{character.element}</span>
          </div>

          <div className="detail-item">
            <span className="detail-emoji">
              {getWeaponEmoji(character.weapon_type)}
            </span>
            <span>{character.weapon_type}</span>
          </div>
        </div>

        {character.affiliation && (
          <p className="affiliation">{character.affiliation}</p>
        )}
      </div>
    </div>
  );
};

export default CharacterCard;
