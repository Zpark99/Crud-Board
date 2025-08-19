import React, { useEffect, useState } from 'react';
import { getPosts, deletePost } from '../api/posts';
import { Link } from 'react-router-dom';

export default function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts().then(setPosts);
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("정말 삭제 하시겠습니까?")) {
      await deletePost(id);
      setPosts(posts.filter((p) => p.id !== id));
    }
  };

  return (
    <div>
      <h2>게시글 목록</h2>
      <Link to="/posts/new">새 글 쓰기</Link>
      <ul>
        {posts.map((p) => (
          <li key={p.id}>
            <Link to={`posts/${p.id}`}>{p.title}</Link> ({p.author || "익명"})
            <button onClick={() => handleDelete(p.id)}>삭제</button>
          </li>
        ))} 
      </ul>
    </div>
  );
}