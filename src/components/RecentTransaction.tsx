import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
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
    | "others";
  amount: string;
};

function TransactionSection() {
  const [recentTransaction, setRecentTransaction] = useState<
    Transaction[] | null
  >(null);

  useEffect(() => {
    const fetchRecentTransaction = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/transactions/summary/recent-transaction"
        );

        const data: Transaction[] = await response.json();
        setRecentTransaction(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecentTransaction();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl">Recent</h1>
        <Card>
          <CardContent>
            <ScrollArea className="w-full whitespace-nowrap">
              <div className="flex flex-row gap-4 p-4">
                {recentTransaction && recentTransaction.length > 0 ? (
                  recentTransaction.map((data) => {
                    const isRevenue = data.type === "revenue";

                    return (
                      <Card key={data.id} className="min-w-[200px]">
                        <CardHeader>
                          <CardTitle className="Alata">{data.type}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p
                            className={`lato ${
                              isRevenue ? " text-green-400" : "text-red-400"
                            }`}
                          >
                            {isRevenue ? "+" : "-"}
                            {data.amount} THB
                          </p>
                        </CardContent>
                      </Card>
                    );
                  })
                ) : (
                  <h1>No recent transaction</h1>
                )}
              </div>
              <ScrollBar orientation="horizontal" className="mt-6" />
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default TransactionSection;
