const mysql = require('mysql2'); // MySQL <---> Node.js 연결해주는 라이브 러리 (안쓰면 MySQL의 의미가 없음)
const dotenv = require('dotenv'); // .env 값을 env파일에서만 관리하게 해 줌, 
dotenv.config(); // .env 파일에 있는 내용을 읽어서 process.env 객체에(변수) 넣음 -> process.env.DB_USER 하면 "root" 가 나옴

const pool = mysql.createPool({ // CreateConnection -> CreatePool
  host: process.env.DB_HOST, // 정 
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME, // 보
  waitForConnections: true, // 커넥션이 없으면 대기 
  connectionLimit: 10, // 커넥션 최대 수
  queueLimit: 0 // 대기열 제한 (0 = 무제한)
});

pool.getConnection((err, connection) => { // err는 에러 정보, connection은 출력
  if (err) {
    console.error('MySQL 연결 실패:', err);
    return;
  }
  console.log('MySQL 연결 성공');
  connection.release(); // 연결 반환 
});

// pool.promise()로 async/await 사용 가능하게 변환 
const db = pool.promise();

module.exports = db;