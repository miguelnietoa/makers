// import { Button, Icon, Layout } from "@stellar/design-system";
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
const NAV_HEIGHT = 60;
const AppLayout: React.FC = () => (
  <main className="min-h-screen flex flex-col bg-white">
    {/* <Layout.Header
      projectId="My App"
      projectTitle="My App"
      contentRight={
        <>
          <nav>
            <NavLink
              to="/debug"
              style={{
                textDecoration: "none",
              }}
            >
              {({ isActive }) => (
                <Button
                  variant="tertiary"
                  size="md"
                  onClick={() => (window.location.href = "/debug")}
                  disabled={isActive}
                >
                  <Icon.Code02 size="md" />
                  Debugger
                </Button>
              )}
            </NavLink>
          </nav>
          <ConnectAccount />
        </>
      }
    /> */}
    <div
      className="flex-1 overflow-y-auto"
      style={{ paddingBottom: NAV_HEIGHT }}
    >
      <Outlet />
    </div>
    <Navbar />
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
        <Route path="/debug" element={<Debugger />} />
        <Route path="/debug/:contractName" element={<Debugger />} />
        <Route path="/" element={<Navigate to="/home" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
