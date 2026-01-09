import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent } from "./ui/card";

const CATEGORY_COLORS: Record<
  | "income"
  | "saving_investment"
  | "shopping"
  | "entertainment"
  | "billing"
  | "drinking_food"
  | "vacation"
  | "others",
  string
> = {
  income: "#4ADE80", // green-400 → positive / money coming in
  saving_investment: "#60A5FA", // blue-400 → stability / growth
  shopping: "#F472B6", // pink-400 → discretionary spending
  entertainment: "#A78BFA", // purple-400 → fun / leisure
  billing: "#F87171", // red-400 → obligations / bills
  drinking_food: "#FBBF24", // amber-400 → food & drinks
  vacation: "#38BDF8", // sky-400 → travel / freedom
  others: "#9CA3AF", // gray-400 → neutral
};

const CATEGORY_LABELS: Record<keyof typeof CATEGORY_COLORS, string> = {
  income: "Income",
  saving_investment: "Saving & Investment",
  shopping: "Shopping",
  entertainment: "Entertainment",
  billing: "Billing",
  drinking_food: "Food & Drinks",
  vacation: "Vacation",
  others: "Others",
};

type Category = keyof typeof CATEGORY_COLORS;

type DonutChart = {
  name: Category;
  value: number;
};

type RevenueCategoryAPI = {
  category: string;
  total: string | number;
};

function DonutRevenue() {
  const [donutChart, setDonutChart] = useState<DonutChart[]>([]);

  useEffect(() => {
    const fetchDonutRevenueData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/transactions/summary/revenue-donut"
        );

        const donutData: RevenueCategoryAPI[] = await response.json();

        const normalizeData: DonutChart[] = donutData.map((d) => ({
          name: d.category as Category,
          value: Number(d.total),
        }));

        setDonutChart(normalizeData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDonutRevenueData();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl">Revenue Category</h1>
      <Card className="w-116">
        <CardContent className="flex w-full h-102 text-center justify-center items-center p-2">
          <ResponsiveContainer width="100%" height={360}>
            <PieChart>
              <Pie
                data={donutChart}
                dataKey="value"
                nameKey="name"
                innerRadius={120}
                outerRadius={150}
                cornerRadius="50%"
                paddingAngle={3}
                stroke="none"
              >
                {donutChart.map((entry) => (
                  <Cell key={entry.name} fill={CATEGORY_COLORS[entry.name]} />
                ))}
              </Pie>
              <Tooltip
                cursor={false}
                formatter={(value, name) => [
                  value,
                  CATEGORY_LABELS[name as Category],
                ]}
                contentStyle={{
                  backgroundColor: "#1A1A1A",
                  border: "1px solid #ffffff1a",
                  borderRadius: 8,
                  padding: "8px 12px",
                }}
                labelStyle={{
                  color: "hsl(var(--muted-foreground))",
                  fontSize: "12px",
                  marginBottom: 4,
                }}
                itemStyle={{
                  color: "FAFAFA",
                  fontWeight: 500,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
export default DonutRevenue;
