import { Link, useLocation } from "react-router-dom";
import { FiHome, FiUsers, FiPlusCircle, FiUser } from "react-icons/fi";

export default function Navbar() {
  const { pathname } = useLocation();

  const navItems = [
    { path: "/", icon: FiHome, label: "Home" },
    { path: "/groups", icon: FiUsers, label: "Groups" },
    { path: "/create", icon: FiPlusCircle, label: "Add" },
    { path: "/profile", icon: FiUser, label: "Profile" },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 h-[72px] bg-white shadow-t-lg border-t border-gray-200 z-50">
      <ul className="flex justify-around items-center h-full max-w-md mx-auto">
        {navItems.map(({ path, icon: Icon, label }) => {
          const active = pathname === path;

          return (
            <li key={path}>
              <Link
                to={path}
                className={`flex flex-col items-center px-4 py-2 rounded-lg transition-all duration-200 ${
                  active
                    ? "bg-primary text-primary shadow-md"
                    : "text-gray-500 hover:text-primary"
                }`}
              >
                <Icon className={`text-2xl mb-0.5 ${active && "scale-110"}`} />
                <span className="text-[11px] font-medium">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
