import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import "../Register/Register.css";
import "./SignIn.css";

function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  async function handleClick(e) {
    e.preventDefault();
    const isLoggedIn = await login(dispatch, { username, password });
    console.log(isLoggedIn);
    if (isLoggedIn) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }

  return (
    <div className="register">
      <div className="register__poster">
        <img
          src={`${process.env.PUBLIC_URL}/images/wallpaper-poster.jpg`}
          alt=""
        />
      </div>
      <div className="register__main_page">
        <h1 className="register__title">Log in</h1>
        <form className="register__form">
          <div className="register__form__inputs">
            <div className="username register__form__field">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="password  register__form__field">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="on"
                required
              />
            </div>
          </div>

          <button
            className="register__form__button"
            type="submit"
            onClick={handleClick}
            disabled={isFetching}
          >
            Login
          </button>
          {error && <h3 className="error">Username or Password is wrong!</h3>}
          <div className="register__query">
            <h2>
              Don't Have an Account?
              <Link to={"/register"} className="register__query__span">
                Sign Up
              </Link>
            </h2>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
