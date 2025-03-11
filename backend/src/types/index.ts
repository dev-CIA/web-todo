import { type RowDataPacket } from "mysql2";

export interface Todo {
  id: number;
  title: string;
  status: "not_started" | "completed";
  userId: number;
  teamId?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface TodoQueryResult extends RowDataPacket {}
