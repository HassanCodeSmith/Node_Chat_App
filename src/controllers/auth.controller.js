import { User } from "../models/user.model.js";

/** _____ SignUp _____ */
export const singup = async (req, res) => {
  await User.create(req.body);

  return res.status(200).json({
    success: true,
    message: "User register successfully.",
  });
};
