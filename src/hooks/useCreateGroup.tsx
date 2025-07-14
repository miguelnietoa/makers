// hooks/useCreateGroup.ts
import { useGroups } from "./useGroup";
import { Group } from "../mock/mockGroups";
import { v4 as uuidv4 } from "uuid";

export function useCreateGroup() {
  const { addGroup } = useGroups();

  const createGroup = (name: string, totalMembers: number): Group => {
    const newGroup: Group = {
      id: uuidv4(),
      name,
      members: ["1"], // el creador
      totalMembers,
      status: "ongoing",
      lastActivity: new Date().toISOString().split("T")[0],
    };

    addGroup(newGroup);
    return newGroup;
  };

  return { createGroup };
}
