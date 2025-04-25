import express from "express";
const router = express.Router();

import {
  createTeam,
  addMember,
  removeMember,
  addManager,
  removeManager,
} from "../controllers/teamController.js";

import protect from "../middleware/authenMiddleware.js";
import authorizeRoles from "../middleware/authorMiddleware.js";

router.post("/", protect, authorizeRoles, createTeam);

router.post("/:teamId/members", protect, authorizeRoles, addMember);

router.delete(
  "/:teamId/members/:memberId",
  protect,
  authorizeRoles,
  removeMember
);

router.post("/:teamId/managers", protect, authorizeRoles, addManager);

router.delete(
  "/:teamId/managers/:managerId",
  protect,
  authorizeRoles,
  removeManager
);

export default router;
