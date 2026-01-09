import express from "express";
import {createTransaction,
        fetchSingleTransaction,
        updateTransaction,
        deleteTransaction,
        paginationAPI,
        initOCR,
        fetchTotalRevenue,
        fetchTotalExpense,
        fetchRecentTransaction,
        netGainAndLoss,
        fetchSummaryGraphData,
        revenueSummaryGraph,
        expenseSummaryGraph,
        donutRevenue,
        donutExpense
} from "./transactions.controller.ts"
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.get("/summary/revenue", fetchTotalRevenue);
router.get("/summary/expense", fetchTotalExpense);
router.get("/summary/recent-transaction", fetchRecentTransaction);
router.get("/summary/net-total", netGainAndLoss);
router.get("/summary/", fetchSummaryGraphData);
router.get("/summary/revenue-graph", revenueSummaryGraph);
router.get("/summary/expense-graph", expenseSummaryGraph);
router.get("/summary/revenue-donut", donutRevenue);
router.get("/summary/expense-donut", donutExpense);
router.get("/", paginationAPI);
router.get("/:id", fetchSingleTransaction);

router.post("/", createTransaction);
router.post("/ocr", upload.single("image"), initOCR);

router.put("/:id", updateTransaction);

router.delete("/:id", deleteTransaction);

export default router;