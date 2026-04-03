import { render, screen, fireEvent } from "@testing-library/react";
import ExpenseTable from "../components/ExpenseTable";
import { describe, it, expect, vi } from "vitest";

const mockExpenses = [
  {
    id: 1,
    category: null,
    date: "2026-04-01",
    description: "Food",
    costGbp: 100,
    expenseType: "FOOD",
  },
];

describe("ExpenseTable", () => {
  
  it("renders expense data", () => {
    render(
      <ExpenseTable
        expenses={mockExpenses}
        onDelete={() => {}}
        onEdit={() => {}}
      />
    );

    expect(screen.getByText("Food")).toBeInTheDocument();
    expect(screen.getByText("RS100")).toBeInTheDocument();
  });

  it("calls delete function when clicked", () => {
    const mockDelete = vi.fn();

    render(
      <ExpenseTable
        expenses={mockExpenses}
        onDelete={mockDelete}
        onEdit={() => {}}
      />
    );

    fireEvent.click(screen.getByText("Delete"));

    expect(mockDelete).toHaveBeenCalledWith(1);
  });

});