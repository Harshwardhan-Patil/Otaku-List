import { day } from "../date";
const today = day[new Date().getDay()];

const request = {
  getAllAnime: `anime`,
  getTopAnime: `top/anime?type=tv`,
  getAiringAnime: `top/anime?filter=airing`,
  getTodayReleases: `schedules?filter=${today}&sfw=false`,
  getTopUpcomingAnime: `top/anime?type=tv&filter=upcoming`,
  getTopCharacter: `top/characters`,
  getTopMovies: `top/anime?type=movie&filter=bypopularity`,
  getTopUpcomingMovies: `top/anime?type=movie&filter=upcoming`,
};

export default request;
