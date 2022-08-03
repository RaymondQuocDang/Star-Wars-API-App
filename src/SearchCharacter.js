import { useState } from 'react';

function SearchCharacter () {
    
    const [input, setInput] = useState('');
    const [character, setCharacter] = useState('');
    const [planet, setPlanet] = useState([]);
    const [species, setSpecies] = useState([]);

    const searchButtonClicked = () => {
        
        if (input === '') {
            return;
        }

        fetch(`https://swapi.dev/api/people/?search=${input}`)
        .then(response => response.json())
        .then(data => {
            setCharacter(data);
        })

        // Fetch for homeworld
        fetch(`https://swapi.dev/api/people/?search=${input}`)
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
        fetch(`https://swapi.dev/api/people/?search=${input}`)
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

    }

    const displaySearchResult = () => {

        var characterList = []

        for (let i = 0; i < character.count; i++) {
            characterList.push(
                <tr key={i}>
                    <td>{character.results[i].name}</td>
                    <td>{character.results[i].birth_year}</td>
                    <td>{character.results[i].height}</td>
                    <td>{character.results[i].mass}</td>
                    <td>{planet[i]?.name || "loading... "}</td>
                    <td>{species[i]?.name || "loading... "}</td>
                </tr>
            )

            if(i > 8) {
                break;
            }
        }

        if (character.count > 0) {
            return characterList;
        } else {
            return (
                <div>Error, can't find the character you're looking for.</div>
                );
        }
    }

    return (
        <div className="container">
            <h2>Search Character</h2>
            <div>
                <input className="form-control" type='text' value={input} onChange={(e) => setInput(e.target.value)}></input>
                <button className='btn btn-primary' onClick={searchButtonClicked}>Search</button>
            </div>
            <div>
            {character !== '' 
                && 
                <table className="table table-primary table-striped">
                <thead className="table-dark">
                    <tr>
                        <th>Name</th>
                        <th>Birth Year</th>
                        <th>Height</th>
                        <th>Mass</th>
                        <th>Homeworld</th>
                        <th>Species</th>
                    </tr>
                </thead>
                <tbody>
                    {displaySearchResult()}
                </tbody>
            </table>
            }
            </div>
        </div>
    )
}




export default SearchCharacter;