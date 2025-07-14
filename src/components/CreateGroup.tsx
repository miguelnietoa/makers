import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGroups } from "../hooks/useGroup";
import { v4 as uuidv4 } from "uuid";
import { Group } from "../mock/mockGroups";

export default function CreateGroup() {
  const { addGroup } = useGroups();
  const navigate = useNavigate();
  const [totalMembers, setTotalMembers] = useState(2);

  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newGroup: Group = {
      id: uuidv4(),
      name,
      members: ["1"],
      totalMembers: totalMembers,
      status: "ongoing",
      lastActivity: new Date().toISOString().split("T")[0],
    };

    addGroup(newGroup);
    navigate("/groups");
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-2xl font-bold mb-4">Create Group</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          placeholder="Group name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <div>
          <label className="font-medium">Number of members</label>
          <input
            type="number"
            min={2}
            max={10}
            value={totalMembers}
            onChange={(e) => setTotalMembers(Number(e.target.value))}
            className="w-full border px-4 py-2 rounded mt-1"
          />
        </div>

        <button
          type="submit"
          className="bg-primary hover:bg-primary/80 text-black px-6 py-2 rounded font-medium"
        >
          Create & Share
        </button>
      </form>
    </div>
  );
}
