import db from "../config/sequelize.js";
import dotenv from "dotenv";
dotenv.config();

const roster = db.Roster;

const authorizeRoles = async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated." });
  }

  const { role } = req.user;

  if (role === "MANAGER") {
    const match = req.route.path.match(/\/managers\b/);
    const managersSegment = match ? true : false;
    if (managersSegment) {
      const { teamId } = req.params;
      const currentRoster = await roster.findOne({
        where: { teamId, userId: req.user.userId },
      });
      if (!currentRoster.isLeader) {
        return res.status(403).json({
          message: "Only the Lead Manager may perform this action.",
        });
      }
    }
    return next();
  } else {
    return res
      .status(403)
      .json({ message: "Access to this route is not permitted." });
  }
};

export default authorizeRoles;
