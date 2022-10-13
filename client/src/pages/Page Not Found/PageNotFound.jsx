import React from "react";
import "./PageNotFound.css";
import Youtube from "react-youtube";

function PageNotFound() {
  const videoOptions = {
    playerVars: {
      autoplay: 1,
      controls: 1,
      rel: 1,
      showinfo: 0,
      mute: 1,
      loop: 1,
    },
  };
  return (
    <div className="page-not-found">
      <Youtube videoId="dQw4w9WgXcQ" opts={videoOptions} />
    </div>
  );
}

export default PageNotFound;
