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
import { TrashIcon } from "@radix-ui/react-icons";
import EditButton from "./EditButton";
import PagePagination from "./Pagination";

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
    | "others";
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
  others: "Others",
};

function LedgerTable({
  refreshKey,
  onTransactionChange,
}: {
  refreshKey: number;
  onTransactionChange: () => void;
}) {
  const [lists, setLists] = useState<Transaction[]>([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<{
    page: number;
    limit: number;
    total: number;
    totalPage: number;
    hasNext: boolean;
    hasPrev: boolean;
  } | null>(null);

  useEffect(() => {
    const initialFetch = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/transactions?page=${page}&limit=20`
        );
        const jsonData = await response.json();

        setLists(jsonData.data);
        setPagination(jsonData.pagination);
      } catch (err) {
        console.error(err);
      }
    };

    initialFetch();
  }, [page, refreshKey]);

  const deleteTransaction = async (id: number) => {
    try {
      await fetch(`http://localhost:3000/api/transactions/${id}`, {
        method: "DELETE",
      });

      setLists(lists.filter((list) => list.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

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
            <TableHead className="w-[70px]">Type</TableHead>
            <TableHead className="w-[15px]" />
            <TableHead className="w-[15px]" />
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
              <TableCell className="font-medium lato text-center" colSpan={9}>
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
                  <TableCell>
                    <EditButton
                      transaction={list}
                      onSuccess={onTransactionChange}
                    />
                  </TableCell>
                  <TableCell>
                    <TrashIcon
                      className="hover:text-red-600 hover:cursor-pointer self-center"
                      onClick={() => {
                        deleteTransaction(list.id);
                      }}
                    />
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
            <TableCell colSpan={7}>Total</TableCell>
            <TableCell className="text-right">{summation()}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      {pagination && (
        <PagePagination
          page={pagination.page}
          totalPages={pagination.totalPage}
          hasNext={pagination.hasNext}
          hasPrev={pagination.hasPrev}
          onPageChange={setPage}
        />
      )}
    </>
  );
}

export default LedgerTable;
