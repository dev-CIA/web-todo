import express from "express";
import cors from "cors";
import auth from "./src/routes/auth";
import todos from "./src/routes/todos";
import { connectToDatabase } from "./src/lib/database-connect";
import swaggerUi from "swagger-ui-express";
import specs from "./src/lib/swagger";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

// const corsOptions: cors.CorsOptions = {
//   origin: [/localhost(:[0-9]+)?$/, "http://127.0.0.1:5555"],
//   optionsSuccessStatus: 200,
// };

// app.use(cors());

const corsOptions: cors.CorsOptions = {
  origin: ["http://127.0.0.1:5500", "http://localhost:5500"], // 특정 오리진만 허용
  credentials: true, // 인증 정보를 포함한 요청 허용
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // preflight 요청 허용


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", auth);
app.use("/api/todos", todos);

const startServer = async () => {
  try {
    const connected = await connectToDatabase();

    if (!connected) {
      console.error("Unable to connect to database");
      process.exit(1);
    }

    console.log("Database connection verified");

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
  }
};

startServer();

export default app;
