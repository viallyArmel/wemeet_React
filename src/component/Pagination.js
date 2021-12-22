import React from 'react';

const Pagination  = ({eventsPerPage, totalEvents, paginate}) => {

    const pageNumbers = [];

    for (let numPage = 1; numPage < Math.ceil(totalEvents / eventsPerPage); numPage++){
        pageNumbers.push(numPage);
    }

    return (
        <nav>
            <ul className='pagination'>
                {
                    pageNumbers.map(numPage => {
                        return (
                            <li key={numPage} className='page-item'>
                                <a onClick={() => paginate(numPage)} className='page-link'>{numPage}</a>
                            </li>
                        );
                    })
                }
            </ul>
        </nav>
    );
}

export default Pagination;