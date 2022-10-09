import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./StatusBtn.css";

function StatusBtn({ title, active, link, sendTitle }) {
  const activeStyle = {
    color: "#fd9330",
    borderBottom: window.innerWidth >= 550 && "3px solid #fd9330",
    marginBottom: "-2px",
  };
  useEffect(() => {
    title === active && sendTitle(title);
  }, [title, active]);
  return (
    <>
      <Link
        to={`/yourList/${link}`}
        style={title === active ? activeStyle : { color: "#fff" }}
        className="status-btn"
      >
        <h2>{title}</h2>
      </Link>
    </>
  );
}

export default StatusBtn;
