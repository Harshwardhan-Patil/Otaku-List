import { useEffect, useState } from "react";
import { axiosJikanApiInstance } from "../../config";
import "./Slider.css";

function Slider({ id }) {
  const [characters, setCharacters] = useState([]);
  useEffect(() => {
    (async function getCharacters() {
      const response = await axiosJikanApiInstance.get(
        `anime/${id}/characters`
      );
      setCharacters(response.data.data.slice(0, 30));
      return response;
    })();
  }, [id]);
  return (
    <div className="slider">
      <h1 className="slider__header">Characters</h1>
      <div className="slider__row">
        {characters.map(
          (character) =>
            character.character.images.webp.image_url && (
              <div className="slider__image" key={character.mal_id}>
                <img
                  src={
                    character.character.images.webp.image_url ||
                    character.character.images.jpg.image_url
                  }
                  alt={character.character.name}
                />
                <h2 className="slider__image__character__name">
                  {character.character.name}
                </h2>
              </div>
            )
        )}
      </div>
    </div>
  );
}

export default Slider;
