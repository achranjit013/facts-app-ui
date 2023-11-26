import "./App.css";
import { Routes, Route } from "react-router-dom";
import { DashboardPage } from "./pages/DashboardPage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { UserDashboardPage } from "./pages/UserDashboardPage";

function App() {
  return (
    <div className="wrapper">
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/user-dashboard" element={<DashboardPage />} />
        {/* <Route path="/user-dashboard" element={<UserDashboardPage />} /> */}
      </Routes>
    </div>
  );
}

export default App;
