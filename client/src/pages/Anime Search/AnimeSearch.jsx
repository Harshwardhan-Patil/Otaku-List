import { useState, useRef, useCallback } from "react";
import NavBar from "../../components/NavBar/NavBar";
import ClipLoader from "react-spinners/ClipLoader";
import SearchIcon from "@mui/icons-material/Search";
import useAnime from "../../hooks/useAnime";
import useAnimeSearch from "../../hooks/useAnimeSearch";
import "./AnimeSearch.css";
import "../../components/Row/Row.css";
import RowPosterDetail from "../../components/Row Poster Details/RowPosterDetail";
import { Link } from "react-router-dom";

const AnimeSearch = () => {
  const [page, setPages] = useState(1);
  const [query, setQuery] = useState("");
  const [queryPage, setQueryPage] = useState(0);
  const [isQuerying, setIsQuerying] = useState(false);
  const [animes, loading, hasMore] = useAnime(page);
  const [searchedAnimes, searchedLoading, searchedHasMore] = useAnimeSearch(
    query,
    queryPage
  );

  const observer = useRef();
  const lastAnimeOnPage = useCallback(
    (node) => {
      if (loading || searchedLoading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore && !isQuerying) {
          setPages((prev) => prev + 1);
        } else if (entries[0].isIntersecting && searchedHasMore && isQuerying) {
          setQueryPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, searchedHasMore, isQuerying, searchedLoading]
  );

  function queryAndPageNumber(e) {
    e.target.value.length > 0 ? setIsQuerying(true) : setIsQuerying(false);
    setQueryPage(1);
    setQuery(e.target.value);
  }

  const override = {
    display: "block",
    textAlign: "center",
    margin: "10px auto",
  };

  return (
    <>
      <NavBar page="animeSearch" />
      <div className="search-bar-section">
        <div className="search-bar">
          <input
            className="search-bar__input"
            type="text"
            placeholder="Search Anime..."
            onChange={queryAndPageNumber}
            value={query}
          />
          <SearchIcon
            style={{
              fontSize: "2rem",
              color: "#c3c3c3",
              backgroundColor: "#f7f7f7",
              height: "inherit",
              padding: "0 .3em",
              borderTopRightRadius: "8px",
              borderBottomRightRadius: "8px",
              border: "1px solid #000",
            }}
          />
        </div>
      </div>
      {!isQuerying && (
        <div className="anime-result-container">
          <div className="row__poster__container">
            {animes.map((anime, index) => {
              return (
                <Link
                  to={`/anime/${anime.mal_id}`}
                  ref={animes.length === index + 1 ? lastAnimeOnPage : null}
                  key={anime.mal_id}
                  className="row__poster__box anime_poster_box"
                >
                  <img
                    className="row__poster"
                    src={
                      anime?.images.webp.image_url ||
                      anime?.images.jpg.image_url
                    }
                    alt={anime?.title}
                    loading="lazy"
                  />
                  <RowPosterDetail anime={anime} />
                </Link>
              );
            })}
          </div>
          {loading && (
            <ClipLoader
              color={"#fd9330"}
              loading={loading}
              cssOverride={override}
              size={40}
            />
          )}
        </div>
      )}
      {isQuerying && (
        <div className="anime-result-container">
          <div className="row__poster__container">
            {searchedAnimes.map((anime, index) => {
              return (
                <Link
                  to={`/anime/${anime.mal_id}`}
                  ref={
                    searchedAnimes.length === index + 1 ? lastAnimeOnPage : null
                  }
                  key={anime.mal_id}
                  className="row__poster__box anime_poster_box"
                >
                  <img
                    className="row__poster"
                    src={
                      anime?.images.webp.image_url ||
                      anime?.images.jpg.image_url
                    }
                    alt={anime?.title}
                    loading="lazy"
                  />
                  <RowPosterDetail anime={anime} />
                </Link>
              );
            })}
          </div>
          {searchedLoading && (
            <ClipLoader
              color={"#fd9330"}
              loading={searchedLoading}
              cssOverride={override}
              size={40}
            />
          )}
        </div>
      )}
    </>
  );
};

export default AnimeSearch;
