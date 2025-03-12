import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Todo API",
      version: "1.0.0",
      description: "A simple Todo API",
    },
    servers: [
      {
        url: "http://localhost:3010",
        description: "Development server",
      },
    ],
    components: {
      schemas: {
        LocalDateTime: {
          type: "string",
          description: "로컬 날짜 시간 (YYYY-MM-DD HH:MM:SS)",
          pattern: "^\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}$",
          example: "1986-01-28 11:38:00",
        },
        Todo: {
          type: "object",
          properties: {
            id: {
              type: "number",
            },
            title: {
              type: "string",
            },
            status: {
              type: "string",
              enum: ["not_started", "completed"],
            },
            userId: {
              type: "string",
            },
            teamId: {
              type: "string",
              optional: true,
            },
            createdAt: {
              $ref: "#/components/schemas/LocalDateTime",
            },
            updatedAt: {
              $ref: "#/components/schemas/LocalDateTime",
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.ts"],
};

const specs = swaggerJsdoc(options);

export default specs;
