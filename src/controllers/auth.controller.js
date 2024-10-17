import {
  BadRequestError,
  ForBiddenError,
  NotFoundError,
  UnAuthenticationError,
} from "../errors/index.js";
import { OTP } from "../models/otp.model.js";
import { User } from "../models/user.model.js";
import { emailVarificationTemplate } from "../templates/emailVarification.template.js";
import { sendMail } from "../utils/sendEmail.util.js";

/** _____ SignUp _____ */
export const signup = async (req, res) => {
  const isEmailExist = await User.findOne({ email: req.body.email });

  if (isEmailExist) {
    throw new BadRequestError(
      `User already registered with email: ${req.body.email}`
    );
  }

  const otp = (Math.floor(Math.random() * 8999) + 1000).toString();
  console.log("OTP: ", otp);

  await sendMail({
    to: req.body.email,
    subject: "Account Activation",
    html: emailVarificationTemplate(otp),
  });

  await OTP.create({ email: req.body.email, otp });
  await User.create(req.body);
  return res.status(200).json({
    success: true,
    message:
      "User registered successfully, OTP has been sent to your registered email",
  });
};

/** _____ Resend Accoutn Varification Code _____ */

/** _____ Account Varification _____ */
export const accountActivation = async (req, res) => {
  const { email, candidateOTP } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw new UnAuthenticationError("Invalid email address");
  }

  const otp = await OTP.findOne({ email });

  if (!otp) {
    throw new NotFoundError("OTP has been expired.");
  }

  if (!(await otp.compareOTP(candidateOTP))) {
    throw new BadRequestError("Invalid OTP.");
  }

  await OTP.deleteMany({ email });
  user.emailVarification = true;
  await user.save();

  return res.status(200).json({
    success: true,
    message: "Account activated.",
  });
};

/** _____ Login _____ */
export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw new NotFoundError("Email is not registered.");
  }

  if (!user.emailVarification) {
    await OTP.deleteMany({ email });
    const otp = (Math.floor(Math.random() * 8999) + 1000).toString();
    console.log("OTP: ", otp);

    await sendMail({
      to: req.body.email,
      subject: "Account Activation",
      html: emailVarificationTemplate(otp),
    });

    await OTP.create({ email: req.body.email, otp });

    throw new ForBiddenError(
      "Please activate your account before login.\nOTP has been sent to your email"
    );
  }

  if (!(await user.comparePassword(password))) {
    throw new BadRequestError("Password is incorrect.");
  }

  const token = user.generateJWT();

  res.status(200).json({
    success: true,
    message: "Login successful",
    token,
  });
};
