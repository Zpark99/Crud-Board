import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostById } from "../api/posts";

export default function PostDeatil() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getPostById(id)
      .then(data => {
        setPost(data);
        setLoading(false);
      })
      .catch(() => {
        setError('게시글을 불러 올 수 없습니다.');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <Link to="/">목록으로 돌아가기</Link>
    </div>
  );
}