// models/transaction.model.ts
import supabase from "@/supabase-client";

export type TransactionType = "Revenue" | "Expense";

export type Transaction = {
  type: TransactionType;
  timestamp: string;
  value: number;
  sender: string;
  recipient: string;
  category: string;
};

export async function insertTransaction(tx: Transaction) {
  return supabase.from("transactions").insert(tx);
}
