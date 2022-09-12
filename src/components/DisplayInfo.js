import { useState } from 'react';
import Paginate from './Paginate';

function DisplayInfo({ characterData, searchValue }) {

    const [pageNumber, setPageNumber] = useState(0);
    const charactersPerPage = 10;
    const charactersViewed = pageNumber * charactersPerPage;

    function displayCharacters() {

        const peopleTable = characterData
            .filter((val) => {
                if (val.name.includes(searchValue) ||
                    val.birth_year.includes(searchValue) ||
                    val.height.includes(searchValue) ||
                    val.mass.includes(searchValue) ||
                    val.homeworld.includes(searchValue) ||
                    val.species.includes(searchValue)) {
                    return val;
                }
            })
            .slice(charactersViewed, charactersViewed + charactersPerPage)
            .map((char, i) => {
                return (
                    <tr key={i}>
                        <td>{char.name}</td>
                        <td>{char.birth_year}</td>
                        <td>{char.height !== 'unknown' ? `${char.height} cm` : `${char.height}`}</td>
                        <td>{char.mass !== 'unknown' ? `${char.mass} kg` : `${char.mass}`}</td>
                        <td>{char.homeworld}</td>
                        <td>{char.species}</td>
                    </tr>
                );
            })
        return peopleTable
    }

    function displayTable() {
        if (characterData !== null) {
            return (
                <table className="table table-dark table-striped">
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
                        {displayCharacters()}
                    </tbody>
                </table>
            );
        } else {
            return <div className='loading-container'><p className='loading-text'>Loading...</p></div>
        }
    }

    return (
        <div className="container">
            {displayTable()}
            <Paginate 
            searchValue={searchValue}
            setPageNumber={setPageNumber}
            characterData={characterData}
            charactersPerPage={charactersPerPage}
            />
        </div>
    );

}

export default DisplayInfo;