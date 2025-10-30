import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const useGenshinData = () => {
  const { i18n } = useTranslation();
  const [data, setData] = useState({
    characters: [],
    weapons: [],
    artifacts: [],
    enemies: [],
    materials: [],
    elements: [],
    food: [],
    potions: [],
    achievements: [],
    domains: [],
    commonMaterials: [],
    localMaterials: [],
    talentBooks: [],
    weaponAscensionMaterials: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const gs = (await import('genshin-data')).default;
        const currentLang = i18n.language;
        
        console.log(`Cargando datos en ${currentLang}...`);
        
        const [
          charsData, 
          weaponsData, 
          artifactsData, 
          enemiesData,
          materialsData,
          elementsData,
          foodData,
          potionsData,
          achievementsData,
          domainsData
        ] = await Promise.all([
          gs.characters(currentLang),
          gs.weapons(currentLang),
          gs.artifacts(currentLang),
          gs.enemies(currentLang),
          gs.materials(currentLang),
          gs.elements(currentLang),
          gs.food(currentLang),
          gs.potions(currentLang),
          gs.achievements(currentLang),
          gs.domains(currentLang)
        ]);

        console.log(`Datos cargados en ${currentLang}: 
          ${charsData.length} personajes,
          ${weaponsData.length} armas,
          ${artifactsData.length} artefactos,
          ${enemiesData.length} enemigos
        `);
        
        // Organizar materiales por categorías
        const commonMaterials = materialsData.filter(m => m.type === 'common');
        const localMaterials = materialsData.filter(m => m.type === 'local');
        const talentBooks = materialsData.filter(m => m.type?.includes('talent'));
        const weaponAscensionMaterials = materialsData.filter(m => m.type?.includes('weapon'));

        setData({
          characters: charsData,
          weapons: weaponsData,
          artifacts: artifactsData,
          enemies: enemiesData,
          materials: materialsData,
          elements: elementsData,
          food: foodData,
          potions: potionsData,
          achievements: achievementsData,
          domains: domainsData,
          commonMaterials,
          localMaterials,
          talentBooks,
          weaponAscensionMaterials
        });
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Error al cargar los datos de Genshin Impact');
        setLoading(false);
      }
    }

    fetchData();
  }, [i18n.language]);

  return { ...data, loading, error };
};