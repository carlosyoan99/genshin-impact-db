import React from 'react';
import { useNavigate } from 'react-router-dom';

const ArtifactCard = ({ artifact }) => {
  const navigate = useNavigate();

  const getRarityColor = rarity => {
    const maxRarity = Math.max(...rarity);
    const colors = {
      1: '#95a5a6',
      2: '#2ecc71',
      3: '#3498db',
      4: '#9b59b6',
      5: '#f39c12',
    };
    return colors[maxRarity] || '#3498db';
  };

  return (
    <div
      className="artifact-card card"
      style={{ borderColor: getRarityColor(artifact.rarity) }}
      onClick={() => navigate(`/artifact/${artifact.id}`)}
    >
      <div className="card-image">
        {artifact.images?.flower ? (
          <img src={artifact.images.flower} alt={artifact.name} />
        ) : (
          <div className="image-placeholder">🎭</div>
        )}

        <div
          className="rarity-badge"
          style={{ backgroundColor: getRarityColor(artifact.rarity) }}
        >
          {'⭐'.repeat(Math.max(...artifact.rarity))}
        </div>
      </div>

      <div className="card-info">
        <h3 className="card-name">{artifact.name}</h3>

        <div className="card-details">
          {artifact['2-piece_bonus'] && (
            <div className="detail-item bonus-text">
              <span>2-Pieza: {artifact['2-piece_bonus']}</span>
            </div>
          )}
        </div>

        <p className="rarity">Rareza: {artifact.rarity.join('-')}⭐</p>
      </div>
    </div>
  );
};

export default ArtifactCard;
