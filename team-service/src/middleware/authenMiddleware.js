import jwt from "jsonwebtoken";
import db from "../config/sequelize.js";
import { generateAccessToken } from "../utils/generateTokens.js";
import dotenv from "dotenv";
dotenv.config();

const user = db.User;

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  let accessToken = authHeader?.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;
  if (!accessToken) {
    return res
      .status(401)
      .json({ message: "Not Authorized. Invalid access token." });
  }

  try {
    const decodedAccess = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );
    req.user = await user.findByPk(decodedAccess.userId, {
      attributes: { exclude: ["password"] },
    });
    return next();
  } catch (err) {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res
        .status(401)
        .json({ message: "Refresh token missing. Please log in again." });
    }

    try {
      const decodedRefresh = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
      const newAccessToken = generateAccessToken(decodedRefresh.userId);
      res.setHeader("Authorization", `Bearer ${newAccessToken}`);
      req.user = await user.findByPk(decodedRefresh.userId, {
        attributes: { exclude: ["password"] },
      });
      return next();
    } catch {
      return res
        .status(403)
        .json({ message: "Refresh token expired. Please log in." });
    }
  }
};

export default protect;
