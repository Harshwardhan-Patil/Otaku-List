import axios from "axios";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();

  async function handleClick(e) {
    e.preventDefault();
    try {
      await axios.post("/auth/register", {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      });
      console.log("dkd");
      navigate("/login");
    } catch (error) {
      console.error(error);
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
        <h1 className="register__title">Register to Otaku List</h1>
        <form className="register__form" onSubmit={handleClick}>
          <div className="register__form__inputs">
            <div className="username register__form__field">
              <label htmlFor="username">Username</label>
              <input ref={username} type="text" id="username" required />
            </div>
            <div className="email  register__form__field">
              <label htmlFor="email">Email</label>
              <input ref={email} type="email" id="email" required />
            </div>
            <div className="password  register__form__field">
              <label htmlFor="password">Password</label>
              <input
                ref={password}
                type="password"
                id="password"
                autoComplete="on"
                minLength="6"
                maxLength="20"
                required
              />
            </div>
          </div>

          <button className="register__form__button" type="submit">
            Register
          </button>
          <div className="register__query">
            <h2>
              Already Have an Account?
              <Link to={"/login"} className="register__query__span">
                Log in
              </Link>
            </h2>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
