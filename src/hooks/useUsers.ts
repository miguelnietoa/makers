import { useQuery } from "@tanstack/react-query";
import { User } from "../mock/mockUsers";
import { fetchUsers } from "../api/mockData";

export const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
