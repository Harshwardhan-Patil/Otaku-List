import { useEffect, useState } from "react";
import { getAiringDate } from "../../date";
import DetailBtn from "../Detail Button/DetailBtn";
import "./RowPosterDetail.css";

function RowPosterDetail({ anime }) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    window.innerWidth <= 550 && setIsMobile(true);
  }, []);

  return (
    <>
      {!isMobile ? (
        <div className="row__poster__details">
          <h1 className="row__poster__details__title">
            {anime?.title_english || anime?.title}
          </h1>

          <DetailBtn id={anime.mal_id} />
          <div className="row__poster__brief_detail">
            <h2>{anime?.type}</h2>
            <h2>
              {getAiringDate(
                anime?.aired.prop.from.month,
                anime?.aired.prop.from.year
              )}
            </h2>
          </div>
        </div>
      ) : (
        <div className="row__poster__details__mobile">
          <h1 className="row__poster__details__title">
            {anime?.title_english || anime?.title}
          </h1>
          {(anime?.title_english || anime?.title).length < 30 && (
            <div className="row__poster__brief_detail">
              <h2>{anime?.type}</h2>
              {anime?.aired.prop.from.year && <span>•</span>}
              <h2>
                {getAiringDate(
                  anime?.aired.prop.from.month,
                  anime?.aired.prop.from.year
                )}
              </h2>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default RowPosterDetail;
