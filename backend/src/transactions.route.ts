import express from "express";
import {createTransaction,
        fetchTransactions,
        fetchSingleTransaction,
        updateTransaction,
        deleteTransaction
} from "./transactions.controller"

const router = express.Router();

router.get("/", fetchTransactions);
router.get("/", fetchSingleTransaction);

router.post("/", createTransaction);

router.put("/:id", updateTransaction);

router.delete("/:id", deleteTransaction);

export default router;