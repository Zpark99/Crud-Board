const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

// Swagger 문서 옵션

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: '게시판 API',
      version: '1.0.0',
      description: '게시판 CRUD API 문서입니다.',
    },
    servers: [
      { url: 'http://localhost:3000' }, // 실제 서버 주소
    ],
  },
  apis: ['./routes/*.js'], //라우터 파일 위치 (jsdoc 주석이 들어 있는 파일)
};

const swaggerSpec = swaggerJSDoc(options);

function setupWagger(app) {
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
}

module.exports = setupWagger;