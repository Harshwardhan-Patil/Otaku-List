import React from "react";
import { Link } from "react-router-dom";
import "./DetailBtn.css";

function DetailBtn({ id }) {
  return (
    <Link to={`/anime/${id}`} className="detail-btn">
      Details
    </Link>
  );
}

export default DetailBtn;
