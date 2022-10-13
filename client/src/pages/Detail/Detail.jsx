import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import DetailContent from "../../components/DetailContent/DetailContent";
import "./Detail.css";
import Slider from "../../components/Slider/Slider";
import ListBtn from "../../components/Add to List Btn/ListBtn";
import NavBar from "../../components/NavBar/NavBar";
import { axiosJikanApiInstance } from "../../config";

function Detail() {
  const [anime, setAnimes] = useState([]);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getAnimeByName() {
      const response = await axiosJikanApiInstance.get(`anime/${id}/full`);
      setAnimes(response.data.data);
      setLoading(false);
      return response;
    }
    getAnimeByName();
  }, [id]);

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
    <>
      <NavBar />
      <div className="detail">
        <header className="detail__main__header">
          <div className="detail__header">
            <h1>{anime?.title}</h1>
            <span className="detail__header__anime-type">{anime?.type}</span>
            <ListBtn
              animeMalId={anime?.mal_id}
              animeName={anime?.title}
              animePoster={
                anime?.images.webp.large_image_url ||
                anime?.images.jpg.large_image_url
              }
              animeStatus={anime?.status}
            />
          </div>
          <div className="detail__container">
            <div className="detail__poster">
              <img
                src={
                  anime?.images.webp.large_image_url ||
                  anime?.images.jpg.large_image_url
                }
                alt={anime?.title}
                loading="lazy"
              />
            </div>
            <div className="detail__anime__info">
              {anime?.synopsis && (
                <div className="detail__synopsis">
                  <strong>Synopsis:</strong>
                  <p>{anime?.synopsis}</p>
                </div>
              )}
              <div className="detail__extra">
                {anime?.episodes && <h4>Episodes: {anime?.episodes}</h4>}
                <DetailContent title="Genres" contents={anime?.genres} />
                <DetailContent title="Themes" contents={anime?.themes} />
                <DetailContent title="Studios" contents={anime?.studios} />
                <DetailContent
                  title="Demographics"
                  contents={anime?.demographics}
                />
                <DetailContent title="Streaming" contents={anime?.streaming} />
              </div>
            </div>
          </div>
        </header>

        <Slider id={anime.mal_id} />

        {anime?.trailer.embed_url && (
          <div className="detail__trailer">
            <h1>Trailer</h1>
            <object data={anime?.trailer.embed_url}>
              {anime?.title} Trailer
            </object>
          </div>
        )}
      </div>
    </>
  );
}

export default Detail;
