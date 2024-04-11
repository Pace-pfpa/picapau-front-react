import React from 'react';

const Posts = ({ posts, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }
  console.log(posts)
  console.log(loading)
  return (
      <div>
        {/* <ul className='list-group mb-3'>
        {posts.map(post => (
            <button>
                <li key={post.id} className='list-group-item' >
                 {post.title}
                </li>
            </button>
        ))}
         </ul> */}
         <table>
            <thead>
               
                    <th>Nome</th>
                    <th>Nup</th>
                    <th>Dia</th>
                    <th>Statusssss</th>
               
            </thead>
            <tbody>
            {posts.map(post => (
            <button>
                <tr key={post.id}  >
                 <td>{post.id}</td>
                 <td>{post.id}</td>
                 <td>{post.id}</td>
                 <td>{post.id}</td>
                </tr>
            </button>
            ))}
            </tbody>
         </table>
      </div>
    
  );
};

export default Posts;