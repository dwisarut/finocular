import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
import { Card } from "./ui/card";

type Graph = {
  period: string;
  total: number;
};

type SummaryAPI = {
  period: string;
  total: string | number;
};

function SummaryGraph() {
  const [graph, setGraph] = useState<Graph[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/transactions/summary`
        );
        const data = await response.json();

        const normalizeData = data.map((d: SummaryAPI) => ({
          period: d.period,
          total: Number(d.total),
        }));

        setGraph(normalizeData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Card className="flex w-full lg:w-60 h-30 lg:h-24 text-center justify-center items-center p-2">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={graph}>
          <XAxis dataKey="period" hide />
          <YAxis hide />
          <Area
            type="monotone"
            dataKey="total"
            dot={false}
            activeDot={false}
            isAnimationActive={false}
            strokeWidth={1}
            stroke="#FCD34D"
            fill="#FCD34D"
            fillOpacity={0.2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}

export default SummaryGraph;
