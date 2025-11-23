// src/pages/UserHomePage.jsx
import { Link } from "react-router-dom";

export default function UserHomePage() {
  return (
    <>
    <div className="banner-center"> 
       <img 
        className="home-banner" 
        src="/SmartInsureLogo.png" 
        alt="SmartInsure Banner" 
        align = "Center"
      />
      </div>
      <h1>Welcome to SmartInsure</h1>
      <p>
        Browse insurance policies and submit applications for health, vehicle,
        home, travel and life insurance.
      </p>
      <ul>
        <li>
          <Link to="/user/policies">View policies</Link>
        </li>
        <li>
          <Link to="/login">Login as customer</Link>
        </li>
        <li>
            <Link to="/signup">Create a new account</Link>
        </li>
        <li>
          <Link to="/agent/login">Login as agent</Link>
        </li>
      </ul>
    </>
  );
}
