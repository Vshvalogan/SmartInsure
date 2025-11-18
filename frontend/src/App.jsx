import { Route, Routes } from "react-router-dom";

import UserHomePage from "./pages/UserHomePage";
import UserPolicyList from "./pages/UserPolicyList";
import UserPolicyDetails from "./pages/UserPolicyDetails";
import UserApplicationForm from "./pages/UserApplicationForm";
import UserSubmissionSuccess from "./pages/UserSubmissionSuccess";
import UserDashboard from "./pages/UserDashboard";
import LoginUser from "./pages/LoginUser";

import AgentLandingPage from "./pages/AgentLandingPage";
import AgentLogin from "./pages/AgentLogin";
import AgentDashboard from "./pages/AgentDashboard";
import AgentSearch from "./pages/AgentSearch";
import AgentApplicationDetails from "./pages/AgentApplicationDetails";

import Navbar from "./components/Navbar";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* USER ROUTES */}
        <Route path="/" element={<UserHomePage />} />
        <Route path="/policies" element={<UserPolicyList />} />
        <Route path="/policy/:id" element={<UserPolicyDetails />} />
        <Route path="/apply/:id" element={<UserApplicationForm />} />
        <Route path="/submitted" element={<UserSubmissionSuccess />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/login" element={<LoginUser />} />

        {/* AGENT ROUTES */}
        <Route path="/agent" element={<AgentLandingPage />} />
        <Route path="/agent/login" element={<AgentLogin />} />
        <Route path="/agent/dashboard" element={<AgentDashboard />} />
        <Route path="/agent/search" element={<AgentSearch />} />
        <Route
          path="/agent/application/:id"
          element={<AgentApplicationDetails />}
        />

        {/* FALLBACK */}
        <Route path="*" element={<h2>Page Not Found</h2>} />
      </Routes>
    </>
  );
}
