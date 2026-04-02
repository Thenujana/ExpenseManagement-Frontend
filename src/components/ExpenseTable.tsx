import type { Expense } from "../types/Expense";

interface Props {
  expenses: Expense[];
  onDelete: (id: number) => void;
   onEdit: (expense: Expense) => void;
}

const ExpenseTable = ({ expenses, onDelete, onEdit }: Props) => {
  return (
    
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        
        <thead>
          <tr className="text-gray-500 text-sm border-b">
            <th className="py-2">Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {expenses.map((e) => (
            <tr key={e.id} className="border-b hover:bg-gray-50">
              
              <td className="py-3">{e.date}</td>

              <td className="font-medium">{e.description}</td>

              <td>
                <span className={`px-3 py-1 rounded-full text-sm ${getCategoryColor(e.expenseType)}`}>
                  {e.expenseType}
                </span>
              </td>

              <td className="font-semibold text-green-600">
                RS{e.costGbp}
              </td>
 <td>
                <button
  onClick={() => onEdit(e)}
  className="text-yellow-500 hover:underline"
>
  Edit
</button>
              </td>
              <td>
                <button
                  onClick={() => onDelete(e.id!)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </td>

            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
};

export default ExpenseTable;
const getCategoryColor = (type: string) => {
  switch (type) {
    case "FOOD":
      return "bg-orange-100 text-orange-600";
    case "TRAVEL":
      return "bg-blue-100 text-blue-600";
    case "other":
      return "bg-gray-200 text-gray-600";
      case"BILLS":
        return "bg-purple-100 text-purple-600";
    default:
      return "bg-gray-100 text-gray-500";
      
  }
};