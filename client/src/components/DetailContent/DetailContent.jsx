import React from "react";
import "./DetailContent.css";

function DetailContent({ title, contents }) {
  return (
    contents &&
    contents.length !== 0 && (
      <div className="detail-content inline">
        <strong>{title} :</strong>
        <div className="detail-contents">
          {contents.map((content) => (
            <p>{content.name}</p>
          ))}
        </div>
      </div>
    )
  );
}

export default DetailContent;
