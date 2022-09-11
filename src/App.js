import './App.css';
import DisplayInfo from './DisplayInfo.js'
import { useEffect, useState} from 'react';
import SearchCharacter from './SearchCharacter.js'
import axios from 'axios';

function App() {

  const [info, setInfo] = useState(null)
  const [planet, setPlanet] = useState([])
  const [species, setSpecies] = useState([])
  
  useEffect(() => {
    
    fetchCharacter();
    fetchSpecies();
    fetchPlanets();

  }, [])
  
  async function fetchCharacter() {
    const characterPages = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const characterList = await Promise.all(characterPages.map((page) => {
      return axios.get(`https://swapi.dev/api/people/?page=${page}`)
    }))    
    const characters = characterList.map((data) => {
      return data.data.results
    })
    setInfo(characters)
    console.log(characters)
  }



  async function fetchSpecies() {
    const speciesPages = [1, 2, 3, 4]
    const speciesList = await Promise.all(speciesPages.map((page) => {
      return axios.get(`https://swapi.dev/api/species/?page=${page}`)
    }))
    const species = speciesList.map((data) => {
      return data.data.results
    })
    setSpecies(species)
    console.log(species)   
  }

  async function fetchPlanets() {
    const planetPages = [1, 2, 3, 4, 5, 6]
    const planetList = await Promise.all(planetPages.map((page) => {
      return axios.get(`https://swapi.dev/api/planets/?page=${page}`)
    }))
    const planets = planetList.map((data) => {
      return data.data.results
    })
    setPlanet(planets)  
  }

  return (
    <div>
      <SearchCharacter />
      <DisplayInfo
      info={info} 
      />
    </div>
  );
}

export default App;
