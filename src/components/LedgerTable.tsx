import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

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
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Transaction type</TableCell>
              <TableCell align="right">Value&nbsp;(THB)</TableCell>
              <TableCell align="right">Sender</TableCell>
              <TableCell align="right">Recipient</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.type}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.type}
                </TableCell>
                <TableCell align="right">{row.value}</TableCell>
                <TableCell align="right">{row.sender}</TableCell>
                <TableCell align="right">{row.recipient}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default LedgerTable;
