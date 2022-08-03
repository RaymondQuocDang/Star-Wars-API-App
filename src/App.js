import './App.css';
import DisplayInfo from './DisplayInfo.js'
import { useEffect, useState} from 'react';
import SearchCharacter from './SearchCharacter.js'

function App() {

  const [info, setInfo] = useState([])
  const [planet, setPlanet] = useState([])
  const [species, setSpecies] = useState([])
  const [pageCount, setPageCount] = useState(1)

  
  useEffect(() => {
    
    // Fetch for first 10 people
    fetch(`https://swapi.dev/api/people/?page=${pageCount}`)
    .then((response) => response.json())
    .then((data) => {
      setInfo(data.results)
    })

    // Fetch for homeworld
    fetch(`https://swapi.dev/api/people/?page=${pageCount}`)
    .then((response) => response.json())
    .then((data) => {
      return Promise.all(data.results.map((person) => {
        return fetch(person.homeworld)
      }))
    })  
    .then(responses => Promise.all(responses.map(r => r.json())))
    .then(planets => {
      setPlanet(planets)
    })
    
    // Fetch for species
    fetch(`https://swapi.dev/api/people/?page=${pageCount}`)
    .then(response => response.json())
    .then(data => {
      return Promise.all(data.results.map((person) => {
        return (person.species.length > 0) ? fetch(person.species[0]) : null;
      }))
    })
    .then(responses => Promise.all(responses.map(r => {
      return (r != null) ? r.json() : {name: ' '};
    })))
    .then(species => {
      setSpecies(species)
    })

  }, [pageCount])
  

  return (
    <div>
      <SearchCharacter />
      <DisplayInfo
      info={info} 
      planet={planet}
      species={species}
      pageCount={pageCount}
      setPageCount={setPageCount}
      />
    </div>
  );
}

export default App;
