import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

function SummarySection() {
  const [totalRevenue, setTotalRevenue] = useState<number | null>(null);
  const [totalExpense, setTotalExpense] = useState<number | null>(null);
  const [netTotal, setNetTotal] = useState<number | null>(null);

  useEffect(() => {
    const initialFetch = async () => {
      try {
        const [revenueResponse, expenseResponse, netResponse] =
          await Promise.all([
            fetch("http://localhost:3000/api/transactions/summary/revenue"),
            fetch("http://localhost:3000/api/transactions/summary/expense"),
            fetch("http://localhost:3000/api/transactions/summary/net-total"),
          ]);

        const [revenueData, expenseData, netData] = await Promise.all([
          revenueResponse.json(),
          expenseResponse.json(),
          netResponse.json(),
        ]);

        setTotalRevenue(revenueData.totalRevenue);
        setTotalExpense(expenseData.totalExpense);
        setNetTotal(netData.netTotal);
      } catch (error) {
        console.error(error);
      }
    };

    initialFetch();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-10">
        <h1 className="text-white text-3xl">Summary</h1>
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-8">
            <Avatar className="w-24 h-auto">
              <AvatarImage src="/Avatar.svg" />
              <AvatarFallback>Avatar</AvatarFallback>
            </Avatar>
            <div className="flex flex-col text-xl justify-center gap-5 lato">
              <h1 className="font-bold">Wisarut</h1>
              <h2>
                {totalExpense !== null && totalRevenue !== null
                  ? `${totalRevenue - totalExpense}`
                  : "Loading..."}{" "}
                THB
              </h2>
            </div>
          </div>

          <div className="flex flex-row gap-5">
            <Card className="flex w-40 h-24 text-center justify-center">
              <CardHeader>
                <CardTitle>Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                {totalRevenue !== null ? `${totalRevenue} THB` : "Loading..."}
              </CardContent>
            </Card>
            <Card className="flex w-40 h-24 text-center justify-center">
              <CardHeader>
                <CardTitle>Total Expense</CardTitle>
              </CardHeader>
              <CardContent>
                {totalExpense !== null ? `${totalExpense} THB` : "Loading..."}
              </CardContent>
            </Card>
          </div>
        </div>
        <h3>
          Today:{" "}
          <span
            className={
              netTotal && netTotal < 0 ? "text-red-400" : "text-green-400"
            }
          >
            {netTotal} THB
          </span>
        </h3>
      </div>
    </>
  );
}

export default SummarySection;
