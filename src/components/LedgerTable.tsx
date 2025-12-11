// PLACEHOLDER

// interface TransactionData {
//   type: "Revenue" | "Expense";
//   value: number;
//   sender: string;
//   recipient: string;
// }

const FetchData = (
  type: "Revenue" | "Expense",
  value: number,
  sender: string,
  recipient: string
) => {
  // Probably fetch something from supabase
  return { type, value, sender, recipient };
};

const rows = [
  FetchData("Expense", 120, "Wisarut Donsri", "LINEMAN"),
  FetchData("Revenue", 350, "Company A", "Wisarut Donsri"),
  FetchData("Expense", 105, "Wisarut Donsri", "LINEMAN"),
];

const LedgerTable = () => {
  return <></>;
};

export default LedgerTable;
