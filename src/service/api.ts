import axios from "axios";
import type{ Expense } from "../types/Expense";

const BASE_URL = "http://localhost:8080/expense";

export const getExpenses = async (): Promise<Expense[]> => {
  const res = await axios.get(`${BASE_URL}/get-all`);
  return res.data;
};

export const createExpense = async (expense: Expense): Promise<void> => {
  await axios.post(`${BASE_URL}/add`, expense);
};

export const deleteExpense = async (id: number) => {
  await axios.delete(`${BASE_URL}/delete/${id}`);
};
export const updateExpense = async (expense: Expense) => {
  await axios.put(`${BASE_URL}/update`, expense);
};