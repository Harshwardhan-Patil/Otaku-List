import { useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ClipLoader from "react-spinners/ClipLoader";
import { useSelector } from "react-redux";
import "./ListBtn.css";
import { axiosAPIInstance } from "../../config";
import { useEffect } from "react";
import UserNotPresent from "../User Not Present/UserNotPresent";

function ListBtn({ animeMalId, animeName, animePoster, animeStatus }) {
  const defaultBtnText = "Add to List";

  const [state, setState] = useState(defaultBtnText);
  const [isFetching, setIsFetching] = useState(false);
  const [userNotPresent, setUserNotPresent] = useState(false);

  const { currentUser } = useSelector((state) => state.user);

  function statusClass(statusName) {
    switch (statusName) {
      case "Currently Watching":
        return {
          width: "150px",
          backgroundColor: "#5BB318",
        };
      case "Completed":
        return {
          backgroundColor: "#25316D",
        };
      case "Plan To Watch":
        return {
          backgroundColor: "#73777B",
        };
      default:
        return {
          backgroundColor: "#0087d5",
        };
    }
  }

  useEffect(() => {
    async function addAnimeToList() {
      currentUser && setIsFetching(true);
      const response = await axiosAPIInstance.get(
        `/animeList/getAnime/${currentUser._id}?animeMalId=${animeMalId}`,
        {
          headers: {
            token: `Bearer ${currentUser.token}`,
          },
        }
      );

      response.data && setState(response.data.state);
      setIsFetching(false);
    }
    addAnimeToList();
  }, []);

  async function selectedOption(e) {
    if (currentUser) {
      setState(e.target.textContent);

      await axiosAPIInstance.put(
        `/animeList/add/${currentUser._id}`,
        {
          animeMalId,
          animeName,
          animePoster,
          state: e.target.textContent,
        },
        {
          headers: {
            token: `Bearer ${currentUser.token}`,
          },
        }
      );
      statusClass(e.target.textContent);
    } else {
      setUserNotPresent(true);
    }
  }

  async function handleRemoveClick() {
    await axiosAPIInstance.put(
      `/animeList/remove/${currentUser._id}`,
      {
        animeMalId,
      },
      {
        headers: {
          token: `Bearer ${currentUser.token}`,
        },
      }
    );
    setState(defaultBtnText);
  }

  const override = {
    display: "block",
    textAlign: "center",
    margin: "10px auto",
  };

  return (
    <>
      <div className="list-btn">
        <div className="list-btn__head">
          {isFetching ? (
            <ClipLoader
              color={"#fd9330"}
              loading={isFetching}
              cssOverride={override}
              size={10}
            />
          ) : (
            <button style={statusClass(state)} className="list-btn__btn">
              {state === defaultBtnText && (
                <AddCircleIcon style={{ fontSize: "1.4rem", color: "#fff" }} />
              )}
              {state}
            </button>
          )}
        </div>

        <div className="list-btn__menu">
          {animeStatus !== "Not yet aired" && (
            <div
              style={{ backgroundColor: "#5BB318" }}
              className="list-btn__menu__item"
              onClick={selectedOption}
            >
              Currently Watching
            </div>
          )}
          {animeStatus !== "Not yet aired" && (
            <div
              style={{ backgroundColor: "#25316D" }}
              className="list-btn__menu__item"
              onClick={selectedOption}
            >
              Completed
            </div>
          )}
          <div
            style={{ backgroundColor: "#73777B" }}
            className="list-btn__menu__item"
            onClick={selectedOption}
          >
            Plan To Watch
          </div>
          {state !== defaultBtnText && (
            <div
              style={{ backgroundColor: "hsl(0, 100%, 60%)" }}
              className="remove-list-btn list-btn__btn list-btn__menu__item"
              onClick={handleRemoveClick}
            >
              Remove
            </div>
          )}
        </div>
      </div>
      {userNotPresent && (
        <UserNotPresent setUserNotPresent={setUserNotPresent} />
      )}
    </>
  );
}

export default ListBtn;
