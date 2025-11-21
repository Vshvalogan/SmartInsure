// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

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
    <div>
      <Navbar />
      <Routes>
        {/* User side */}
        <Route path="/" element={<UserHomePage />} />
        <Route path="/login" element={<LoginUser />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/user/policies" element={<UserPolicyList />} />
        <Route path="/user/policies/:id" element={<UserPolicyDetails />} />
        <Route
          path="/user/apply/:policyId"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <UserApplicationForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/submitted"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <UserSubmissionSuccess />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        {/* Agent side */}
        <Route path="/agent" element={<AgentLandingPage />} />
        <Route path="/agent/login" element={<AgentLogin />} />
        <Route
          path="/agent/dashboard"
          element={
            <ProtectedRoute allowedRoles={["agent"]}>
              <AgentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/agent/search"
          element={
            <ProtectedRoute allowedRoles={["agent"]}>
              <AgentSearch />
            </ProtectedRoute>
          }
        />
        <Route
          path="/agent/applications/:id"
          element={
            <ProtectedRoute allowedRoles={["agent"]}>
              <AgentApplicationDetails />
            </ProtectedRoute>
          }
        />

       
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
