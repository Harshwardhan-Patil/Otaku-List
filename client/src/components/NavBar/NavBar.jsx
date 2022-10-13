import { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import ViewListIcon from "@mui/icons-material/ViewList";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import MenuBtn from "../Menu btn/MenuBtn";
import Setting from "../Setting/Setting";
import LoginIcon from "@mui/icons-material/Login";

function NavBar({ page }) {
  const [show, setShow] = useState(false);
  const [isOnMobileDevice, setIsOnMobileDevice] = useState(false);
  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    if (window.innerWidth <= 550) {
      setIsOnMobileDevice(true);
    }
  }, []);

  useEffect(() => {
    page === "home" &&
      document.addEventListener("scroll", () => {
        window.scrollY > 10 ? setShow(true) : setShow(false);
      });
    return () => {
      document.removeEventListener("scroll", () => {});
    };
  }, [page]);

  return (
    <nav
      style={{
        backgroundColor: `${page !== "home" && "hsl(208, 23%, 15%)"}`,
        justifyContent: `${isOnMobileDevice ? "center" : "space-around"}`,
        padding: `${isOnMobileDevice && page !== "home" ? "0" : ".8em 0"}`,
      }}
      className={`navbar 
      ${page === "home" && "navbar__page"}  ${show && " navbar__background"} 
      }`}
    >
      <Link to={"/"} className="left">
        <h1
          style={{
            visibility: `${isOnMobileDevice && !show ? "hidden" : "visible"}`,
            display: `${isOnMobileDevice && page !== "home" && "none"}`,
          }}
        >
          <span
            style={{
              color: "#fd9330",
              fontWeight: "bold",
            }}
          >
            Otaku
          </span>
          List
        </h1>
      </Link>

      {/* other pages */}
      {isOnMobileDevice ? (
        <MenuBtn page={page} />
      ) : (
        <div className="right">
          <Link to={"/"} className="pages">
            <HomeIcon
              style={{
                color: "#fff",
                fill: `${page === "home" && "#fff"}`,
              }}
            />
            <h1 style={{ color: `${page === "home" && "#fff"}` }}>Home</h1>
          </Link>
          <Link to={"/yourList/allAnime"} className="pages">
            <ViewListIcon
              style={{
                color: "#fff",
                fill: `${page === "userList" && "#fff"}`,
                stroke: `${page === "userList" && "none"}`,
              }}
            />
            <h1 style={{ color: `${page === "userList" && "#fff"}` }}>
              Your List
            </h1>
          </Link>
          <Link to={"/animeSearch"} className="pages">
            <SearchIcon
              style={{
                color: "#fff",
                fill: `${page === "animeSearch" && "#fff"}`,
                stroke: `${page === "animeSearch" && "#fff"}`,
              }}
            />
            <h1 style={{ color: `${page === "animeSearch" && "#fff"}` }}>
              Search Anime
            </h1>
          </Link>

          {user ? (
            <Setting />
          ) : (
            <Link to={"/login"} className="pages">
              <LoginIcon />
              <h1>Sign In</h1>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}

export default NavBar;
