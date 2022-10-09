import { useState, useEffect } from "react";
import DetailBtn from "../Detail Button/DetailBtn";
import BeatLoader from "react-spinners/BeatLoader";
import "./Featured.css";
import data from "../../api/data";

function Featured({ url }) {
  const [animePoster, setAnimePoster] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    function getRandomAnime() {
      setAnimePoster(data[Math.floor(0 || Math.random() * data.length)]);
      setLoading(false);
      return;
    }

    getRandomAnime();
  }, [url]);

  const background = {
    background: `linear-gradient(0deg, rgba(24, 31, 38, 1) 2%, rgba(255, 255, 255, 0.1) 30%),linear-gradient(90deg, rgba(24,31,38,1) 6%, rgba(53,60,66,.8) 19%, rgba(255,255,255,.1) 61%),url(${animePoster.img}) no-repeat ${animePoster.backgroundPosition}`,
  };

  const override = {
    display: "block",
    textAlign: "center",
    margin: "10px auto",
  };

  return loading ? (
    <BeatLoader
      color={"#fd9330"}
      loading={loading}
      cssOverride={override}
      size={30}
    />
  ) : (
    <header>
      <div style={background} className="featured">
        <div className="poster">
          <h1 className="poster__title">{animePoster.name}</h1>
          <p className="poster__brief">
            {animePoster.description.substring(0, 200) + "..."}
          </p>
          <DetailBtn key={animePoster.id} id={animePoster.id} />
        </div>
      </div>
    </header>
  );
}

export default Featured;
