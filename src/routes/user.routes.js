import { Router } from "express";
import { registerUser } from "../controllers/user.controller";
// import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.route("/register").post(registerUser);

export default router;
