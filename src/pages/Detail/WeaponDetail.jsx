import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useGenshinData } from '../../hooks/useGenshinData';
import LoadingSpinner from '../../components/Common/LoadingSpinner';

const WeaponDetail = () => {
  const { weaponId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { weapons, loading, error } = useGenshinData();

  const weapon = weapons.find(w => w.id === weaponId);

  if (loading) return <LoadingSpinner message={`${t('common.loading')}...`} />;
  if (error) return <div className="error">{error}</div>;
  if (!weapon) {
    return (
      <div className="page">
        <div className="error">
          <h2>{t('common.notFound')}</h2>
          <p>{t('weapons.notFound')}</p>
          <button onClick={() => navigate('/weapons')}>
            {t('common.back')}
          </button>
        </div>
      </div>
    );
  }

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

  return (
    <div className="page">
      <div className="detail-header">
        <button onClick={() => navigate('/weapons')} className="back-button">
          ← {t('common.back')} {t('nav.weapons')}
        </button>
        <h1>{weapon.name}</h1>
      </div>

      <div className="detail-content">
        <div className="detail-left">
          <div className="weapon-portrait">
            {weapon.images?.icon ? (
              <img src={weapon.images.icon} alt={weapon.name} />
            ) : (
              <div className="portrait-placeholder">
                {getWeaponEmoji(weapon.type)}
              </div>
            )}
          </div>

          <div className="basic-info">
            <div className="info-item">
              <span className="info-label">{t('common.type')}:</span>
              <span className="info-value">
                {getWeaponEmoji(weapon.type)} {weapon.type}
              </span>
            </div>

            <div className="info-item">
              <span className="info-label">{t('common.rarity')}:</span>
              <span className="info-value">{'⭐'.repeat(weapon.rarity)}</span>
            </div>

            {weapon.attack && (
              <div className="info-item">
                <span className="info-label">{t('weapons.baseAtk')}:</span>
                <span className="info-value">{weapon.attack}</span>
              </div>
            )}

            {weapon.substat && (
              <div className="info-item">
                <span className="info-label">{t('weapons.substat')}:</span>
                <span className="info-value">{weapon.substat}</span>
              </div>
            )}

            {weapon.subvalue && (
              <div className="info-item">
                <span className="info-label">{t('weapons.subvalue')}:</span>
                <span className="info-value">{weapon.subvalue}</span>
              </div>
            )}
          </div>
        </div>

        <div className="detail-right">
          {weapon.description && (
            <section className="detail-section">
              <h3>{t('common.description')}</h3>
              <p>{weapon.description}</p>
            </section>
          )}

          {weapon.effect && (
            <section className="detail-section">
              <h3>{t('common.effect')}</h3>
              <p>{weapon.effect}</p>
              {weapon.effectname && (
                <p className="effect-name">
                  <strong>{t('weapons.effectName')}:</strong>{' '}
                  {weapon.effectname}
                </p>
              )}
            </section>
          )}

          {weapon.stats && Object.keys(weapon.stats).length > 0 && (
            <section className="detail-section">
              <h3>{t('weapons.stats')}</h3>
              <div className="stats-table">
                <table>
                  <thead>
                    <tr>
                      <th>{t('weapons.level')}</th>
                      <th>{t('weapons.attack')}</th>
                      {weapon.substat && <th>{weapon.substat}</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(weapon.stats).map(([level, stats]) => (
                      <tr key={level}>
                        <td>{level}</td>
                        <td>{stats.attack || '-'}</td>
                        {weapon.substat && (
                          <td>{stats[weapon.substat.toLowerCase()] || '-'}</td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {weapon.ascension && weapon.ascension.length > 0 && (
            <section className="detail-section">
              <h3>{t('weapons.ascension')}</h3>
              <div className="ascension-materials">
                {weapon.ascension.map((ascension, index) => (
                  <div key={index} className="ascension-level">
                    <h4>
                      {t('weapons.phase')} {index + 1}
                    </h4>
                    {ascension.materials && (
                      <div className="materials-list">
                        {Object.entries(ascension.materials).map(
                          ([material, quantity]) => (
                            <div key={material} className="material-item">
                              <span className="material-name">{material}</span>
                              <span className="material-quantity">
                                x{quantity}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    )}
                    {ascension.cost && (
                      <p>
                        <strong>{t('weapons.cost')}:</strong> {ascension.cost}
                      </p>
                    )}
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

export default WeaponDetail;
