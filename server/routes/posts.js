const express = require('express'); // express 모듈 불러오기
const router = express.Router(); // router 변수 생성 
const db = require('../db/database'); // db 파일 import

// router -> URL 요청 처리 
// 2025/08/10 -> if => catch 문으로 변환 (에러처리 용이)

// GET /posts 모든 게시글 조회

router.get('/', async (req, res) => { // await 사용 -> async 선언 되어야지 가능
  try {
    // posts 표에서 모든 행 가져오기 
    const [rows] = await db.query('SELECT * FROM posts');
    res.json(rows);
  } catch (err) { 
    console.error('쿼리 오류', err);
    // 서버 에러 발생 시 500 상태코드와 메세지 응답
    res.status(500).json({ message: '서버 오류' });
  }
});

// GET /posts/:id -> 특정 게시글 조회

router.get('/:id', async (req, res) => {
  const id  = Number(req.params.id);  // URL에서 id 받아와 숫자로 변환
  try {
    // ?(플레이스홀더) 이용 보안 ↑, id와 일치하는 게시글을 찾는 문장
    const [rows] = await db.query('SELECT * FROM posts WHERE id = ?', [id]);
    if (rows.length === 0) { // id가 없으면 해당 메세지 뜸
      return res.status(404).json({ message: '게시글을 찾을 수 없습니다'})
    } 
    // 게시글 반환
    res.json(rows[0]);
  } catch (err) {
    console.error('조회 오류', err);
    res.status(500).json({ message: '서버 오류' });
  }
});

// post/ -> 게시글 작성 
router.post('/', async (req, res) => {
  const { title, content } = req.body; // 제목, 내용이 변수의 내용이 됨.

  if (!title || !content) { // OR 연산자, title 혹은 content 둘중 하나만 없어도 참
    return res.status(400).json({ message: '제목과 내용 모두 입력하십시오.' }); 
  }

  try {
    // 게시글 title, content 삽입 
    const [result] = await db.query(
      'INSERT INTO posts (title, content) VALUES (?, ?)',
      [title, content]
    );
    // tjdrhdtl 201 created 메세지와 새 게시글 정보 반환 
    res.status(201).json({ id: result.insertId, title, content });
  } catch (err) {
    console.error('작성 오류', err);
    res.status(500).json({ message: '서버 오류 '});
  }
});

// PUT /:id -> 게시글 수정

router.put('/:id', async ( req, res ) => {
  const id = Number(req.params.id); // URL에서 id 추출
  const { title, content } = req.body; // 수정할 제목과 내용

  try {
    // 해당 id 게시글을 제목, 내용으로 업데이트
    const [result] = await db.query(
      'UPDATE posts SET title = ?, content = ? WHERE id =?',
      [title, content, id]
    );
    // 수정된 행이 없으면 404 메세지 
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: '수정할 게시글이 없습니다' });
    }
    res.json({ message: '게시글이 수정 되었습니다.' });
  } catch (err) {
    console.error('수정 오류', err);
    res.status(500).json({ message: '서버 오류' });
  }
});
  
// DELETE /:id => 게시글 삭제 
router.delete('/:id', async (req, res) => {
  const id  = Number(req.params.id);
  try {
    // 삭제 쿼리, 삭제 된 행이 없으면 해당 게시글이 없음.
    const [result] = await db.query ('DELETE FROM posts WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: '삭제할 게시글이 없습니다' });
    }
    //삭제 성공 시 204 No Content 상태 응답 (본문 x)
    res.status(204).send();
  } catch (err) {
    console.error('삭제 오류', err);
    res.status(500).json({ message: '서버 오류' });
  }
});

// 모듈로서 내 보내기 => import 해서 쓰면 됨 
module.exports = router;

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: 모든 게시글 조회
 *     responses:
 *       200:
 *         description: 게시글 목록 성공
 */
router.get('/', async (req, res) => { /* ... */ });

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: 특정 게시글 조회
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: 게시글 아이디
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 게시글 조회 성공
 *       404:
 *         description: 게시글을 찾을 수 없음
 */
router.get('/:id', async (req, res) => { /* ... */ });