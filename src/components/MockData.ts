// FetchData is just a mock name, I'll change it when migrating to Supabase

const FetchData = (
  ref: number,
  type: "Revenue" | "Expense",
  date: number,
  value: number,
  sender: string,
  recipient: string
) => {
  // Probably fetch something from supabase
  return { ref,type, date, value, sender, recipient };
};

const rows = [
  FetchData(20251214, "Expense", 12/12/2024, 120, "Wisarut D.", "LINEMAN"),
  FetchData(20251212, "Revenue", 12/12/2024, 350, "Company A", "Wisarut D."),
  FetchData(20251211, "Expense", 12/12/2024, 105, "Wisarut D.", "LINEMAN"),
  FetchData(20252214,"Expense", 12/12/2024, 95, "Wisarut D.", "LINEMAN"),
  FetchData(20254214,"Expense", 12/12/2024, 172, "Wisarut D.", "LINEMAN"),
  FetchData(20251110,"Revenue", 12/12/2024, 900, "Company A", "Wisarut D."),
  FetchData(20258125,"Expense", 12/12/2024, 100, "Wisarut D.", "LINEMAN"),
  FetchData(20252389,"Expense", 12/12/2024, 95, "Wisarut D.", "LINEMAN"),
  FetchData(20257224,"Expense", 12/12/2024, 150, "Wisarut D.", "LINEMAN"),
  FetchData(20251111,"Expense", 12/12/2024, 135, "Wisarut D.", "LINEMAN"),
  FetchData(20250294,"Revenue", 12/12/2024, 600, "Company A", "Wisarut D."),
];

export default rows;