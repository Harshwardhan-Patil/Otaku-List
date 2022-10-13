import React, { useEffect, useState, useRef } from "react";
import "./Row.css";
import { axiosJikanApiInstance } from "../../config";
import RowPosterDetail from "../Row Poster Details/RowPosterDetail";
import { Link } from "react-router-dom";
import { useCallback } from "react";

function Row({ title, url, sort }) {
  const [animes, setAnimes] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const rowRef = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  const handleRowRendering = useCallback((node) => {
    if (rowRef.current) rowRef.current.disconnect();

    const rowOption = {
      root: null,
      rootMargin: "10px 0px 0px 0px",
      threshold: 1.0,
    };
    rowRef.current = new IntersectionObserver((entries) => {
      const [entry] = entries;
      setIsIntersecting(entry.isIntersecting);
    }, rowOption);
    if (node) rowRef.current.observe(node);
  }, []);

  useEffect(() => {
    async function getData() {
      try {
        const response = await axiosJikanApiInstance.get(url);
        sort
          ? setAnimes(response.data.data.reverse())
          : setAnimes(response.data.data);
        setIsLoaded(true);
        return response.data.data;
      } catch (error) {
        console.log("Row Component error:" + error);
      }
    }
    !isLoaded && isIntersecting && getData();
  }, [url, sort, isIntersecting, isLoaded]);

  return (
    <div className="row" ref={handleRowRendering}>
      <h2 className="row__title">{title}</h2>
      <div className="row__posters">
        {animes.map((anime) => {
          return (
            <Link
              to={`/anime/${anime.mal_id}`}
              key={anime.mal_id}
              className="row__poster__box"
            >
              <div className="row__poster__main">
                <img
                  className="row__poster"
                  src={
                    anime?.images.webp.image_url || anime?.images.jpg.image_url
                  }
                  alt={anime?.title}
                  loading="lazy"
                />

                <RowPosterDetail anime={anime} />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default React.memo(Row);
