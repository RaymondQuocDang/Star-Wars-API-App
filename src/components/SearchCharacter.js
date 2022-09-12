import starWarsTitle from '../images/SW-title.svg'

function SearchCharacter({ setSearchValue }) {

    return (
        <div className="container">
            <div className="title-container">
                <img src={starWarsTitle} alt="Star Wars title" className='star-wars-title' />
            </div>
            <div>
                <input className="form-control" type='text' placeholder="Search for character here..." onChange={(e) => setSearchValue(e.target.value)}></input>
            </div>
        </div>
    )
}

export default SearchCharacter;