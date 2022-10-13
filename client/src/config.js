import axios from "axios";

export const axiosAPIInstance = axios.create({
  baseURL: ``,
});

export const axiosJikanApiInstance = axios.create({
  baseURL: "https://api.jikan.moe/v4/",
});
