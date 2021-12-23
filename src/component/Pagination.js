import React from 'react';
import { Link } from 'react-router-dom';

const Pagination  = ({eventsPerPage, totalEvents, paginate}) => {

    const pageNumbers = [];

    for (let numPage = 1; numPage < Math.ceil(totalEvents / eventsPerPage); numPage++){
        pageNumbers.push(numPage);
    }
   
    return (
        <div className='paginate'>
            <nav aria-label="Page navigation example">
            <ul className='pagination pagination-sm'>
                {
                    pageNumbers.map(numPage => {
                        return (
                            <li key={numPage} className='page-item'>
                                <Link to='#' onClick={() => paginate(numPage)} className='page-link'>
                                    {numPage}
                                </Link>
                            </li>
                        );
                    })
                }
            </ul>
        </nav>
        </div>
    );
}

export default Pagination;