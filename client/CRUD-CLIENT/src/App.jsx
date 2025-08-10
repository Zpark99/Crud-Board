import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    axios.get('http://localhost:3000/posts') // 백엔드 주소
      .then(res => {
        setPosts(res.data); // posts 상태 업데이트
      })
      .catch(err => {
        console.error('데이터 불러오기 실패:', err);
      });
    }, []);

  return (
    <div>
      <h1>갤러리</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <strong>{post.title}</strong> - {post.content}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App;
