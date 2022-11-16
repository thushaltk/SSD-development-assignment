import logo from "./logo.svg";
import "./App.css";
import LandingPage from "./components/landing_page/landingpage";
import Adminmain from "./components/admin_staff/adminmain";
import Managerstaffmain from "./components/manager_staff/managerstaffmain";
import Workerstaffmain from "./components/worker_staff/workerstaffmain";
import Layout from "./components/layout";
import { Route, Routes } from "react-router";
import RequireAuth from "./components/requireauth";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<LandingPage />} />

        {/* Protected routes begins here */}
        <Route element={<RequireAuth allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<Adminmain />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={["manager"]} />}>
          <Route path="/manager" element={<Managerstaffmain />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={["worker"]} />}>
          <Route path="/worker" element={<Workerstaffmain />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
