function DisplayInfo({ info, planet, species, pageCount, setPageCount }) {    

    const displayPerson = () => {
        
        const personList = []

        for (let i = 0; i < info.length; i++) {

            personList.push(
                <tr key={[i]}>
                    <td>{info[i].name}</td>
                    <td>{info[i].birth_year}</td>
                    <td>{info[i].height}</td>
                    <td>{info[i].mass}</td>
                    <td>{planet[i]?.name || "loading... "}</td>
                    <td>{species[i]?.name || "loading... "}</td>
                </tr>
            );
        }
        return personList;
    }

    const nextPage = () => {
        setPageCount(prevCount => prevCount + 1)
    }

    const previousPage = () => {
        setPageCount(prevCount => prevCount - 1)
    }

    const paginationButton = () => {

        if (pageCount > 1) {
            return (
                <div>    
                    <button className="paginationButton" onClick={previousPage}>Previous</button>
                    <button className="paginationButton" onClick={nextPage}>Next</button>
                </div>
            );
        }
        else {
            return (<button className="paginationButton" onClick={nextPage}>Next</button>
            );
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
            {paginationButton()}
        </div>
    );

}

export default DisplayInfo;