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
import rows from "./MockData";
import summation from "./Summation";

function LedgerTable() {
  return (
    <>
      <Table>
        <TableCaption>A list of your recent transactions.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Type</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Sender</TableHead>
            <TableHead>Recipient</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Amount (THB)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell className="font-medium lato text-center" colSpan={6}>
                Add new transaction
              </TableCell>
            </TableRow>
          ) : (
            rows.map((rec) => {
              const displayDate = new Date(rec.timestamp).toLocaleDateString(
                "en-GB",
                {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }
              );
              return (
                <TableRow key={rec.ref}>
                  <TableCell className="font-medium lato">{rec.type}</TableCell>
                  <TableCell className="lato">{displayDate}</TableCell>
                  <TableCell className="lato">{rec.sender}</TableCell>
                  <TableCell className="lato">{rec.recipient}</TableCell>
                  <TableCell className="lato">{rec.desc}</TableCell>
                  <TableCell className="text-right lato">{rec.value}</TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5}>Total</TableCell>
            <TableCell className="text-right">{summation()}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
}

export default LedgerTable;
