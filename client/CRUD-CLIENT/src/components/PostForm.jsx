import React, { useEffect, useState } from "react";
import { createPost, getPost, updatePost } from "../api/posts";
import { useNavigate, useParams } from "react-router-dom";

export default function PostForm() {
  const navigate = useNavigate();
  const { id } = useParams(); // 수정 모드일 때 사용
  const isEdit = Boolean(id);

  const [form, setForm] = useState({ title: "", content: "", author: "" });

  useEffect(() => {
    if (isEdit) {
      getPost(id).then(setForm);
    }
  }, [isEdit, id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEdit) {
      await updatePost(id, form);
    } else {
      await createPost(form);
    }
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isEdit ? "게시글 수정" : "새 글 작성"}</h2>
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="제목"
        required
      />
      <textarea
        name="content"
        value={form.content}
        onChange={handleChange}
        placeholder="내용"
        required
      />
      <input
        name="author"
        value={form.author}
        onChange={handleChange}
        placeholder="작성자"
      />
      <button type="submit">저장</button>
    </form>
  );
}