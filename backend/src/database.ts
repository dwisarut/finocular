import {Pool} from 'pg';
import dotenv from "dotenv";

dotenv.config();

const USER = process.env.DB_USER;
const PORT = process.env.DB_PORT;
const PASSWORD = process.env.DB_PASSWORD;

const pool = new Pool(
    {
        host: 'localhost',
        port: Number(PORT) | 5432,
        user: USER,
        password: PASSWORD,
        database: 'finocular_db'
    }
);

if (!process.env.DB_USER || !process.env.DB_PASSWORD) {
  throw new Error("Missing database environment variables");
}

export default pool;