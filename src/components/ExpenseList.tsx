import type { Expense } from "../types/Expense";
import ExpenseItem from "./ExpenseItem";

interface Props {
  expenses: Expense[];
  onDelete: (id: number) => void;
}

const ExpenseList = ({ expenses, onDelete }: Props) => {
  return (
    <div className="space-y-2 mt-4">
      {expenses.map((e) => (
        <ExpenseItem key={e.id} expense={e} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default ExpenseList;