import { useEffect, useState } from "react";
import type { Expense } from "../types/Expense";
import {
  getExpenses,
  createExpense,
  deleteExpense,
  updateExpense,
} from "../service/api";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseTable from "../components/ExpenseTable";
import ExpensePieChart from "../components/ExpensePieChart";

const Home = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    try {
      const data = await getExpenses();
      setExpenses(data || []);
    } catch (error) {
      console.error("Error fetching expenses", error);
    }
  };

  const handleAddOrUpdate = async (expense: Expense) => {
    if (editingExpense && editingExpense.id !== undefined) {
      await updateExpense({ ...expense, id: editingExpense.id });
      setEditingExpense(null);
    } else {
      await createExpense(expense);
    }
    loadExpenses();
  };

  const handleDelete = async (id: number) => {
    await deleteExpense(id);
    loadExpenses();
  };

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense);
  };

  const total = expenses.reduce((a, b) => a + b.costGbp, 0);

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-8">
      
      {/* HEADER */}
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

      {/* DASHBOARD ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

        {/* LEFT SIDE - CARDS */}
        <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white p-5 rounded-2xl shadow-md">
            <p className="text-sm opacity-90">Total Expenses</p>
            <h2 className="text-2xl font-bold mt-1">
              RS {total.toFixed(2)}
            </h2>
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-5 rounded-2xl shadow-md">
            <p className="text-sm opacity-90">Entries</p>
            <h2 className="text-2xl font-bold mt-1">
              {expenses.length}
            </h2>
          </div>

        </div>

        {/* RIGHT SIDE - CHART */}
        <div className="bg-white p-4 rounded-2xl shadow-md flex items-center justify-center">
          <ExpensePieChart expenses={expenses} />
        </div>

      </div>

      {/* FORM */}
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          {editingExpense ? "Edit Expense" : "Add New Expense"}
        </h3>

        <ExpenseForm
          onAdd={handleAddOrUpdate}
          editingExpense={editingExpense}
          cancelEdit={() => setEditingExpense(null)}
        />
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Recent Expenses
        </h3>

        <ExpenseTable
          expenses={expenses}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>
    </div>
  );
};

export default Home;