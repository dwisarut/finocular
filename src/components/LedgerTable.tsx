import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
  const summation = () => {
    let sum = 0;
    for (let i = 0; i < rows.length; i++) {
      sum += rows[i].value;
    }
    return sum;
  };
  return (
    <>
      <Table>
        <TableCaption>A list of your recent transactions.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Type</TableHead>
            <TableHead>Sender</TableHead>
            <TableHead>Recipient</TableHead>
            <TableHead className="text-right">Amount (THB)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((rec) => (
            <TableRow key={rec.type}>
              <TableCell className="font-medium">{rec.type}</TableCell>
              <TableCell>{rec.sender}</TableCell>
              <TableCell>{rec.recipient}</TableCell>
              <TableCell className="text-right">{rec.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">{summation()}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
};

export default LedgerTable;
