import React from "react";
import LoginPage from "../login_page/loginpage";
import "./landingpage.css";

const LandingPage = () => {

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1>Welcome! Select Role</h1>
      <br />
      <br />
      <div style={{width: "100%" }}>
        <LoginPage />
      </div>
    </div>
  );
};

export default LandingPage;
