import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import ScrollToTop from './components/Layout/ScrollToTop';
import Home from './pages/Main/Home';
import Characters from './pages/Main/Characters';
import Weapons from './pages/Main/Weapons';
import Artifacts from './pages/Main/Artifacts';
import Materials from './pages/Main/Materials';
import Food from './pages/Main/Food';
import Potions from './pages/Main/Potions';
import Achievements from './pages/Main/Achievements';
import Enemies from './pages/Main/Enemies';
import CharacterDetail from './pages/Detail/CharacterDetail';
import WeaponDetail from './pages/Detail/WeaponDetail';
import ArtifactDetail from './pages/Detail/ArtifactDetail';
import About from './pages/Info/About';
import NotFound from './pages/Info/NotFound';
import './i18n';
import './styles/App.css';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <div className="app">
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/characters" element={<Characters />} />
                <Route path="/weapons" element={<Weapons />} />
                <Route path="/artifacts" element={<Artifacts />} />
                <Route path="/materials" element={<Materials />} />
                <Route path="/food" element={<Food />} />
                <Route path="/potions" element={<Potions />} />
                <Route path="/achievements" element={<Achievements />} />
                <Route path="/enemies" element={<Enemies />} />
                <Route
                  path="/character/:characterId"
                  element={<CharacterDetail />}
                />
                <Route path="/weapon/:weaponId" element={<WeaponDetail />} />
                <Route
                  path="/artifact/:artifactId"
                  element={<ArtifactDetail />}
                />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
            <ScrollToTop />
          </div>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
