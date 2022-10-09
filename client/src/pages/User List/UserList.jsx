import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import NavBar from "../../components/NavBar/NavBar";
import StatusBtn from "../../components/Status button/StatusBtn";
import DetailBtn from "../../components/Detail Button/DetailBtn";
import "../../components/Row Poster Details/RowPosterDetail.css";
import "../../components/Detail Button/DetailBtn.css";
import "../../components/Row/Row.css";
import "../Anime Search/AnimeSearch.css";
import "./UserList.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const UserList = ({ title }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [animes, setAnimes] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const background = {
    background: `linear-gradient(0deg, rgba(24,31,38,1) 10%, rgba(39,46,53,.6) 29%, rgba(53,60,66,.3) 48%),url(${
      process.env.PUBLIC_URL + "/images/animeListBG.png"
    }) no-repeat center center`,
  };

  useEffect(() => {
    window.innerWidth <= 550 && setIsMobile(true);
  }, []);

  async function fetchData(url) {
    setLoading(true);
    if (currentUser) {
      const response = await axios.get(url, {
        headers: {
          token: `Bearer ${currentUser.token}`,
        },
      });
      setAnimes(response.data);
      setLoading(false);
    }
  }

  async function getAnime(title) {
    if (currentUser) {
      switch (title) {
        case "All Anime":
          fetchData(`/animeList/${currentUser?._id}`);
          break;
        case "Currently Watching":
          fetchData(`/animeList/state/${currentUser?._id}?state=${title}`);
          break;
        case "Completed":
          fetchData(`/animeList/state/${currentUser?._id}?state=${title}`);
          break;
        case "Plan To Watch":
          fetchData(`/animeList/state/${currentUser?._id}?state=${title}`);
          break;
        default:
          break;
      }
    }
  }

  const override = {
    display: "block",
    textAlign: "center",
    margin: "10px auto",
  };

  return (
    <>
      <NavBar page="userList" />
      <div className="user-list">
        <div style={background} className="user-list__poster">
          <div className="user-list__poster__container">
            <StatusBtn
              title="All Anime"
              active={title}
              link="allAnime"
              sendTitle={getAnime}
            />
            <StatusBtn
              title="Currently Watching"
              active={title}
              link="currentlyWatching"
              sendTitle={getAnime}
            />
            <StatusBtn
              title="Completed"
              active={title}
              link="completed"
              sendTitle={getAnime}
            />
            <StatusBtn
              title="Plan To Watch"
              active={title}
              link="planToWatch"
              sendTitle={getAnime}
            />
          </div>
        </div>
        <div className="user-list__main">
          {!currentUser ? (
            <div className="go_to_login_page">
              <h1>User is not Logged in</h1>
              <Link to={"/login"}>Sign In</Link>
            </div>
          ) : loading ? (
            <ClipLoader
              color={"#fd9330"}
              loading={loading}
              cssOverride={override}
              size={30}
            />
          ) : (
            <div className="user-list__detail">
              <div className="row__poster__container">
                {animes?.map((anime) => {
                  return (
                    <Link
                      to={`/anime/${anime.animeMalId}`}
                      key={anime?.animeMalId}
                      className="row__poster__box anime_poster_box"
                    >
                      <img
                        className="row__poster"
                        src={anime?.animePoster}
                        alt={anime?.animeName}
                        loading="lazy"
                      />
                      {!isMobile ? (
                        <div className="row__poster__details user-list__row__poster__detail">
                          <h1 className="row__poster__details__title">
                            {anime?.animeName}
                          </h1>

                          <DetailBtn
                            key={anime?.animeMalId}
                            id={anime.animeMalId}
                          />
                        </div>
                      ) : (
                        <div className="userList__anime__title">
                          <h1 className="">{anime?.animeName}</h1>
                        </div>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserList;
