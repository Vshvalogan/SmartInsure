// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";

import UserHomePage from "./pages/UserHomePage.jsx";
import LoginUser from "./pages/LoginUser.jsx";
import UserPolicyList from "./pages/UserPolicyList.jsx";
import UserPolicyDetails from "./pages/UserPolicyDetails.jsx";
import UserApplicationForm from "./pages/UserApplicationForm.jsx";
import UserSubmissionSuccess from "./pages/UserSubmissionSuccess.jsx";
import UserDashboard from "./pages/UserDashboard.jsx";
import UserSignup from "./pages/UserSignup.jsx";

import AgentLandingPage from "./pages/AgentLandingPage.jsx";
import AgentLogin from "./pages/AgentLogin.jsx";
import AgentDashboard from "./pages/AgentDashboard.jsx";
import AgentSearch from "./pages/AgentSearch.jsx";
import AgentApplicationDetails from "./pages/AgentApplicationDetails.jsx";

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <Routes>
        <Route path="/" element={<UserHomePage />} />
        <Route path="/login" element={<LoginUser />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/user/policies" element={<UserPolicyList />} />
        <Route path="/user/policies/:id" element={<UserPolicyDetails />} />
        <Route path="/user/policies/apply/:policyId" element={<UserApplicationForm />} />
        <Route path="/user/submitted" element={<UserSubmissionSuccess />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/agent" element={<AgentLandingPage />} />
        <Route path="/agent/login" element={<AgentLogin />} />
        <Route path="/agent/dashboard" element={<AgentDashboard />} />
        <Route path="/agent/search" element={<AgentSearch />} />
        <Route
          path="/agent/applications/:id"
          element={<AgentApplicationDetails />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
