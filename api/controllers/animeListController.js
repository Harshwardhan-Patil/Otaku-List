import AnimeList from "../models/AnimeList.js";

async function addAnimeToList(req, res) {
  const isPresent = await AnimeList.findOne({
    $and: [{ userId: req.user.id }, { animeMalId: req.body.animeMalId }],
  });

  if (isPresent) {
    try {
      const animeList = await AnimeList.findOneAndUpdate(
        {
          $and: [{ userId: req.user.id }, { animeMalId: req.body.animeMalId }],
        },
        {
          state: req.body.state,
        },
        { new: true }
      );

      res.status(200).json(animeList);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    const animeList = new AnimeList({
      userId: req.user.id,
      animeMalId: req.body.animeMalId,
      animeName: req.body.animeName,
      animePoster: req.body.animePoster,
      state: req.body.state,
    });
    try {
      animeList.save();
      res.status(200).json(animeList);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

async function removeAnimeFromList(req, res) {
  try {
    const removeAnimeFromList = await AnimeList.findOneAndDelete({
      $and: [{ userId: req.user.id }, { animeMalId: req.body.animeMalId }],
    });
    res.status(200).json(removeAnimeFromList);
  } catch (error) {
    res.status(500).json(error);
  }
}

async function getAnimeList(req, res) {
  try {
    const animeList = await AnimeList.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });
    res.status(200).json(animeList);
  } catch (error) {
    res.status(500).json(error);
  }
}

async function getAnimeByState(req, res) {
  try {
    const animeList = await AnimeList.find({
      $and: [{ userId: req.user.id }, { state: req.query.state }],
    }).sort({ createdAt: -1 });
    res.status(200).json(animeList);
  } catch (error) {
    res.status(500).json(error);
  }
}

async function getAnimeById(req, res) {
  try {
    const animeList = await AnimeList.findOne({
      $and: [{ userId: req.user.id }, { animeMalId: req.query.animeMalId }],
    });
    res.status(200).json(animeList);
  } catch (error) {
    res.status(500).json(error);
  }
}

export {
  addAnimeToList,
  removeAnimeFromList,
  getAnimeList,
  getAnimeByState,
  getAnimeById,
};
