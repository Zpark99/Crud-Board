import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPost } from "../api/posts";

export default function PostDeatil() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    getPost(id).then(setPost);
  }, [id]);

  if (!post) return <p>로딩 중...</p>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <small>작성자: {post.author}</small>
      <br />
      <Link to={`/posts/${id}/edit`}>수정하기</Link>
      <Link to="/">목록으로 돌아가기</Link>
    </div>
  );
}