import React, { useEffect, useState } from 'react';
import { getPosts, deletePost } from '../api/posts';
import PostForm from './PostForm';

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getPosts();
      setPosts(data);
    } catch {
      setError('게시글을 불러오는데 실패 했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deletePost(id);
      fetchPosts();
    }catch {
      alert('삭제에 실패했습니다.');
    }
  };

  const handlePostCreated = () => {
    fetchPosts();
  }

  return (
    <div>
      <h1>게시글 목록</h1>

      {/* 글 작성 폼 */}
      <PostForm onPostCreated={handlePostCreated} />

      {loading && <p>로딩 중...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <ul>
      {posts.map(post => (
        <li key={post.id}>
          <h2>{post.title}</h2>
          <button onClick={() => handleDelete(post.id)}>삭제</button>
        </li>
      ))} 
      </ul>
    </div>
  );
}