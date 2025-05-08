import db from "../config/sequelize.js";
import bcrypt from "bcryptjs";
import { DateTimeResolver } from "graphql-scalars";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateTokens.js";

const user = db.User;
const team = db.Team;
const roster = db.Roster;

const resolvers = {
  DateTime: DateTimeResolver,
  Query: {
    users: async (_, { role }) => {
      return await user.findAll({
        where: { role },
      });
    },
    user: async (_, { userId }) => {
      return await user.findByPk(userId);
    },
    teams: async (_, { userId }) => {
      try {
        const teams = await team.findAll({
          attributes: ["teamId", "teamName"],
          include: [
            {
              model: roster,
              as: "rosters",
              where: { userId },
              attributes: [],
            },
          ],
        });
        return teams;
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
    team: async (_, { teamId }) => {
      const query = await team.findOne({
        where: { teamId },
        include: [
          {
            model: roster,
            as: "rosters",
            include: [
              {
                model: user,
                as: "user",
                attributes: ["userId", "username", "role"],
              },
            ],
          },
          {
            model: user,
            as: "managers",
            attributes: ["userId", "username"],
            through: { attributes: [] },
            required: false,
            where: { role: "MANAGER" },
          },
          {
            model: user,
            as: "members",
            attributes: ["userId", "username"],
            through: { attributes: [] },
            required: false,
            where: { role: "MEMBER" },
          },
        ],
      });

      const teamInstance = query.get({ plain: true });
      console.log(JSON.stringify(teamInstance, null, 2));

      const managers = teamInstance.managers.map((manager) => ({
        managerId: manager.userId,
        managerName: manager.username,
      }));

      const members = teamInstance.members.map((member) => ({
        memberId: member.userId,
        memberName: member.username,
      }));

      return {
        teamId: teamInstance.teamId,
        teamName: teamInstance.teamName,
        managers,
        members,
      };
    },
  },

  Mutation: {
    createUser: async (_, { username, email, password, role }) => {
      try {
        const userRes = await user.create({
          username,
          email,
          password,
          role: role.toUpperCase(),
        });
        return {
          code: "200",
          success: true,
          message: `Welcome on board ${username}^^`,
          user: userRes,
        };
      } catch (err) {
        return {
          code:
            err.name === "SequelizeUniqueConstraintError" ||
            "SequelizeValidationError"
              ? "400"
              : "500",
          success: false,
          errors: err.errors ? err.errors.map((error) => error.message) : null,
          user: null,
        };
      }
    },

    updateUser: async (_, { userId, username, email }) => {
      try {
        await user.update(
          {
            username,
            email,
          },
          {
            where: {
              userId,
            },
          }
        );
        return {
          code: "200",
          success: true,
          message: `Updated ${username}'s profile`,
          user: null,
        };
      } catch (err) {
        return {
          code:
            err.name === "SequelizeUniqueConstraintError" ||
            "SequelizeValidationError"
              ? "400"
              : "500",
          success: false,
          errors: err.errors ? err.errors.map((error) => error.message) : null,
          user: null,
        };
      }
    },

    login: async (_, args, context) => {
      const { email, password } = args.input;
      try {
        const result = await user.findOne({ where: { email: email } });
        if (!result) {
          return {
            code: "400",
            success: false,
            message: "This user is no where to be found.",
            user: null,
          };
        }

        const isVerified = await bcrypt.compare(password, result.password);

        if (result && isVerified) {
          const refreshToken = generateRefreshToken(result.userId);
          const accessToken = generateAccessToken(result.userId);
          context.res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            sameSite: "none",
            secure: process.env.NODE_ENV === "production",
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1d
          });
          return {
            code: "200",
            success: true,
            message: "User login successfully",
            auth: {
              accessToken,
              refreshToken,
              userId: result.userId,
            },
          };
        } else {
          return {
            code: "400",
            success: false,
            message: "Invalid credentials",
            auth: null,
          };
        }
      } catch (err) {
        console.log(err);
        return {
          code:
            err.name === "SequelizeUniqueConstraintError" ||
            "SequelizeValidationError"
              ? "400"
              : "500",
          success: false,
          errors: err.errors ? err.errors.map((error) => error.message) : null,
          user: null,
        };
      }
    },
  },

  User: {
    // map DB fields to GraphQL fields
    userId: (user) => user.userId.toString(),
    username: (user) => user.username,
    email: (user) => user.email,
    password: (user) => user.password,
    role: (user) => user.role.toUpperCase(),
  },
};

export default resolvers;
