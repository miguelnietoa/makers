import { useGroups } from "../hooks/useGroup";
import GroupCard from "../components/GroupCard";
import { useNavigate } from "react-router-dom";

export default function Groups() {
  const { data: groups = [] } = useGroups();
  const navigate = useNavigate();
  console.log({ groups });

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900">👥 Groups</h1>
        <p className="text-gray-600 mt-1">Manage your group expenses</p>
      </div>

      {/* Groups List */}
      <div className="px-4 py-4">
        {groups.map((group) => (
          <GroupCard key={group.id} group={group} />
        ))}
      </div>

      {/* Add Group Button */}
      <div className="fixed bottom-24 right-4">
        <button
          onClick={() => navigate("/create-group")}
          className="bg-primary hover:bg-primary/80 text-black w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-2xl transition-colors"
        >
          ➕
        </button>
      </div>
    </div>
  );
}
