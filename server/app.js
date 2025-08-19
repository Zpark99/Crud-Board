// 모듈 가져오기 -> from node_modules, 기능 모르겠으면 검색, 없는 경우 install 추가하기 
const express = require('express');
const cors = require('cors');
// const bodyParser = require('body-parser'); express 버전 4.16.0 부터 해당기능은 내장 되어있음, 쓸 필요 없음.

const postsRouter = require('./routes/posts');
const setupSwagger = require('./swagger');

// Express 애플리케이션 실행.
const app = express();

// 서버 위한 포트 실행.
const port = 5000;

// 모든 라우트에 대해 CORS 활성
app.use(cors());
app.use(express.json());

// 라우터 등록
// URL 경로는 '/'로 시작 해야 함.
app.use('/posts', postsRouter); 

// Swagger API 문서 제공 경로 
setupSwagger(app);

// 서버를 위 설정한 포트에서 실행
app.listen(port, () => {
  console.log(`게시판 앱이 포트 ${port}에서 실행 중 입니다.`);
  console.log(`API 문서 - http://localhost:${port}/api-docs`);
});



