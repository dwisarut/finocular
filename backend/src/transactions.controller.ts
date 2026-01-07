import pool from "./database.ts";
import runOCR from "./ocr.ts";
import { type Request, type Response } from "express";
import fs from "fs/promises";

// CREATE (POST)
const createTransaction = async (req: Request, res: Response) => {
    try {
        const { type, date, sender, recipient, category, amount  } = req.body;
        const newTransaction = await pool.query(
            `INSERT INTO transactions
             (type, date, sender, recipient, category, amount)
             VALUES($1, $2, $3, $4, $5, $6)
             RETURNING *`,
            [type, date, sender, recipient, category, amount]
        );
        res.status(200).json(newTransaction.rows[0]);
    } catch (error) {
        if (error instanceof Error)
            res.status(500).json({message: error.message });
        else
            res.status(500).json({message: "Unknown error occur" });
    };
    
};

// OCR API
const initOCR = async (req: Request & { file?: Express.Multer.File }, res: Response) => {

    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }
        if (!req.file.mimetype.startsWith("image/")) {
            return res.status(400).json({ error: "Invalid file type" });
        }

        const result = await runOCR(req.file.path);
        await fs.unlink(req.file.path);

        res.status(200).json(result)

    } catch (error) {
        if (error instanceof Error)
            res.status(500).json({message: error.message });
        else
            res.status(500).json({message: "Unknown error occur" });
    }
}

// GET - Pagination (Offset-based)
const paginationAPI = async (req: Request, res: Response) => {

    try {
        const page = Math.max(1, Number(req.query.page as string) || 1)
        const limit = Math.min(100, Number(req.query.limit as string) || 20)
        const offset = (page - 1) * limit;

        const { rows } = await pool.query(
            `SELECT * FROM transactions
             ORDER BY date DESC, id DESC
             LIMIT $1 OFFSET $2`, 
             [limit, offset]
        );

        const countResult = await pool.query(
            `SELECT COUNT(*) FROM transactions`
        );

        const total = Number(countResult.rows[0].count)
        const totalPage = Math.ceil(total/limit);

        res.status(200).json({data: rows, pagination: {page, limit, total, totalPage, hasNext: page < totalPage, hasPrev: page > 1}})

    } catch (error) {
        if (error instanceof Error)
            res.status(500).json({message: error.message });
        else
            res.status(500).json({message: "Unknown error occur" });
    }
}

// READ (GET SINGLE TRANSACTION)
const fetchSingleTransaction = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const singleTransaction = await pool.query("SELECT * FROM transactions WHERE id = $1", [id]);

        if (singleTransaction.rows.length === 0)
            return res.status(404).json({message: `Transaction with an ID ${id} not found.`})

        res.status(200).json(singleTransaction.rows[0]);

    } catch (error) {
        if (error instanceof Error)
            res.status(500).json({message: error.message });
        else
            res.status(500).json({message: "Unknown error occur" });
    }
};

// Get total revenue
const fetchTotalRevenue = async (req: Request, res: Response) => {
    try {
        const result = await pool.query(
            `SELECT COALESCE(SUM(amount), 0) AS total
            FROM transactions
            WHERE type = $1`,
            ["revenue"]
        );

        const totalRevenue = Number(result.rows[0].total);
        res.status(200).json({totalRevenue});

    } catch (error) {
        if (error instanceof Error)
            res.status(500).json({message: error.message });
        else
            res.status(500).json({message: "Unknown error occur" });
    }
}

// Get total expense
const fetchTotalExpense = async (req: Request, res: Response) => {
    try {
        const result = await pool.query(
            `SELECT COALESCE(SUM(amount), 0) AS total
            FROM transactions
            WHERE type = $1`,
            ["expense"]
        );

        const totalExpense = Number(result.rows[0].total);
        res.status(200).json({totalExpense});

    } catch (error) {
        if (error instanceof Error)
            res.status(500).json({message: error.message });
        else
            res.status(500).json({message: "Unknown error occur" });
    }
}

// Get today transaction data
const fetchRecentTransaction = async (req: Request, res: Response) => {
    try {
        const result = await pool.query(
            `SELECT * FROM transactions
             WHERE date >= date_trunc('day' , now())
             ORDER BY date DESC`
        );

        res.status(200).json(result.rows);

    } catch (error) {
        if (error instanceof Error)
            res.status(500).json({message: error.message });
        else
            res.status(500).json({message: "Unknown error occur" });
    }
}

// Get date-revenue data

// Get date-expense data

// Get data for pie chart (category)

// UPDATE (PUT)
const updateTransaction = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { type, date, sender, recipient, category, amount  } = req.body;
        const updatedTransaction = await pool.query(
            `UPDATE transactions
             SET type = $1,
                 date = $2,
                 sender = $3, 
                 recipient = $4, 
                 category = $5, 
                 amount = $6
             WHERE id = $7
             RETURNING *`,
             [type, date, sender, recipient, category, amount, id]
        );

        if (updatedTransaction.rows.length === 0)
            return res.status(404).json({message: `Transaction with an ID ${id} not found.`})

        res.status(200).json(updatedTransaction.rows[0]);

    } catch (error) {
        if (error instanceof Error)
            res.status(500).json({message: error.message });
        else
            res.status(500).json({message: "Unknown error occur" });
    }
}

// DELETE (DELETE)
const deleteTransaction = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedTransaction = await pool.query(
            "DELETE FROM transactions WHERE id = $1", [id]
        );

        if (deletedTransaction.rowCount === 0)
            return res.status(404).json({message: `Transaction with an ID ${id} not found.`})

        res.status(200).json("Transaction deleted");

    } catch (error) {
        if (error instanceof Error)
            res.status(500).json({message: error.message });
        else
            res.status(500).json({message: "Unknown error occur" });
    }
}

export {
  createTransaction,
  initOCR,
  paginationAPI,
  fetchSingleTransaction,
  updateTransaction,
  deleteTransaction,
  fetchTotalRevenue,
  fetchTotalExpense,
  fetchRecentTransaction
};