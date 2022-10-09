import React from "react";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import "./UserNotPresent.css";

function UserNotPresent({ setUserNotPresent }) {
  return (
    <div className="user-not-present">
      <div className="user-not-present-temp"></div>
      <div className="user-not-present-box">
        <h1>To change the state,please create the account</h1>
        <Link to="/register">Create your Account</Link>
      </div>
      <div
        className="close-box"
        onClick={() => {
          setUserNotPresent(false);
        }}
      >
        <CloseIcon />
      </div>
    </div>
  );
}

export default UserNotPresent;
