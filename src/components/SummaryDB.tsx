// NOTE: This is the summary component in dashboard
// COMPONENTS: Avatar, total earn or spend, net loss, net gain, cash flow visualization
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import summation from "./Summation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import revenue from "./MockRevenue";
import expense from "./MockExpense";

function SummarySection() {
  const revSum = () => {
    let sum = 0;
    for (let i = 0; i < revenue.length; i++) {
      sum += revenue[i].value;
    }
    return sum;
  };

  const expSum = () => {
    let sum = 0;
    for (let i = 0; i < expense.length; i++) {
      sum += expense[i].value;
    }
    return sum;
  };

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
              <h1 className="font-bold">John Doe</h1>
              <h2>{summation()} THB</h2>
            </div>
          </div>

          <div className="flex flex-row gap-5">
            <Card className="flex w-40 h-24 text-center justify-center">
              <CardHeader>
                <CardTitle>Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>{revSum()} THB</CardContent>
            </Card>
            <Card className="flex w-40 h-24 text-center justify-center">
              <CardHeader>
                <CardTitle>Total Expense</CardTitle>
              </CardHeader>
              <CardContent>{expSum()} THB</CardContent>
            </Card>
          </div>
        </div>
        <h3 className="lato">Today: +240 THB</h3>
      </div>
    </>
  );
}

export default SummarySection;
