import { createPool } from "mysql2/promise";
import { dbConfig } from "../config/database";

const pool = createPool(dbConfig);

export const connectToDatabase = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Successfully connected to the database.");
    connection.release();
    return true;
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    return false;
  }
};
