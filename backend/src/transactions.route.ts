import express from "express";
import {createTransaction,
        fetchSingleTransaction,
        updateTransaction,
        deleteTransaction,
        paginationAPI,
        initOCR
} from "./transactions.controller.ts"
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.get("/", paginationAPI);
router.get("/:id", fetchSingleTransaction);

router.post("/", createTransaction);
router.post("/ocr", upload.single("image"), initOCR);

router.put("/:id", updateTransaction);

router.delete("/:id", deleteTransaction);

export default router;