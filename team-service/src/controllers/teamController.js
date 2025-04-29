import db from "../config/knexInstance.js";
import {
  teamSchema,
  memberSchema,
  managerSchema,
} from "../schemas/joiSchemas.js";
import { processArray } from "../utils/processArray.js";
import { processRequestBody } from "../utils/processRequestBody.js";

// managed transactions handle committing or rolling back the transaction automatically
const createTeam = async (req, res, next) => {
  const { error, value } = teamSchema.validate(req.body);
  if (error) {
    error.status = 400;
    return next(error);
  }

  const { teamName, managers, members } = value;
  const userId = req.user.userId;

  try {
    const result = await db.transaction(async (trx) => {
      const isTeamFound = await trx("Teams").where({ teamName }).first();
      if (isTeamFound) {
        const err = new Error("This team already exists.");
        err.status = 400;
        throw err;
      } else if (!isTeamFound) {
        const newTeam = await trx("Teams")
          .insert({ teamName })
          .returning(["teamId", "teamName"]);

        console.log(newTeam);

        const newLeader = await trx("Rosters")
          .insert({
            teamId: newTeam[0].teamId,
            userId: userId,
            isLeader: true,
          })
          .returning(["teamId", "isLeader", "userId"]);

        console.log(newLeader);

        const managerList = await processArray(
          trx,
          newTeam[0].teamId,
          managers,
          userId,
          "manager"
        );

        const memberList = await processArray(
          trx,
          newTeam[0].teamId,
          members,
          userId,
          "member"
        );

        return {
          teamId: newTeam[0].teamId,
          teamName: newTeam[0].teamName,
          managers: managerList,
          members: memberList,
        };
      }
    });
    return res.status(201).json(result);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const addMember = async (req, res, next) => {
  const { error, value } = memberSchema.validate(req.body);
  if (error) {
    error.status = 400;
    //return next(error);
    console.log(error);
  }

  const { memberId, memberName } = value;
  const { teamId } = req.params;
  console.log(req.params);

  try {
    const task = await processRequestBody(
      db,
      teamId,
      memberId,
      memberName,
      "member"
    );
    console.log(task);

    const result = {
      teamId,
      memberId,
      memberName,
    };

    return res.status(201).json(result);
  } catch (err) {
    console.log(err);
    //next(err);
  }
};

const removeMember = async (req, res, next) => {};

const addManager = async (req, res, next) => {};

const removeManager = async (req, res, next) => {};

export { createTeam, addMember, removeMember, addManager, removeManager };
