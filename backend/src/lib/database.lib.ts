import { createPool } from "mysql2/promise";
import { dbConfig } from "../config/database";

export const pool = createPool(dbConfig);

export const connectToDatabase = async () => {
  const connection = await pool.getConnection();
  console.log("Successfully connected to the database.");
  connection.release();
};
