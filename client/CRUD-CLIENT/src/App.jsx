import './App.css';
import { Route, Routes, Link } from 'react-router-dom';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import PostDetail from './components/PostDetail';

export default function App() {
  return (
    <div>
      <nav>
        <Link to="/">게시글 목록</Link> | <Link to="new">새 글 작성</Link>
      </nav>

      <Routes>
        <Route path="/" element={<PostList />}/>
        <Route path="/new" element={<PostForm />} />
        <Route path="/posts/:id" element={<PostDetail />} />
      </Routes>
    </div>
  );
}
