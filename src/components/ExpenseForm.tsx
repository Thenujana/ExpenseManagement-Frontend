import { useState } from "react";
import type { Expense } from "../types/Expense";

interface Props {
  onAdd: (expense: Expense) => void;
  editingExpense?: Expense | null;
  cancelEdit?: () => void;
}

const ExpenseForm = ({ onAdd }: Props) => {
  const [form, setForm] = useState<Expense>({
    date: "",
    costGbp: 0,
    description: "",
    expenseType: "food",
    category: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.name === "costGbp" ? Number(e.target.value) : e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.description || !form.date) {
      alert("Please fill all fields");
      return;
    }

    onAdd(form);

    setForm({
      date: "",
      costGbp: 0,
      description: "",
      expenseType: "food",
      category: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow space-y-3">
      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        className="w-full border p-2"
      />

      <input
        type="number"
        name="costGbp"
        placeholder="Cost (£)"
        value={form.costGbp}
        onChange={handleChange}
        className="w-full border p-2"
      />

      <input
        type="text"
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="w-full border p-2"
      />

      <select
        name="expenseType"
        value={form.expenseType}
        onChange={handleChange}
        className="w-full border p-2"
      >
        <option value="food">Food</option>
        <option value="travel">Travel</option>
        <option value="other">Other</option>
      </select>

      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Expense
      </button>
    </form>
  );
};

export default ExpenseForm;