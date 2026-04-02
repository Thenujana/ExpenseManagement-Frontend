
import { useEffect, useState } from "react";
import type { Expense } from "../types/Expense";
import { getExpenses, createExpense, deleteExpense ,updateExpense} from "../service/api";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseTable from "../components/ExpenseTable";

const Home = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    try {
      const data = await getExpenses();
      setExpenses(data);
    } catch (error) {
      console.error("Error fetching expenses", error);
    }
  };

  const handleAdd = async (expense: Expense) => {
    await createExpense(expense);
    loadExpenses();
  };

  const handleDelete = async (id: number) => {
    await deleteExpense(id);
    loadExpenses();
  };

  const handleEdit = async (expense: Expense) => {
    await updateExpense(expense);
    loadExpenses();
  };


  const total = expenses.reduce((a, b) => a + b.costGbp, 0);

  const categoryMap: Record<string, number> = {};
  expenses.forEach((e) => {
    categoryMap[e.category] = (categoryMap[e.category] || 0) + e.costGbp;
  });

  const topCategory =
    Object.entries(categoryMap).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-8">
      
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">
            Expense Tracker
          </h1>
          <p className="text-gray-500 text-sm">
            Track, analyze, and control your spending
          </p>
        </div>

        <div className="w-11 h-11 bg-indigo-500 text-white font-semibold rounded-full flex items-center justify-center shadow">
          C
        </div>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">


  <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white p-5 rounded-2xl shadow-md hover:scale-105 transition">
    <p className="text-sm opacity-90">Total Expenses</p>
    <h2 className="text-2xl font-bold mt-1">
      RS{total.toFixed(2)}
    </h2>
  </div>


  <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-5 rounded-2xl shadow-md hover:scale-105 transition">
    <p className="text-sm opacity-90">Entries</p>
    <h2 className="text-2xl font-bold mt-1">
      {expenses.length}
    </h2>
  </div>

  
  <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white p-5 rounded-2xl shadow-md hover:scale-105 transition">
    <p className="text-sm opacity-90">Top Category</p>
    <h2 className="text-2xl font-bold mt-1">
      {topCategory}
    </h2>
  </div>

</div>

      
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Add New Expense
        </h3>
        <ExpenseForm onAdd={handleAdd} />
      </div>

      
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Recent Expenses
        </h3>
        <ExpenseTable
         expenses={expenses} onDelete={handleDelete} onEdit={handleEdit} />
      </div>
    </div>
  );
};

export default Home;