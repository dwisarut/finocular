// NOTE: This is the recent transaction history
// COMPONENTS: Cards
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import rows from "./MockData";

function TransactionSection() {
  return (
    <>
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl">Recent</h1>
        <Card>
          <CardContent>
            <ScrollArea className="w-full whitespace-nowrap">
              <div className="flex flex-row gap-4 p-4">
                {rows.map((data) => {
                  const isRevenue = data.type === "Revenue";

                  if (isRevenue)
                    return (
                      <Card key={data.ref} className="min-w-[200px]">
                        <CardHeader>
                          <CardTitle className="Alata">{data.type}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="lato text-green-400">
                            + {data.value} THB
                          </p>
                        </CardContent>
                      </Card>
                    );
                  else
                    return (
                      <Card key={data.ref} className="min-w-[200px]">
                        <CardHeader>
                          <CardTitle className="Alata">{data.type}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="lato text-red-400">
                            - {data.value} THB
                          </p>
                        </CardContent>
                      </Card>
                    );
                })}
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
