import express from "express";
import todos from "./src/routes/todos";
import { connectToDatabase } from "./src/lib/database-connect";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
