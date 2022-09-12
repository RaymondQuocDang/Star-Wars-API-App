import ReactPaginate from "react-paginate";

function Paginate({ characterData, setPageNumber, searchValue, charactersPerPage }) {

    function changePage({ selected }) {
        setPageNumber(selected);
    }

    if (characterData !== null) {
        const pageCount = Math.ceil(characterData.filter((val) => {
            if (val.name.includes(searchValue) ||
                val.birth_year.includes(searchValue) ||
                val.height.includes(searchValue) ||
                val.mass.includes(searchValue) ||
                val.homeworld.includes(searchValue) ||
                val.species.includes(searchValue)) {
                return val;
            }
        }).length / charactersPerPage);
        return (
            <ReactPaginate
                previousLabel={'Prev'}
                nextLabel={'Next'}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={'button-container'}
                previousLinkClassName={'prev-button'}
                nextLinkClassName={'next-button'}
                activeClassName={'active-button'}
                disabledClassName={'disabled-button'}
            />
        );
    }
}

export default Paginate;