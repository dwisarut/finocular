import express from "express";
import {createTransaction,
        fetchSingleTransaction,
        updateTransaction,
        deleteTransaction,
        paginationAPI
} from "./transactions.controller.ts"

const router = express.Router();

router.get("/", paginationAPI);
router.get("/", fetchSingleTransaction);

router.post("/", createTransaction);

router.put("/:id", updateTransaction);

router.delete("/:id", deleteTransaction);

export default router;