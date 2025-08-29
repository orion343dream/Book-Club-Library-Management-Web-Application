import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface MonthlyLendingData {
  month: string;
  count: number;
}

interface DashboardChartsProps {
  monthlyLending: MonthlyLendingData[];
}

const DashboardCharts: React.FC<DashboardChartsProps> = ({ monthlyLending }) => {
  return (
      <div className="bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 rounded-xl shadow-2xl p-6 mb-8 text-white">
        <h2 className="text-lg font-semibold text-indigo-300 mb-4">
          Monthly Lending Overview
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyLending}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.15)" />
            <XAxis
                dataKey="month"
                stroke="rgba(255,255,255,0.8)"
                tick={{ fill: "rgba(255,255,255,0.8)" }}
            />
            <YAxis
                allowDecimals={false}
                stroke="rgba(255,255,255,0.8)"
                tick={{ fill: "rgba(255,255,255,0.8)" }}
            />
            <Tooltip
                contentStyle={{ backgroundColor: "#3730A3", borderRadius: "8px", border: "none" }}
                itemStyle={{ color: "#A5B4FC" }}
                labelStyle={{ color: "#C7D2FE", fontWeight: "bold" }}
            />
            <Line
                type="monotone"
                dataKey="count"
                stroke="url(#colorLine)"
                strokeWidth={3}
                dot={{ stroke: "#8B5CF6", strokeWidth: 3, fill: "white" }}
                activeDot={{ r: 6 }}
            />
            <defs>
              <linearGradient id="colorLine" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#A78BFA" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#818CF8" stopOpacity={0.2} />
              </linearGradient>
            </defs>
          </LineChart>
        </ResponsiveContainer>
      </div>
  );
};

export default DashboardCharts;
