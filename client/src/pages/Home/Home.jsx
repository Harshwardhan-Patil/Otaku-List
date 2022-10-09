import React, { Suspense } from "react";
import Featured from "../../components/Featured/Featured";
import NavBar from "../../components/NavBar/NavBar";
import request from "../../api/request";
const Row = React.lazy(() => import("../../components/Row/Row"));

function Home() {
  return (
    <div>
      <NavBar page="home" />
      <Featured url={request.getTopAnime} />
      <Suspense fallback={<div>Loading...</div>}>
        <Row title={"Airing Animes"} url={request.getAiringAnime} />
        <Row title={"Today Releases"} url={request.getTodayReleases} sort />
        <Row title={"Top Upcoming Animes"} url={request.getTopUpcomingAnime} />
        <Row title={"Top Animes"} url={request.getTopAnime} />
        <Row title={"Top Movies"} url={request.getTopMovies} />
        <Row title={"Upcoming Movies"} url={request.getTopUpcomingMovies} />
      </Suspense>
    </div>
  );
}

export default Home;
