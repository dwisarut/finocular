// controllers/transaction.controller.ts
import { insertTransaction, type Transaction } from "@/models/transactions.model";

type TransactionForm = {
  type: Transaction["type"];
  value: string;
  sender: string;
  recipient: string;
  desc: string;
};

export async function submitTransaction(form:TransactionForm, date: Date | undefined) {
  if (!date) throw new Error("Date required");

  const tx: Transaction = {
    type: form.type,
    timestamp: date.toISOString(),
    value: Number(form.value),
    sender: form.sender,
    recipient: form.recipient,
    category: form.desc,
  };

  return insertTransaction(tx);
}
