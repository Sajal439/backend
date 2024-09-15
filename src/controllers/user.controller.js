import { asyncHandler } from "../utils/asyncHandler";

const registerUser = asyncHandler(async (req, res) => {
  console.log("registerUser");
  res.status(201).json({ success: true, message: "User registered" });
});

export { registerUser };
