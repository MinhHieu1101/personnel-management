import db from "../config/knexInstance.js";
import { getInfo } from "../utils/getInfo.js";

// managed transactions handle committing or rolling back the transaction automatically
const createTeam = async (req, res, next) => {
  const { teamName, managers, members } = req.body;
  const userId = req.user.userId;

  try {
    const team = await db.transaction(async (trx) => {
      const isTeamFound = await trx("Teams").where({ teamName }).first();
      if (isTeamFound) {
        const err = new Error("This team already exists.");
        err.status = 400;
        throw err;
      }

      const newTeam = await trx("Teams")
        .insert({ teamName })
        .returning(["teamId", "teamName"]);
      await trx("Rosters").insert({
        teamId: newTeam.teamId,
        userId: userId,
        isLeader: true,
      });

      if (managers && Array.isArray(managers)) {
        for (const manager of managers) {
          if (manager.managerId === userId) continue;
          const managerInfo = await getInfo(trx, "Users", manager.managerId);
          if (!managerInfo) {
            const err = new Error("This manager does not exist.");
            err.status = 400;
            throw err;
          }
          if (managerInfo.username !== manager.managerName) {
            const err = new Error("This manager's name is incorrect.");
            err.status = 400;
            throw err;
          }
          await trx("Rosters").insert({
            teamId: newTeam.teamId,
            userId: manager.managerId,
          });
        }
      }

      if (members && Array.isArray(members)) {
        for (const member of members) {
          const memberInfo = await getInfo(trx, "Users", member.memberId);
          if (!memberInfo) {
            const err = new Error("This member does not exist.");
            err.status = 400;
            throw err;
          }
          if (memberInfo.username !== member.memberName) {
            const err = new Error("This member's name is incorrect.");
            err.status = 400;
            throw err;
          }
          await trx("Rosters").insert({
            teamId: newTeam.teamId,
            userId: member.memberId,
          });
        }
      }

      return newTeam;
    });
    return res.status(201).json({ team });
  } catch (err) {
    next(err);
  }
};

const addMember = async (req, res, next) => {};

const removeMember = async (req, res, next) => {};

const addManager = async (req, res, next) => {};

const removeManager = async (req, res, next) => {};

export { createTeam, addMember, removeMember, addManager, removeManager };
