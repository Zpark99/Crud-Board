import axios from "axios";

const API_URL = "http://localhost:5000/posts"; // 백엔드 주소

export async function getPosts() {
  const res = await axios.get(API_URL);
  // axios는 4xx, 5xx 에러를 자동으로 catch 블록으로 보냄
  return res.data;
}

export async function getPost(id) {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
}

export async function createPost(post) {
  const res = await axios.post(API_URL, post);
  return res.data;
}

export async function updatePost(id, post) {
  const res = await axios.put(`${API_URL}/${id}`, post);
  return res.data;
}

export async function deletePost(id) {
  await axios.delete(`${API_URL}/${id}`);
}