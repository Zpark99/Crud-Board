const API_URL = 'http://localhost:5000/posts';

export const getPosts = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Failed to fetch posts');
  return res.json();
};

export const getPostById = async (id) => {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error('Failed to fetch posts');
  return res.json();
};

export const createPost = async (postData) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(postData),
  });
  if (!res.ok) throw new Error('Failed to fetch posts');
  return res.json();
};

export const updatePost = async (id, postData) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(postData),
  });
  if (!res.ok) throw new Error('Failed to fetch posts');
  return res.json();
};

export const deletePost = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to fetch posts');
};