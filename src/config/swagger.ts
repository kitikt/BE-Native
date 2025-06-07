import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Recipe API Documentation',
    version: '1.0.0',
    description: 'API docs for Recipe App',
  },
  servers: [{ url: 'http://localhost:8080' }],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ['src/routes/*.ts'], // quét toàn bộ route
};

const swaggerSpec = swaggerJSDoc(options);

export = swaggerSpec;
