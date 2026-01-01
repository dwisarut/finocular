import {z} from "zod";

export const transactionSchema = z.object({
    type: z.enum(["revenue", "expense"], {
        error: "Type is required",
    }),
    date: z.date({
        error: "Date is required"
    }),
    sender: z.string().min(1, "Sender is required"),
    recipient: z.string().min(1, "Recipient is required"),
    category: z.enum(["income", "saving_investment", "shopping", "entertainment", "billing", "drinking_food", "vacation", "others"], {
        error: "Category is required"
    }),
    amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
        message: "Amount must be a number"
    })
})