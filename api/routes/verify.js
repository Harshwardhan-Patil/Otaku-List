import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    try {
      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
          res.status(403).json("Your token unauthorized");
        } else {
          req.user = user;
          next(req, res, next);
        }
      });
    } catch (error) {
      res.status(500);
    }
  } else {
    res.status(403).json("Token is missing");
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.params.id.trim() === req.user.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("Token is not valid");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.params.id.trim() === req.user.id && req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("Token is not valid");
    }
  });
};

export { verifyTokenAndAuthorization, verifyTokenAndAdmin };
