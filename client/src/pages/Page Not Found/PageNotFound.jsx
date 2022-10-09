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
      {/* <iframe
        src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoPlay=1&rel=0"
        allow="autoPlay *"
        title="yt"
      ></iframe> */}
      <Youtube videoId="dQw4w9WgXcQ" opts={videoOptions} />
    </div>
  );
}

export default PageNotFound;
