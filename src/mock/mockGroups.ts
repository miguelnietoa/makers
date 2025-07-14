export interface Group {
  id: string;
  name: string;
  members: string[];
  totalMembers: number;
  status: "settled" | "ongoing";
  lastActivity: string;
}

export const mockGroups: Group[] = [
  {
    id: "1",
    name: "Weekend Trip",
    members: ["1", "2", "3"],
    totalMembers: 3,
    status: "ongoing",
    lastActivity: "2024-01-15",
  },
  {
    id: "2",
    name: "Roommates",
    members: ["1", "4", "5"],
    totalMembers: 3,
    status: "ongoing",
    lastActivity: "2024-01-14",
  },
  {
    id: "3",
    name: "Dinner Party",
    members: ["1", "2", "4"],
    totalMembers: 3,
    status: "settled",
    lastActivity: "2024-01-10",
  },
];
