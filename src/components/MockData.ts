// FetchData is just a mock name, I'll change it when migrating to Supabase

const FetchData = (
  ref: number,
  type: "Revenue" | "Expense",
  date: string,
  value: number,
  sender: string,
  recipient: string
) => {
  // Probably fetch something from supabase
  const timestamp = new Date(date).getTime();
  return { ref,type, timestamp, value, sender, recipient };
};

const rows = [
  FetchData(20251214, "Expense", "2024-12-12", 120, "Wisarut D.", "LINEMAN"),
  FetchData(20251212, "Revenue", "2024-12-12", 350, "Company A", "Wisarut D."),
  FetchData(20251211, "Expense", "2024-12-12", 105, "Wisarut D.", "LINEMAN"),
  FetchData(20252214, "Expense", "2024-12-12", 95, "Wisarut D.", "LINEMAN"),
  FetchData(20254214, "Expense", "2024-12-11", 172, "Wisarut D.", "LINEMAN"),
  FetchData(20251110, "Revenue", "2024-12-11", 900, "Company A", "Wisarut D."),
  FetchData(20258125, "Expense", "2024-12-11", 100, "Wisarut D.", "LINEMAN"),
  FetchData(20252389, "Expense", "2024-12-10", 95, "Wisarut D.", "LINEMAN"),
  FetchData(20257224, "Expense", "2024-12-10", 150, "Wisarut D.", "LINEMAN"),
  FetchData(20251111, "Expense", "2024-12-10", 135, "Wisarut D.", "LINEMAN"),
  FetchData(20250294, "Revenue", "2024-12-09", 600, "Company A", "Wisarut D."),
];

export default rows;