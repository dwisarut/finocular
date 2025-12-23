import pool from "../src/database";
import express from "express";

const app = express();
app.use(express.json());

app.get('/api/health', async (_req, res) => {
    const result = await pool.query('SELECT 1');
    res.json({ok: true, db: result.rows[0]});
});

app.listen(3000, () => {
    console.log("server is running on http://localhost:3000")
})