import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useGenshinData } from '../../hooks/useGenshinData';
import LoadingSpinner from '../../components/Common/LoadingSpinner';

const ArtifactDetail = () => {
  const { artifactId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { artifacts, loading, error } = useGenshinData();

  const artifact = artifacts.find(a => a.id === artifactId);

  if (loading) return <LoadingSpinner message={`${t('common.loading')}...`} />;
  if (error) return <div className="error">{error}</div>;
  if (!artifact) {
    return (
      <div className="page">
        <div className="error">
          <h2>{t('common.notFound')}</h2>
          <p>{t('artifacts.notFound')}</p>
          <button onClick={() => navigate('/artifacts')}>
            {t('common.back')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="detail-header">
        <button onClick={() => navigate('/artifacts')} className="back-button">
          ← {t('common.back')} {t('nav.artifacts')}
        </button>
        <h1>{artifact.name}</h1>
      </div>

      <div className="detail-content">
        <div className="detail-left">
          <div className="artifact-portrait">
            {artifact.images?.flower ? (
              <img src={artifact.images.flower} alt={artifact.name} />
            ) : (
              <div className="portrait-placeholder">🎭</div>
            )}
          </div>

          <div className="basic-info">
            <div className="info-item">
              <span className="info-label">{t('common.rarity')}:</span>
              <span className="info-value">
                {artifact.rarity?.join('-')} ⭐
              </span>
            </div>

            {artifact['2-piece_bonus'] && (
              <div className="info-item bonus-info">
                <span className="info-label">{t('artifacts.twoPiece')}:</span>
                <span className="info-value bonus-text">
                  {artifact['2-piece_bonus']}
                </span>
              </div>
            )}

            {artifact['4-piece_bonus'] && (
              <div className="info-item bonus-info">
                <span className="info-label">{t('artifacts.fourPiece')}:</span>
                <span className="info-value bonus-text">
                  {artifact['4-piece_bonus']}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="detail-right">
          {artifact.description && (
            <section className="detail-section">
              <h3>{t('common.description')}</h3>
              <p>{artifact.description}</p>
            </section>
          )}

          <section className="detail-section">
            <h3>{t('artifacts.pieces')}</h3>
            <div className="artifact-pieces">
              {artifact.images?.flower && (
                <div className="artifact-piece">
                  <h4>🌸 {t('artifacts.flower')}</h4>
                  <img
                    src={artifact.images.flower}
                    alt={t('artifacts.flower')}
                  />
                </div>
              )}
              {artifact.images?.plume && (
                <div className="artifact-piece">
                  <h4>🪶 {t('artifacts.plume')}</h4>
                  <img src={artifact.images.plume} alt={t('artifacts.plume')} />
                </div>
              )}
              {artifact.images?.sands && (
                <div className="artifact-piece">
                  <h4>⏳ {t('artifacts.sands')}</h4>
                  <img src={artifact.images.sands} alt={t('artifacts.sands')} />
                </div>
              )}
              {artifact.images?.goblet && (
                <div className="artifact-piece">
                  <h4>🏆 {t('artifacts.goblet')}</h4>
                  <img
                    src={artifact.images.goblet}
                    alt={t('artifacts.goblet')}
                  />
                </div>
              )}
              {artifact.images?.circlet && (
                <div className="artifact-piece">
                  <h4>👑 {t('artifacts.circlet')}</h4>
                  <img
                    src={artifact.images.circlet}
                    alt={t('artifacts.circlet')}
                  />
                </div>
              )}
            </div>
          </section>

          {artifact.source && artifact.source.length > 0 && (
            <section className="detail-section">
              <h3>{t('common.source')}</h3>
              <div className="source-info">
                <ul>
                  {artifact.source.map((source, index) => (
                    <li key={index}>{source}</li>
                  ))}
                </ul>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtifactDetail;
