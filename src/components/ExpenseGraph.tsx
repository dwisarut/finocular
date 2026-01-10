import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Card, CardContent } from "./ui/card";

type Graph = {
  period: string;
  total: number;
};

type SummaryAPI = {
  period: string;
  total: string | number;
};

function ExpenseGraph() {
  const [graph, setGraph] = useState<Graph[]>([]);

  useEffect(() => {
    const fetchExpenseGraphData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/transactions/summary/expense-graph"
        );

        const graphData = await response.json();

        const normalizeData = graphData.map((d: SummaryAPI) => ({
          period: d.period,
          total: Number(d.total),
        }));

        setGraph(normalizeData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchExpenseGraphData();
  }, []);

  const formatDate = (value: string) => {
    return new Date(value).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl">Expense Summary</h1>
      <Card className="w-full lg:w-176">
        <CardContent className="flex w-full h-102 text-center justify-center items-center p-2">
          <ResponsiveContainer width="95%" height="100%">
            <LineChart data={graph} responsive>
              <XAxis
                dataKey="period"
                tickFormatter={formatDate}
                tickMargin={12}
                textAnchor="end"
                tick={{ dx: 35 }}
              />
              <YAxis />
              <Line
                type="monotone"
                dataKey="total"
                isAnimationActive={false}
                strokeWidth={1}
                stroke="#F87171"
                fillOpacity={0.2}
              />
              <Tooltip
                cursor={false}
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
                  color: "#F87171",
                  fontWeight: 500,
                }}
                labelFormatter={(value) =>
                  new Date(value as string).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                }
                formatter={(value: number) => [
                  `฿${value.toLocaleString()}`,
                  "Revenue",
                ]}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

export default ExpenseGraph;
