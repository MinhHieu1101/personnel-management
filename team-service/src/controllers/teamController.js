import db from "../config/sequelize.js";
import { getInfo } from "../utils/getInfo.js";

const { Team, User, Roster, sequelize } = db;

// managed transactions handle committing or rolling back the transaction automatically
const createTeam = async (req, res, next) => {
  const { teamName, managers, members } = req.body;
  const userId = req.user.userId;

  try {
    const result = await sequelize.transaction(async (transaction) => {
      const isTeamValid = await Team.findOne({ where: { teamName: teamName } });
      if (isTeamValid) {
        return res.status(400).json({ message: "This team already existed." });
      }
      const team = await Team.create({ teamName }, { transaction });
      await Roster.create(
        { teamId: team.teamId, userId, isLeader: true },
        { transaction }
      );

      if (managers && Array.isArray(managers)) {
        for (const manager of managers) {
          if (manager.managerId === userId) continue;
          const managerInfo = await getInfo(User, manager.managerId);
          if (!managerInfo) {
            return res
              .status(400)
              .json({ message: "This manager does not exist." });
          }
          await Roster.create({
            teamId: team.teamId,
            userId: manager.managerId,
          });
        }
      }

      if (members && Array.isArray(members)) {
        for (const member of members) {
          if (member.memberId === userId) continue;
          const memberInfo = await getInfo(User, member.memberId);
          if (!memberInfo) {
            return res
              .status(400)
              .json({ message: "This member does not exist." });
          }
          await Roster.create({
            teamId: team.teamId,
            userId: member.memberId,
          });
        }
      }

      return team;
    });
    return res.status(201).json({ team: result });
  } catch (err) {
    next(err);
  }
};

const addMember = async (req, res, next) => {};

const removeMember = async (req, res, next) => {};

const addManager = async (req, res, next) => {};

const removeManager = async (req, res, next) => {};

export { createTeam, addMember, removeMember, addManager, removeManager };
