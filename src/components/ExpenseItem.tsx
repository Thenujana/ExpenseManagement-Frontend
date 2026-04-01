import type { Expense } from "../types/Expense";

interface Props {
  expense: Expense;
  onDelete: (id: number) => void;
}

const ExpenseItem = ({ expense, onDelete }: Props) => {
  return (
    <div className="bg-gray-100 p-3 rounded shadow flex justify-between items-center">
      <div>
        <p className="font-bold">{expense.description}</p>
        <p>£{expense.costGbp}</p>
        <p>{expense.date}</p>
        <p className="text-sm text-gray-500">{expense.expenseType}</p>
      </div>

      <button
        onClick={() => onDelete(expense.id!)}
        className="text-red-500"
      >
        Delete
      </button>
    </div>
  );
};

export default ExpenseItem;