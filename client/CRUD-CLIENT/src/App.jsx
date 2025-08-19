import { Route, Routes } from 'react-router-dom';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import PostDetail from './components/PostDetail';

export default function App() {
  return (
      <Routes>
        <Route path="/" element={<PostList />}/>
        <Route path="/posts/new" element={<PostForm />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/posts/:id/edit" element={<PostForm />} />
      </Routes>
  );
}
