import "./App.module.css";
// import ConnectAccount from "./components/ConnectAccount.tsx";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Debugger from "./pages/Debugger.tsx";
import Groups from "./pages/Groups.tsx";
import GroupDetail from "./pages/GroupDetail.tsx";
import ExpenseDetail from "./pages/ExpenseDetail.tsx";
import CreateExpense from "./pages/CreateExpense.tsx";
import Profile from "./pages/Profile.tsx";
import Navbar from "./components/Navbar.tsx";
import CreateGroup from "./components/CreateGroup.tsx";
import ConnectAccount from "./components/ConnectAccount.tsx";
import ShareGroup from "./components/ShareGroup.tsx";
const AppLayout: React.FC = () => (
  <main className="min-h-screen flex flex-col bg-[#c6ff00]">
    <div
      className=" bg-[#c6ff00] z-50
                 flex justify-between items-center px-4 py-2"
    >
      <span className="text-2xl font-bold">Woopi</span>
      <ConnectAccount />
    </div>
    <div className="flex-1 overflow-y-auto">
      <Outlet />
    </div>
    <div className="h-[60px] border-t border-gray-200">
      <Navbar />
    </div>
    {/* <Layout.Footer>
      <span>
        © {new Date().getFullYear()} My App. Licensed under the{" "}
        <a
          href="http://www.apache.org/licenses/LICENSE-2.0"
          target="_blank"
          rel="noopener noreferrer"
        >
          Apache License, Version 2.0
        </a>
        .
      </span>
    </Layout.Footer> */}
  </main>
);

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/create-group" element={<CreateGroup />} />
        <Route path="/groups/:id" element={<GroupDetail />} />
        <Route path="/expenses/:id" element={<ExpenseDetail />} />
        <Route path="/create" element={<CreateExpense />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/groups/:id/share" element={<ShareGroup />} />
        {/* <Route path="/join/:id" element={<JoinGroup />} /> */}
        <Route path="/debug" element={<Debugger />} />
        <Route path="/debug/:contractName" element={<Debugger />} />
        <Route path="/" element={<Navigate to="/home" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
