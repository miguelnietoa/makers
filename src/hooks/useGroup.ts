import { useState } from "react";
import { mockGroups } from "../mock/mockGroups";
import { Group } from "../mock/mockGroups";

export function useGroups() {
  const [groups, setGroups] = useState<Group[]>(mockGroups);

  const addGroup = (group: Group) => {
    console.log({ group });
    setGroups((prev) => [...prev, group]);
  };

  return {
    data: groups,
    isLoading: false,
    addGroup,
  };
}
