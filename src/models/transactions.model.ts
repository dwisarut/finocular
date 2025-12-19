// models/transaction.model.ts
import supabase from "@/supabase-client";

export type TransactionType = "Revenue" | "Expense";

export type Transaction = {
  ref: string;
  type: TransactionType;
  timestamp: string;
  value: number;
  sender: string;
  recipient: string;
  category: string;
  created_at: string;
};

export type NewTransaction = Omit<Transaction, "ref" | "created_at">;

export async function insertTransaction(tx: NewTransaction) {
  return supabase.from("transactions").insert(tx).select().single();
}
