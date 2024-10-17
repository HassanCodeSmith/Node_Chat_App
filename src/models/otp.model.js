import mongoose from "mongoose";
import bcrypt from "bcrypt";

const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      index: true,
    },

    otp: {
      type: String,
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
      index: { expires: 300 },
    },

    reason: {
      type: String,
      enum: ["emailVerify", "forgotPassword"],
      default: "emailVerify",
    },
  },
  { timestamps: true, collection: "OTPs" }
);

/** _____ Hash OTP _____ */
otpSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("otp")) {
      return next();
    }

    const salt = await bcrypt.genSalt(10);
    this.otp = await bcrypt.hash(this.otp, salt);
    next();
  } catch (error) {
    console.error("An error occurred while 'hashing otp'");
    next(error);
  }
});

/** _____ Compare OTP _____ */
otpSchema.methods.compareOTP = async function (candidateOTP) {
  try {
    return await bcrypt.compare(candidateOTP, this.otp);
  } catch (error) {
    console.error("An error occurred while 'comapring OTP'");
    return false;
  }
};

const OTP = mongoose.model("OTP", otpSchema);

export { OTP };
