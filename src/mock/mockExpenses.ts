export interface Expense {
  id: string;
  title: string;
  description: string;
  amount: number;
  paidBy: string;
  groupId: string;
  participants: string[];
  date: string;
  status: "you_owe" | "you_are_owed" | "not_involved" | "settled";
  yourShare: number;
}

export const mockExpenses: Expense[] = [
  {
    id: "1",
    title: "Hotel Booking",
    description: "Mountain Resort for weekend",
    amount: 300.0,
    paidBy: "2",
    groupId: "1",
    participants: ["1", "2", "3"],
    date: "2024-01-15",
    status: "you_owe",
    yourShare: 100.0,
  },
  {
    id: "2",
    title: "Grocery Shopping",
    description: "Weekly groceries",
    amount: 120.0,
    paidBy: "1",
    groupId: "2",
    participants: ["1", "4", "5"],
    date: "2024-01-14",
    status: "you_are_owed",
    yourShare: 40.0,
  },
  {
    id: "3",
    title: "Gas Station",
    description: "Road trip fuel",
    amount: 80.0,
    paidBy: "3",
    groupId: "1",
    participants: ["1", "2", "3"],
    date: "2024-01-13",
    status: "you_owe",
    yourShare: 26.67,
  },
  {
    id: "4",
    title: "Restaurant Bill",
    description: "Italian dinner",
    amount: 180.0,
    paidBy: "1",
    groupId: "3",
    participants: ["1", "2", "4"],
    date: "2024-01-10",
    status: "settled",
    yourShare: 60.0,
  },
];
