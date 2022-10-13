import { useEffect, useState } from "react";
import { axiosJikanApiInstance } from "../config";

function useAnime(pageNumber) {
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [animes, setAnimes] = useState([]);

  useEffect(() => {
    async function getAnime() {
      try {
        setLoading(true);

        const response = await axiosJikanApiInstance.get(
          `https://api.jikan.moe/v4/top/anime?filter=bypopularity&page=${pageNumber}`
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
