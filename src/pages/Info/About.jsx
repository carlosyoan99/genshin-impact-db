import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="page">
      <header className="page-header">
        <h1>Acerca de</h1>
        <p>Información sobre esta aplicación y créditos</p>
      </header>

      <div className="about-content">
        <section className="about-section">
          <h2>📖 Sobre esta Aplicación</h2>
          <p>
            Genshin Impact DB es una base de datos no oficial que proporciona
            información detallada sobre personajes, armas, artefactos y enemigos
            del juego Genshin Impact.
          </p>
          <p>
            Esta aplicación está desarrollada con React y utiliza datos
            proporcionados por la comunidad para ofrecer una experiencia de
            consulta rápida y eficiente.
          </p>
        </section>

        <section className="about-section">
          <h2>⚙️ Tecnologías Utilizadas</h2>
          <div className="tech-grid">
            <div className="tech-item">
              <h3>Frontend</h3>
              <ul>
                <li>React 18</li>
                <li>React Router DOM</li>
                <li>CSS3 con Grid y Flexbox</li>
              </ul>
            </div>
            <div className="tech-item">
              <h3>Datos</h3>
              <ul>
                <li>genshin-data (npm package)</li>
                <li>Datos en tiempo real</li>
                <li>Múltiples idiomas soportados</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>👏 Créditos y Agradecimientos</h2>
          <div className="credits-list">
            <div className="credit-item">
              <h3>HoYoverse</h3>
              <p>
                Desarrolladores y propietarios de Genshin Impact. Esta
                aplicación no está afiliada oficialmente con HoYoverse.
              </p>
            </div>

            <div className="credit-item">
              <h3>Comunidad de Genshin Impact</h3>
              <p>
                Por su increíble trabajo recopilando y manteniendo la
                información del juego.
              </p>
            </div>

            <div className="credit-item">
              <h3>Librería genshin-data</h3>
              <p>
                <a
                  href="https://www.npmjs.com/package/genshin-data"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="credit-link"
                >
                  https://www.npmjs.com/package/genshin-data
                </a>
                <br />
                Proporciona los datos estructurados utilizados en esta
                aplicación.
              </p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>📄 Aviso Legal</h2>
          <p>
            Genshin Impact es una marca registrada de HoYoverse. Esta aplicación
            es un proyecto de código abierto creado por fans y no tiene
            afiliación oficial con HoYoverse.
          </p>
          <p>
            Todos los derechos de los personajes, historias, mundos y otros
            contenidos relacionados con Genshin Impact pertenecen a HoYoverse.
          </p>
        </section>

        <section className="about-section">
          <h2>🔗 Enlaces Rápidos</h2>
          <div className="quick-links">
            <Link to="/characters" className="quick-link">
              👤 Personajes
            </Link>
            <Link to="/weapons" className="quick-link">
              ⚔️ Armas
            </Link>
            <Link to="/artifacts" className="quick-link">
              🎭 Artefactos
            </Link>
            <Link to="/enemies" className="quick-link">
              👹 Enemigos
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
