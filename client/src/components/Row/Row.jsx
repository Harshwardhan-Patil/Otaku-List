import React, { useEffect, useState, useRef } from "react";
import "./Row.css";
import axios from "../../api/axios";
import RowPosterDetail from "../Row Poster Details/RowPosterDetail";
import { Link } from "react-router-dom";

function Row({ title, url, sort, isCharacter }) {
  const [animes, setAnimes] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const rowRef = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  const rowIntersectionObserver = (entries) => {
    const [entry] = entries;
    setIsIntersecting(entry.isIntersecting);
  };

  useEffect(() => {
    const rowOption = {
      root: null,
      rootMargin: "100px 0px 0px 0px",
      threshold: 1.0,
    };
    const rowObserver = new IntersectionObserver(
      rowIntersectionObserver,
      rowOption
    );
    if (rowRef.current) rowObserver.observe(rowRef.current);

    return () => {
      if (rowRef.current) rowObserver.unobserve(rowRef.current);
    };
  }, []);
  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(url);
        sort
          ? setAnimes(response.data.data.reverse())
          : setAnimes(response.data.data);
        setIsLoaded(true);
        return response.data.data;
      } catch (error) {
        console.log("error:" + error);
      }
    }
    !isLoaded && isIntersecting && getData();
  }, [url, sort, isIntersecting, isLoaded]);

  return (
    <div className="row" ref={rowRef}>
      <h2 className="row__title">{title}</h2>
      <div className="row__posters">
        {animes.map((anime) => {
          return (
            <Link
              to={`/anime/${anime.mal_id}`}
              key={anime.mal_id}
              className="row__poster__box"
            >
              <img
                className="row__poster"
                src={
                  anime?.images.webp.image_url || anime?.images.jpg.image_url
                }
                alt={anime?.title}
                loading="lazy"
              />
              <RowPosterDetail anime={anime} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default React.memo(Row);
