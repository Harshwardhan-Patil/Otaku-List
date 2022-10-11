import dotenv from "dotenv";
import User from "../models/User.js";
import CryptoJs from "crypto-js";
import jwt from "jsonwebtoken";

dotenv.config();

async function register(req, res) {
  const { username, email, password } = req.body;
  console.log(req.body);
  const user = new User({
    username,
    email,
    password: CryptoJs.AES.encrypt(password, process.env.CRYPTO_JS_SECRET),
  });
  try {
    const userDetail = await user.save();
    const { _id, username, email } = userDetail;
    res.status(200).json({ _id, username, email });
  } catch (error) {
    res.status(500).json(error);
  }
}

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};

async function login(req, res) {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    const hashedPassword = CryptoJs.AES.decrypt(
      user.password,
      process.env.CRYPTO_JS_SECRET
    );

    //converting object to string
    const originalPassword = hashedPassword.toString(CryptoJs.enc.Utf8);

    //generating jwt
    const accessToken = generateToken(user);

    const { password: o_password, ...others } = user._doc;
    password === originalPassword
      ? res.status(200).json({ ...others, token: accessToken })
      : res.status(401).json("You password is incorrect");
  } catch (error) {
    res.status(404).json("User name does not exist");
  }
}

async function logout(req, res) {
  res.status(200).json("You successfully logged out");
}

export { register, login, logout };
