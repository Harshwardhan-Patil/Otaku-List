import axios from "axios";
import {
  loginStart,
  loginSuccess,
  loginError,
  logoutSuccess,
} from "./userReducer";

export const Axios = axios.create();

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const response = await axios.post("/auth/login", user);
    dispatch(loginSuccess(response.data));
    return response.data;
  } catch (error) {
    dispatch(loginError());
  }
};

export const logout = async (dispatch, user) => {
  console.log(user);
  dispatch(loginStart());
  try {
    const response = await fetch(`/auth/logout/${user.id}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        token: JSON.stringify(`Bearer ${user.token}`),
      },
    });

    dispatch(logoutSuccess());
    return response.data;
  } catch (error) {
    dispatch(loginError());
  }
};
