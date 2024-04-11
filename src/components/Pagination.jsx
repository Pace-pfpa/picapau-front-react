import React from 'react';

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
/*     if(pageNumbers.length > 50){
        pageNumbers.splice(40);
    } */
  }



  return (
    <nav>
      <ul className='pagination'>
        {pageNumbers.map(number => (
          <li key={number} className='page-item'>
            <button className='pagina' onClick={() => paginate(number)}>
            {number}
            </button>
          </li>
        ))}
{/*         <button>Anterior</button>
        <button>Próximo</button> */}
      </ul>
    </nav>
  );
};

export default Pagination;