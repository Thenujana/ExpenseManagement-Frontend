import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import type { Expense } from "../types/Expense";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  expenses: Expense[];
}

const ExpensePieChart = ({ expenses }: Props) => {
  
  const categoryMap: Record<string, number> = {};

  expenses.forEach((e) => {
    const type = e.expenseType;
    categoryMap[type] = (categoryMap[type] || 0) + e.costGbp;
  });

  const data = {
    labels: Object.keys(categoryMap),
    datasets: [
      {
        data: Object.values(categoryMap),
        backgroundColor: [
          "#f97316", 
          "#3b82f6", 
          "#10b981", 
          "#6b7280", 
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md">
      <h3 className="text-sm text-gray-500 mb-2">Expenses by Category</h3>
      <Pie data={data} />
    </div>
  );
};

export default ExpensePieChart;