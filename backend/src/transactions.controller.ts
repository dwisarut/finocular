import pool from "./database";
import { Request, Response } from "express";

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

// READ (GET ALL TRANSACTIONS)
const fetchTransactions = async (req: Request, res: Response) => {
    try {
        const allTransactions = await pool.query(`SELECT * FROM transactions ORDER BY date DESC, id DESC`);
        res.status(200).json(allTransactions.rows);
    } catch (error) {
        if (error instanceof Error)
            res.status(500).json({message: error.message });
        else
            res.status(500).json({message: "Unknown error occur" });
    };
    
};

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

        if (updatedTransaction.rows.length)
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
  fetchTransactions,
  fetchSingleTransaction,
  updateTransaction,
  deleteTransaction
};