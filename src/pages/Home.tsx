import { useEffect, useState } from "react";
import type{ Expense } from "../types/Expense";
import { getExpenses, createExpense, deleteExpense } from "../service/api";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";

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
    loadExpenses(); // Refresh the list of expenses
  };

  const handleDelete = async (id: number) => {
    await deleteExpense(id);
    loadExpenses(); // Refresh the list of expenses
  };

  return (
    <div className="max-w-xl mx-auto p-5">
      <h1 className="text-2xl font-bold mb-4">Expense Manager</h1>

      <ExpenseForm onAdd={handleAdd} />
      <ExpenseList expenses={expenses} onDelete={handleDelete} />
    </div>
  );
};

export default Home;