// src/pages/UserHomePage.jsx
import { Link } from "react-router-dom";

export default function UserHomePage() {
  return (
    <>
      {/* Banner */}
      <div className="banner-center">
        <img
          className="home-banner"
          src="/SmartInsureLogo.png"
          alt="SmartInsure Banner"
        />
      </div>

      {/* Main content */}
      <h1>Welcome to SmartInsure</h1>

      <p>
        SmartInsure is a simple insurance portal where you can explore different
        insurance plans and apply for the one that best fits your needs.
        Everything is in one place – no confusing forms, no long phone calls.
      </p>

      <p>
        We currently offer plans for <strong>health</strong>,{" "}
        <strong>vehicle</strong>, <strong>home</strong>,{" "}
        <strong>travel</strong>, and <strong>life</strong> insurance. Each
        policy page clearly shows the coverage amount, monthly premium and a
        short description so you can compare options easily.
      </p>

      <h3>How it works</h3>
      <ul>
        <li>
          <strong>1. Browse policies</strong> – See all available plans and read
          the details before you decide.
        </li>
        <li>
          <strong>2. Apply online</strong> – Answer a few simple questions and
          get your premium calculated automatically.
        </li>
        <li>
          <strong>3. Track your status</strong> – View your applications and
          see whether they are pending, approved or rejected from your
          dashboard.
        </li>
      </ul>

      <h3>Get started</h3>
      <ul>
        <li>
          <Link to="/user/policies">View all policies</Link>
        </li>
        <li>
          <Link to="/login">Login as customer</Link>
        </li>
        <li>
          <Link to="/signup">Create a new customer account</Link>
        </li>
      </ul>
    </>
  );
}
