const express = require('express');
const router = express.Router();
const db = require('../db/database'); 

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: 모든 게시글 조회
 *     tags:
 *       - Posts
 *     responses:
 *       200:
 *         description: 게시글 목록을 성공적으로 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   author:
 *                     type: string
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                   views:
 *                     type: integer
 */
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM posts');
        res.json(rows);
    } catch (err) {
        console.error('쿼리 오류:', err);
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
});

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: 특정 게시글 조회
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: 게시글의 고유 아이디
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 게시글 상세 정보를 성공적으로 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 content:
 *                   type: string
 *       404:
 *         description: 게시글을 찾을 수 없음
 */
router.get('/:id', async (req, res) => {
    const id = Number(req.params.id);
    try {
        const [rows] = await db.query('SELECT * FROM posts WHERE id = ?', [id]);
        
        if (rows.length === 0) {
            return res.status(404).json({ message: '해당 게시글을 찾을 수 없습니다.' });
        } 
        
        res.json(rows[0]);
    } catch (err) {
        console.error('게시글 조회 오류:', err);
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
});

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: 새 게시글 작성
 *     tags:
 *       - Posts
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               author:
 *                 type: string
 *     responses:
 *       201:
 *         description: 게시글이 성공적으로 생성됨
 *       400:
 *         description: 제목과 내용이 누락됨
 */

router.post('/', async (req, res) => {
    const { title, content, author } = req.body;
    if (!title || !content) {
        return res.status(400).json({ message: '제목과 내용을 모두 입력해야 합니다.' });
    }

    try {
        const [result] = await db.query(
            'INSERT INTO posts (title, content, author) VALUES (?, ?, ?)',
            [title, content, author || '익명']
        );
        
        res.status(201).json({ 
            id: result.insertId, 
            title, 
            content, 
            author: author || '익명' 
        });
    } catch (err) {
        console.error('게시글 작성 오류:', err);
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
});

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: 특정 게시글 수정
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: 수정할 게시글의 아이디
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: 게시글이 성공적으로 수정됨
 *       404:
 *         description: 수정할 게시글을 찾을 수 없음
 */
router.put('/:id', async (req, res) => {
    const id = Number(req.params.id);
    const { title, content } = req.body;

    try {
        const [result] = await db.query(
            'UPDATE posts SET title = ?, content = ? WHERE id = ?',
            [title, content, id]
        );
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: '수정할 게시글을 찾을 수 없습니다.' });
        }
        
        res.json({ message: '게시글이 성공적으로 수정되었습니다.' });
    } catch (err) {
        console.error('게시글 수정 오류:', err);
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
});
    
/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: 특정 게시글 삭제
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: 삭제할 게시글의 아이디
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: 게시글이 성공적으로 삭제됨 (본문 없음)
 *       404:
 *         description: 삭제할 게시글을 찾을 수 없음
 */
router.delete('/:id', async (req, res) => {
    const id = Number(req.params.id);
    try {
        const [result] = await db.query('DELETE FROM posts WHERE id = ?', [id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: '삭제할 게시글을 찾을 수 없습니다.' });
        }
        
        res.status(204).send();
    } catch (err) {
        console.error('게시글 삭제 오류:', err);
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
});

module.exports = router;