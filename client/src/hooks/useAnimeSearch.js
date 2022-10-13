import { useEffect, useState } from "react";
import axios from "axios";

function useAnimeSearch(query, pageNumber) {
  const [loading, setLoading] = useState(true);
  const [animes, setAnimes] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setAnimes([]);
  }, [query]);

  useEffect(() => {
    let cancel;
    setLoading(true);
    async function getSearchedAnime() {
      try {
        const response = await axios.get(
          `https://api.jikan.moe/v4/anime?letter=${query}&page=${pageNumber}&sfw=true`,
          {
            cancelToken: new axios.CancelToken((c) => (cancel = c)),
          }
        );
        // setAnimes(response.data.data);
        setAnimes((prevAnime) => [
          ...new Set([
            ...prevAnime,
            ...response.data.data.filter(
              (data, index) => prevAnime[index]?.mal_id !== data?.mal_id
            ),
          ]),
        ]);
        setHasMore(response.data.pagination.has_next_page);
        setLoading(false);
      } catch (error) {
        if (axios.isCancel(error)) return;
        console.error(error);
      }
    }
    getSearchedAnime();
    return () => cancel();
  }, [query, pageNumber]);

  return [animes, loading, hasMore];
}

export default useAnimeSearch;
