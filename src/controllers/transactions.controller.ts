// controllers/transaction.controller.ts
import { insertTransaction, type NewTransaction, type TransactionType } from "@/models/transactions.model";

type TransactionForm = {
  type: TransactionType;
  value: string;
  sender: string;
  recipient: string;
  desc: string;
};

export async function submitTransaction(form: TransactionForm, date: Date | undefined) {
  if (!date) throw new Error("Date required");

  const tx: NewTransaction = {
    type: form.type,
    timestamp: date.toISOString(),
    value: Number(form.value),
    sender: form.sender,
    recipient: form.recipient,
    category: form.desc,
  };

  return insertTransaction(tx);
}