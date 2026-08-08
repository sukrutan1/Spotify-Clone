import { User } from "../models/user.model.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const currentUserId = req.user.id;
    const allUsers = await User.find({ clerkId: { $ne: currentUserId } });
    return res.status(200).json({ message: "all users", allUsers });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
