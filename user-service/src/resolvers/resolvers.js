import db from "../config/sequelize.js";
import bcrypt from "bcryptjs";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateTokens.js";

const user = db.User;

const resolvers = {
  Query: {
    users: async () => {
      return await user.findAll();
    },
    user: async (_, { userId }) => {
      return await user.findByPk(userId);
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
          message: "User created successfully",
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
            maxAge: 24 * 60 * 60 * 1000, // 1d
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
