// FetchData is just a mock name, I'll change it when migrating to Supabase

const FetchData = (
  type: "Revenue" | "Expense",
  date: number,
  value: number,
  sender: string,
  recipient: string
) => {
  // Probably fetch something from supabase
  return { type, date, value, sender, recipient };
};

const rows = [
  FetchData("Expense", 12/12/2024, 120, "Wisarut D.", "LINEMAN"),
  FetchData("Revenue", 12/12/2024, 350, "Company A", "Wisarut D."),
  FetchData("Expense", 12/12/2024, 105, "Wisarut D.", "LINEMAN"),
  FetchData("Expense", 12/12/2024, 95, "Wisarut D.", "LINEMAN"),
  FetchData("Expense", 12/12/2024, 172, "Wisarut D.", "LINEMAN"),
  FetchData("Revenue", 12/12/2024, 900, "Company A", "Wisarut D."),
  FetchData("Expense", 12/12/2024, 100, "Wisarut D.", "LINEMAN"),
  FetchData("Expense", 12/12/2024, 95, "Wisarut D.", "LINEMAN"),
  FetchData("Expense", 12/12/2024, 150, "Wisarut D.", "LINEMAN"),
  FetchData("Expense", 12/12/2024, 135, "Wisarut D.", "LINEMAN"),
  FetchData("Revenue", 12/12/2024, 600, "Company A", "Wisarut D."),
];

export default rows;