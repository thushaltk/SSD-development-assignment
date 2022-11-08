import logo from "./logo.svg";
import "./App.css";
import LandingPage from "./components/landing_page/landingpage";
import Adminmain from "./components/admin_staff/adminmain";
import Managerstaffmain from "./components/manager_staff/managerstaffmain";
import Workerstaffmain from "./components/worker_staff/workerstaffmain";

function App() {
  return (
    <div className="App">
      <LandingPage />
    </div>
  );
}

export default App;
