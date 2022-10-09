import { useEffect, useState } from "react";
import axios from "axios";

function useAnime(pageNumber) {
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [animes, setAnimes] = useState([]);

  useEffect(() => {
    async function getAnime() {
      try {
        setLoading(true);

        const response = await axios.get(
          `https://api.jikan.moe/v4/anime?sfw=true&page=${pageNumber}`
        );
        setAnimes((prevAnime) => [
          ...new Set([
            ...prevAnime,
            ...response.data.data.filter(
              (data, index) => prevAnime[index]?.mal_id !== data?.mal_id
            ),
          ]),
        ]);
        setLoading(false);
        setHasMore(response.data.pagination.has_next_page);
      } catch (error) {
        console.error(error);
      }
    }
    getAnime();
  }, [pageNumber]);

  return [animes, loading, hasMore];
}

export default useAnime;
