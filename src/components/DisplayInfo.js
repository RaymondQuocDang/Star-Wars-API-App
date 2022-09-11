function DisplayInfo({ characterData }) {

    function displayCharacters() {

        const peopleTable = characterData.map((char, i) => {
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
            return <div>Loading...</div>

        }
    }

    return (
        <div className="container">
            {displayTable()}
        </div>
    );

}

export default DisplayInfo;