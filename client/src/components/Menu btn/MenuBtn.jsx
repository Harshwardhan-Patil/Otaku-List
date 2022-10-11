/**
 * @desc for device whose width is less than 550
 */

import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import ViewListIcon from "@mui/icons-material/ViewList";
import "./MenuBtn.css";
import { useSelector } from "react-redux";
import Setting from "../Setting/Setting";
import LoginIcon from "@mui/icons-material/Login";

function MenuBtn({ page }) {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <div className="menu-btn">
      <div className="nav-bar">
        <Link to={"/"} className="m-pages">
          <HomeIcon
            style={{
              color: "#fff",
              fill: `${page === "home" && "#fd9330"}`,
              stroke: `${page === "home" && "#fd9330"}`,
            }}
          />
          <h1 style={{ color: `${page === "home" && "#fd9330"}` }}>Home</h1>
        </Link>
        <Link to={"/yourList/allAnime"} className="m-pages">
          <ViewListIcon
            style={{
              color: "#fff",
              fill: `${page === "userList" && "#fd9330"}`,
              stroke: `${page === "userList" && "none"}`,
            }}
          />
          <h1 style={{ color: `${page === "userList" && "#fd9330"}` }}>List</h1>
        </Link>
        <Link to={"/animeSearch"} className="m-pages">
          <SearchIcon
            style={{
              color: "#fff",
              fill: `${page === "animeSearch" && "#fd9330"}`,
              stroke: `${page === "animeSearch" && "#fd9330"}`,
            }}
          />
          <h1 style={{ color: `${page === "animeSearch" && "#fd9330"}` }}>
            Search
          </h1>
        </Link>

        {user ? (
          <Setting />
        ) : (
          <Link to={"/login"} className="m-pages">
            <LoginIcon />
            <h1>Sign In</h1>
          </Link>
        )}
      </div>
    </div>
  );
}

export default MenuBtn;
