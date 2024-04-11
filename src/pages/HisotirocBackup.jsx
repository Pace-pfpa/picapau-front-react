import React, { useState, useEffect } from 'react';
import Posts from '../components/Posts';
import Pagination from '../components/Pagination';
import axios from 'axios';





export const HistoricoTriagemBackup = ()=> {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const arrayDeObjetos = [];

      for (let i = 1; i <= 600; i++) {
        const obj = {
          body: `Sequência ${i}: ${i * 10}, ${i * 20}, ${i * 30}`,
          id: i,
          title: `Sequência ${i}: ${i * 10}, ${i * 20}, ${i * 30}`,
          userId: 1
        };
        arrayDeObjetos.push(obj);
      }
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(arrayDeObjetos);
      //console.log(res.data)
      setLoading(false);
    };

    fetchPosts();
  }, []);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);
  return (
    <div className='historicoTri'>
      <div >
        <h1 >Processos</h1>
        <Posts posts={currentPosts} loading={loading} />
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={posts.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
};