import { getInfo } from "./getInfo.js";

export const processRequestBody = async (
  db,
  teamId,
  userId,
  userName,
  role
) => {
  const userInfo = await getInfo(db, "Users", userId);
  if (!userInfo || userInfo.username !== userName) {
    const err = new Error(
      `This member ${userId} does not exist or has an incorrect username.`
    );
    err.status = 400;
    throw err;
  }

  if (userInfo.role !== role.toUpperCase()) {
    const err = new Error(`This ${role} cannot be added through this route.`);
    err.status = 400;
    throw err;
  }

  const isTeamFound = await db("Teams")
    .where({
      teamId,
    })
    .first();

  if (!isTeamFound) {
    const err = new Error(`This team ${teamId} does not exist.`);
    err.status = 400;
    throw err;
  }

  const isUserFound = await db("Rosters")
    .where({
      teamId,
      userId,
    })
    .first();

  if (isUserFound) {
    const err = new Error(`This member already joined team ${teamId}.`);
    err.status = 400;
    throw err;
  }

  const result = await db("Rosters")
    .insert({ teamId, userId })
    .returning(["teamId", "userId"]);
  return result;
};
