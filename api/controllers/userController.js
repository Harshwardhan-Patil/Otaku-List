import User from "../models/User.js";
import CryptoJs from "crypto-js";
import dotenv from "dotenv";
dotenv.config();

async function updateUser(req, res) {
  try {
    const id = req.user.id.trim();

    if (req.body.password) {
      req.body.password = CryptoJs.AES.encrypt(
        req.body.password,
        process.env.CRYPTO_JS_SECRET
      ).toString();
    }
    const user = await User.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json("Something is wrong");
  }
}

async function deleteUser(req, res) {
  try {
    const user = await User.findByIdAndDelete(req.user.id);
    res.status(200).json("User is deleted Successfully");
  } catch (error) {
    res.status(500).json("Can't delete user");
  }
}

export { updateUser, deleteUser };
