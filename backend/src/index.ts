import express from "express";
import cors from "cors";
import router from "./transactions.route.ts";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/transactions", router);


app.listen(3000, () => {
    console.log(`server is running on port 3000`)
})