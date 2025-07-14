import { mockExpenses } from "../mock/mockExpenses";
import { mockGroups } from "../mock/mockGroups";
import { mockUsers } from "../mock/mockUsers";

export const fetchExpenses = async () => Promise.resolve(mockExpenses);
export const fetchGroups = async () => Promise.resolve(mockGroups);
export const fetchUsers = async () => Promise.resolve(mockUsers);
