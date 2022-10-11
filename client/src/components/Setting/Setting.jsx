import SettingsIcon from "@mui/icons-material/Settings";
import "./Setting.css";
import "../NavBar/NavBar.css";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/apiCalls";
import { Link } from "react-router-dom";

function Setting() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.currentUser);

  async function handleLogOut() {
    logout(dispatch, user);
  }

  return (
    <>
      <div className="setting pages">
        <SettingsIcon />
        <h1>Setting</h1>
        <div className="setting__drop-down-list">
          <div className="options" onClick={handleLogOut}>
            <LogoutIcon />
            <h2>Logout</h2>
          </div>
          <Link to={`/about`} className="options">
            <PersonIcon />
            <h2>About</h2>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Setting;
