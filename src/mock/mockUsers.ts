export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export const mockUsers: User[] = [
  {
    id: "1",
    name: "You",
    email: "you@example.com",
  },
  {
    id: "2",
    name: "Alice Johnson",
    email: "alice@example.com",
  },
  {
    id: "3",
    name: "Bob Smith",
    email: "bob@example.com",
  },
  {
    id: "4",
    name: "Charlie Brown",
    email: "charlie@example.com",
  },
  {
    id: "5",
    name: "Diana Prince",
    email: "diana@example.com",
  },
];

export const currentUser = mockUsers[0];
