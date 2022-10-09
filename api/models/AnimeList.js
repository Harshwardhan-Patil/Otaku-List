import mongoose from "mongoose";

const animeListSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    animeMalId: {
      type: String,
      required: true,
    },
    animeName: {
      type: String,
      required: true,
    },
    animePoster: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("AnimeList", animeListSchema);
