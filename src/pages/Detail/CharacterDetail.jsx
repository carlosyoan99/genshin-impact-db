import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useGenshinData } from '../../hooks/useGenshinData';
import LoadingSpinner from '../../components/Common/LoadingSpinner';

const CharacterDetail = () => {
  const { characterId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { characters, loading, error } = useGenshinData();

  const character = characters.find(char => char.id === characterId);

  if (loading) return <LoadingSpinner message={`${t('common.loading')}...`} />;
  if (error) return <div className="error">{error}</div>;
  if (!character) {
    return (
      <div className="page">
        <div className="error">
          <h2>{t('common.notFound')}</h2>
          <p>{t('characters.notFound')}</p>
          <button onClick={() => navigate('/characters')}>
            {t('common.back')}
          </button>
        </div>
      </div>
    );
  }

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

  return (
    <div className="page">
      <div className="detail-header">
        <button onClick={() => navigate('/characters')} className="back-button">
          ← {t('common.back')} {t('nav.characters')}
        </button>
        <h1>{character.name}</h1>
      </div>

      <div className="detail-content">
        <div className="detail-left">
          <div className="character-portrait">
            {character.images?.cover1 ? (
              <img src={character.images.cover1} alt={character.name} />
            ) : character.images?.icon ? (
              <img src={character.images.icon} alt={character.name} />
            ) : (
              <div className="portrait-placeholder">
                {getElementEmoji(character.element)}
              </div>
            )}
          </div>

          <div className="basic-info">
            <div className="info-item">
              <span className="info-label">{t('common.element')}:</span>
              <span className="info-value">
                {getElementEmoji(character.element)} {character.element}
              </span>
            </div>

            <div className="info-item">
              <span className="info-label">{t('common.weapon')}:</span>
              <span className="info-value">
                {getWeaponEmoji(character.weapon_type)} {character.weapon_type}
              </span>
            </div>

            <div className="info-item">
              <span className="info-label">{t('common.rarity')}:</span>
              <span className="info-value">
                {'⭐'.repeat(character.rarity)}
              </span>
            </div>

            {character.affiliation && (
              <div className="info-item">
                <span className="info-label">{t('common.region')}:</span>
                <span className="info-value">{character.affiliation}</span>
              </div>
            )}

            {character.constellation && (
              <div className="info-item">
                <span className="info-label">{t('common.constellation')}:</span>
                <span className="info-value">{character.constellation}</span>
              </div>
            )}

            {character.birthday && (
              <div className="info-item">
                <span className="info-label">{t('common.birthday')}:</span>
                <span className="info-value">{character.birthday}</span>
              </div>
            )}
          </div>
        </div>

        <div className="detail-right">
          {character.description && (
            <section className="detail-section">
              <h3>{t('common.description')}</h3>
              <p>{character.description}</p>
            </section>
          )}

          {character.skillTalents && character.skillTalents.length > 0 && (
            <section className="detail-section">
              <h3>{t('characters.skills')}</h3>
              <div className="skills-grid">
                {character.skillTalents.map((skill, index) => (
                  <div key={index} className="skill-item">
                    <h4>{skill.name}</h4>
                    <p>{skill.description}</p>
                    {skill.unlock && (
                      <div className="skill-meta">
                        <small>
                          {t('characters.unlock')}: {skill.unlock}
                        </small>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {character.passiveTalents && character.passiveTalents.length > 0 && (
            <section className="detail-section">
              <h3>{t('characters.passives')}</h3>
              <div className="skills-grid">
                {character.passiveTalents.map((talent, index) => (
                  <div key={index} className="skill-item">
                    <h4>{talent.name}</h4>
                    <p>{talent.description}</p>
                    {talent.unlock && (
                      <div className="skill-meta">
                        <small>
                          {t('characters.unlock')}: {talent.unlock}
                        </small>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {character.constellations && character.constellations.length > 0 && (
            <section className="detail-section">
              <h3>{t('characters.constellations')}</h3>
              <div className="constellations-grid">
                {character.constellations.map((constellation, index) => (
                  <div key={index} className="constellation-item">
                    <div className="constellation-header">
                      <h4>{constellation.name}</h4>
                      <span className="constellation-level">C{index + 1}</span>
                    </div>
                    <p>{constellation.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default CharacterDetail;
