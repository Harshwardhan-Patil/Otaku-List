import express from "express";
import { verifyTokenAndAuthorization } from "./verify.js";
import {
  addAnimeToList,
  removeAnimeFromList,
  getAnimeList,
  getAnimeByState,
  getAnimeById,
} from "../controllers/animeListController.js";

const router = express.Router();

router.put("/add/:id", verifyTokenAndAuthorization, addAnimeToList);

router.put("/remove/:id", verifyTokenAndAuthorization, removeAnimeFromList);

router.get("/:id", verifyTokenAndAuthorization, getAnimeList);

router.get("/state/:id", verifyTokenAndAuthorization, getAnimeByState);

router.get("/getAnime/:id", verifyTokenAndAuthorization, getAnimeById);

export default router;
