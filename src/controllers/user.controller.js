import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudaniry } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  // validation- not empty
  // check if user already exists: username, email
  // check for images
  // check avatar
  // if available, upload them to cloudinary - avatar
  // create user object - create entry in db
  // remove password and refresh token feed from response
  // check for user creation
  // return response

  const { username, fullname, email, password } = req.body;
  console.log("email:", email);

  // if (
  //   [fullname, username, password, email].some((field) => {
  //     field?.trim() === "";
  //   })
  // ) {
  //   throw new ApiError(400, "all fields are required");
  // }
  if (fullname === "") {
    throw new ApiError(400, "field is required");
  }
  if (username === "") {
    throw new ApiError(400, "field is required");
  }
  if (email === "") {
    throw new ApiError(400, "field is required");
  }
  if (password === "") {
    throw new ApiError(400, "field is required");
  }

  const existedUser = User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw new ApiError(409, "user already exists");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "avatar is required");
  }

  const avatar = await uploadOnCloudaniry(avatarLocalPath);
  const coverImage = await uploadOnCloudaniry(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "avatar is required");
  }

  const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken "
  );

  if (!createdUser) {
    throw new ApiError(504, " error while registering the user");
  }
  return (
    res,
    status(201).json(
      new ApiResponse(200, createdUser, "user registered successfully")
    )
  );
});

export { registerUser };
