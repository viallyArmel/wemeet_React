import React from 'react';
import { Link } from 'react-router-dom';

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
                                <Link onClick={() => paginate(numPage)} className='page-link'>{numPage}</Link>
                            </li>
                        );
                    })
                }
            </ul>
        </nav>
    );
}

export default Pagination;