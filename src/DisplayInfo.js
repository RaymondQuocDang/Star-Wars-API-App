function DisplayInfo({ info, planet, species, pageCount, setPageCount }) {    

    function displayPerson() {
        
        if (info !== null ) {
            const peopleTable = info[0].map((person, i) => {
                return(
                    <tr key={i}>
                    <td>{person.name}</td>
                    <td>{person.birth_year}</td>
                    <td>{person.height}</td>
                    <td>{person.mass}</td>
                    <td>{person.planet}</td>
                    <td>{person.species}</td>
                </tr>
                );
            }) 

        if (info !== null) {
            const peopleList = [].concat(...info)
            console.log(peopleList);
        }

            return peopleTable
        }
    }

    return (
        <div className="container">
            <h2 className="characterList">Character List</h2>
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
                    {displayPerson()}
                </tbody>
            </table>
        </div>
    );

}

export default DisplayInfo;