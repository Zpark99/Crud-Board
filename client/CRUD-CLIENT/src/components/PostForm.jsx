import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types'; 

export default function PostForm({ onPostCreated }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/api/posts', { title, content });
      setTitle('');
      setContent('');
      onPostCreated();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="내용"
        required
      />
      <button type="submit">등록</button>
    </form>
      
    
  );
} 

PostForm.propTypes = {
  onPostCreated: PropTypes.func.isRequired,
}