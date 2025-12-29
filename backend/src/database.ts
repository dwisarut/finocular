import { Pool } from "pg";

const pool = new Pool({
    user: "postgres",
    password: "1215",
    host: "localhost",
    port: 5432,
    database: "finocular_db"
});

export default pool;