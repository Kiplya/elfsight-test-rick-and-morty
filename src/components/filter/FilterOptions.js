import axios from 'axios';
import { API_URL } from '../providers';

const uniqueSpecies = new Set();

const fetchAndCollectUniqueSpecies = async (page = 1) => {
  try {
    const { data } = await axios.get(API_URL, { params: { page } });

    data.results.forEach((character) => {
      uniqueSpecies.add(character.species);
    });

    if (data.info.next) {
      await fetchAndCollectUniqueSpecies(page + 1);
    }
  } catch (err) {
    console.error(`Error species fetching on page ${page}`, err);
  }
};

export const speciesLoader = async () => {
  if (localStorage.getItem('specieses')) {
    return JSON.parse(localStorage.getItem('specieses'));
  }

  await fetchAndCollectUniqueSpecies();
  const specieses = Array.from(uniqueSpecies)
    .sort()
    .map((spec) => ({
      value: spec.toLowerCase(),
      label: spec.charAt(0).toUpperCase() + spec.slice(1)
    }));

  localStorage.setItem('specieses', JSON.stringify(specieses));

  return specieses;
};

export const statusOptions = [
  { value: 'alive', label: 'Alive' },
  { value: 'dead', label: 'Dead' },
  { value: 'unknown', label: 'Unknown' }
];

export const genderOptions = [
  { value: 'female', label: 'Female' },
  { value: 'male', label: 'Male' },
  { value: 'genderless', label: 'Genderless' },
  { value: 'unknown', label: 'Unknown' }
];
