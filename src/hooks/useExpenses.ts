import { useQuery } from "@tanstack/react-query";
import { Expense } from "../mock/mockExpenses";
import { fetchExpenses } from "../api/mockData";

export const useExpenses = () =>
  useQuery<Expense[]>({
    queryKey: ["expenses"],
    queryFn: fetchExpenses,
  });
