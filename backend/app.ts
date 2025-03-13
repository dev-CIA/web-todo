import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./src/routes/auth.routes";
import todosRouter from "./src/routes/todos.routes";
import { connectToDatabase } from "./src/lib/database.lib";
import swaggerUi from "swagger-ui-express";
import specs from "./src/lib/swagger";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

const corsOptions: cors.CorsOptions = {
  origin: [/localhost(:[0-9]+)?$/, "http://127.0.0.1:5555"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(cookieParser());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);
app.use("/api/todos", todosRouter);

const startServer = async () => {
  try {
    await connectToDatabase();
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
