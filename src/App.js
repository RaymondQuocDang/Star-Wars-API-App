import './App.css';
import DisplayInfo from './components/DisplayInfo.js'
import { useEffect, useState } from 'react';
import SearchCharacter from './components/SearchCharacter.js'
import axios from 'axios';

function App() {

  const [characterData, setCharacterData] = useState(null)
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {

    fetchCharacter();

  }, [])

  async function fetchCharacter() {
    const characterPages = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const speciesPages = [1, 2, 3, 4]
    const planetPages = [1, 2, 3, 4, 5, 6]

    let tempCharacters = await Promise.all(characterPages.map((page) => {
      return axios.get(`https://swapi.dev/api/people/?page=${page}`)
    }))

    tempCharacters = [].concat(...(tempCharacters.map((data) => {
      return data.data.results
    })))

    let tempPlanets = await Promise.all(planetPages.map((page) => {
      return axios.get(`https://swapi.dev/api/planets/?page=${page}`)
    }))

    tempPlanets = [].concat(...(tempPlanets.map((data) => {
      return data.data.results
    })))

    let tempSpecies = await Promise.all(speciesPages.map((page) => {
      return axios.get(`https://swapi.dev/api/species/?page=${page}`)
    }))

    tempSpecies = [].concat(...(tempSpecies.map((data) => {
      return data.data.results
    })))

    console.log(tempPlanets[0].url)
    console.log(tempSpecies)

    tempPlanets = arrayToDict(tempPlanets)
    tempSpecies = arrayToDict(tempSpecies)

    console.log(tempCharacters)
    console.log(tempPlanets)
    console.log(tempSpecies)

    for (const char of tempCharacters) {
      char.homeworld = tempPlanets[char.homeworld]
      char.species = char.species.length === 0 ? 'Human' : tempSpecies[char.species[0]]
    }
    
    setCharacterData(tempCharacters)
  }

  function arrayToDict(array) {
    let obj = {}
    for (let item of array) {
      obj[item['url']] = item['name']
    }
    return obj
  }

  return (
    <div className='App'>
      <SearchCharacter 
        setSearchValue={setSearchValue}
      />
      <DisplayInfo
        characterData={characterData}
        searchValue={searchValue}
      />
    </div>
  );
}

export default App;
