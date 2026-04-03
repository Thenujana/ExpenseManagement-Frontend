import { render, screen, fireEvent } from "@testing-library/react";
import ExpenseForm from "../components/ExpenseForm";
import { describe, it, expect, vi } from "vitest";

describe("ExpenseForm", () => {
  
  it("renders form inputs", () => {
    render(<ExpenseForm onAdd={() => {}} />);

    expect(screen.getByPlaceholderText("Description")).toBeInTheDocument();
  });

  it("submits form data", () => {
    const mockAdd = vi.fn();

    render(<ExpenseForm onAdd={mockAdd} />);

    fireEvent.change(screen.getByPlaceholderText("Description"), {
      target: { value: "Test Expense" },
    });

    fireEvent.click(screen.getByText("Add Expense"));

    expect(mockAdd).toHaveBeenCalled();
  });

});