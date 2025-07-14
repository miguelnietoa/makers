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

    const id = uuidv4();
    const newGroup: Group = {
      id,
      name,
      members: ["1"],
      totalMembers,
      status: "ongoing",
      lastActivity: new Date().toISOString().split("T")[0],
    };

    addGroup(newGroup);
    navigate(`/groups/${id}/share`); // ⬅ redirección al share page
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f7f7f7] to-white px-6 py-10 flex flex-col items-center">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Create a New Group
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Group Name
            </label>
            <input
              type="text"
              placeholder="e.g. Trip to Mexico"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Number of Members
            </label>
            <input
              type="number"
              min={2}
              max={10}
              value={totalMembers}
              onChange={(e) => setTotalMembers(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary border border-primary text-black font-semibold py-3 rounded-lg hover:bg-primary/90 transition"
          >
            Create & Share Link
          </button>
        </form>
      </div>
    </div>
  );
}
