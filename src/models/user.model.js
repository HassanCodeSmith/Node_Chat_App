import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    password: {
      type: String,
      default: null,
    },

    emailVarification: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, collection: "Users" }
);

/** _____ Hash Password _____ */
userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    console.error("An error occurred while 'hasing password'.", error);
    next(error);
  }
});

/** _____ Compare password _____ */
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    console.error("An error occurred while 'comparing password'.", error);
    return false;
  }
};

/** _____ Generate JWT _____ */
userSchema.methods.generateJWT = function () {
  try {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_LIFETIME,
    });
  } catch (error) {
    console.error("An error occurred while 'generating jwt'.", error);
    return null;
  }
};

/** _____ Verify JWT _____ */
userSchema.methods.verifyJWT = function (token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.error("An error occurred while 'verifying jwt'");
    return null;
  }
};
const User = mongoose.model("User", userSchema);

export { User };
