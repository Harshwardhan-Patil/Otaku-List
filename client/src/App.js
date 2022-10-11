import React, { Suspense, lazy, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "./redux/apiCalls";

const Home = lazy(() => import("./pages/Home/Home"));
const AnimeSearch = lazy(() => import("./pages/Anime Search/AnimeSearch"));
const UserList = lazy(() => import("./pages/User List/UserList"));
const Detail = lazy(() => import("./pages/Detail/Detail"));
const PageNotFound = lazy(() => import("./pages/Page Not Found/PageNotFound"));
const Register = lazy(() => import("./pages/Register/Register"));
const SignIn = lazy(() => import("./pages/Sign In/SignIn"));
const About = lazy(() => import("./pages/About/About"));

function App() {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      const time = new Date();
      const decodeToken = jwt_decode(user.token);
      if (decodeToken.exp * 1000 < time.getTime()) {
        logout(dispatch, user);
      }
    }
  }, []);

  return (
    <Suspense fallback={<div></div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/anime/:id" element={<Detail />} />
        <Route path="/animeSearch" element={<AnimeSearch />} />
        <Route
          path="/yourList/allAnime"
          element={<UserList title="All Anime" />}
        />
        <Route
          path="/yourList/currentlyWatching"
          element={<UserList title="Currently Watching" />}
        />
        <Route
          path="/yourList/completed"
          element={<UserList title="Completed" />}
        />
        <Route
          path="/yourList/planToWatch"
          element={<UserList title="Plan To Watch" />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <SignIn />}
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;
