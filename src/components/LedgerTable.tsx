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
import { useEffect, useState } from "react";

type Transaction = {
  id: number;
  type: "revenue" | "expense";
  date: string; // ISO string from API
  sender: string;
  recipient: string;
  category:
    | "income"
    | "saving_investment"
    | "shopping"
    | "entertainment"
    | "billing"
    | "drinking_food"
    | "vacation"
    | "other";
  amount: string; // NUMERIC comes as string from Postgres
};

const categoryLists = {
  income: "Income",
  saving_investment: "Saving & Investment",
  shopping: "Shopping",
  entertainment: "Entertainment",
  billing: "Billing",
  drinking_food: "Drinking & Food",
  vacation: "Vacation",
  other: "Other",
};

function LedgerTable() {
  const [lists, setLists] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/transactions");
        const jsonData = await response.json();
        console.log(jsonData);

        setLists(jsonData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const summation = () => {
    let sum = 0;

    for (let i = 0; i < lists.length; i++) {
      if (lists[i].type === "expense") {
        sum -= Number(lists[i].amount);
      } else {
        sum += Number(lists[i].amount);
      }
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
            <TableHead>Date</TableHead>
            <TableHead>Sender</TableHead>
            <TableHead>Recipient</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Amount (THB)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {lists.length === 0 ? (
            <TableRow>
              <TableCell className="font-medium lato text-center" colSpan={6}>
                Add new transaction
              </TableCell>
            </TableRow>
          ) : (
            lists.map((list) => {
              const displayDate = new Date(list.date).toLocaleDateString(
                "en-GB",
                {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }
              );
              const displayType =
                list.type === "expense" ? "Expense" : "Revenue";

              const displayCategory = categoryLists[list.category];
              return (
                <TableRow key={list.id}>
                  <TableCell className="font-medium lato">
                    {displayType}
                  </TableCell>
                  <TableCell className="lato">{displayDate}</TableCell>
                  <TableCell className="lato">{list.sender}</TableCell>
                  <TableCell className="lato">{list.recipient}</TableCell>
                  <TableCell className="lato">{displayCategory}</TableCell>
                  <TableCell className="text-right lato">
                    {Number(list.amount)}
                  </TableCell>
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
