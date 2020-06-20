import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Errors
import {
  UserInputError,
  AuthenticationError,
  ValidationError,
} from "apollo-server-express";

// Services
import {
  getAccessToken,
  getRefreshToken,
  validateRegister,
  validateNewPassword,
} from "../../services/auth";
import {
  signVerificationEmail,
  sendPasswordResetEmail,
} from "../../services/email";

// Models
import User from "../../models/User";

export const userResolver = {
  Mutation: {
    loginUser: async (_, { email, password }, { res }) => {
      const user = await User.findOne({ email });
      if (!user)
        throw new AuthenticationError(
          "Cannot authenticate with provided credentials."
        );

      const match = await bycrypt.compare(password, user.password);
      if (!match)
        throw new AuthenticationError(
          "Cannot authenticate with provided credentials."
        );

      const refreshToken = getRefreshToken(user);
      const accessToken = getAccessToken(user);

      res.cookie("refresh-token", refreshToken, {
        maxAge: 1000 * 60 * 60 * 24,
      });
      res.cookie("access-token", accessToken, { maxAge: 1000 * 60 * 15 });

      return {
        ...user._doc,
      };
    },

    registerUser: async (
      _,
      { user: { firstName, lastName, email, password, confirmPassword } }
    ) => {
      const { errors, valid } = validateRegister(
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      );

      // if (!valid) throw new UserInputError("Error: invalid user inputs.", { errors });

      const userWithThisEmail = await User.findOne({ email });
      if (userWithThisEmail)
        throw new ValidationError(
          "We have already an account with this email."
        );

      password = await bycrypt.hash(password, 12);
      const newUser = new User({
        firstName,
        lastName,
        email,
        password,
      });
      const res = await newUser.save();

      signVerificationEmail(newUser);

      return {
        ...res._doc,
      };
    },

    logoutUser: async (_, __, { req, res }) => {
      // Already logout
      if (!req.userId) {
        return true;
      }
      try {
        await User.updateOne(
          { _id: req.userId },
          {
            $inc: { count: 1 },
          }
        );
      } catch (err) {
        throw err;
      }

      res.clearCookie("access-token");
      res.clearCookie("refresh-token");

      return true;
    },

    verifyEmail: async (_, { token }) => {
      try {
        const decoded = await jwt.verify(token, process.env.JWT_EMAIL_SECRET);
        const res = await User.updateOne(
          { _id: decoded.id },
          {
            emailVerify: true,
          }
        );

        return true;
      } catch (err) {
        console.log(err)
        return false
      }
    },

    sendPasswordReset: async (_, { email }) => {
      const user = await User.findOne({ email: email });
      if (!user) {
        return new Error("Don't found a user with the provided email.");
      }

      try {
        const token = await jwt.sign(
          {
            id: user.id,
          },
          process.env.PASSWORD_TOKEN_SECRET,
          { expiresIn: "30min" }
        );

        sendPasswordResetEmail(token, user);
      } catch (err) {
        console.log(err);
        return false;
      }

      return true;
    },

    resetPassword: async (_, { token, newPassword, confirmPassword }) => {
      const { errors, valid } = validateNewPassword(
        newPassword,
        confirmPassword
      );
      if (!valid) throw new UserInputError("Error", { errors });

      try {
        const data = await jwt.verify(token, process.env.PASSWORD_TOKEN_SECRET);

        const password = await bycrypt.hash(newPassword, 12);

        await User.findOneAndUpdate(
          { _id: data.id },
          {
            password,
          }
        );
        return true;
      } catch (err) {
        return false;
      }
    },

    changePassword: async (
      _,
      { password, newPassword, confirmPassword },
      { req }
    ) => {
      if (!req.userId)
        throw new AuthenticationError(
          "You need to login to change your password."
        );

      const user = await User.findById(req.userId);
      if (!user)
        throw new AuthenticationError(
          "You need to login to change your password."
        );

      const match = await bycrypt.compare(password, user.password);
      if (!match)
        throw new AuthenticationError(
          "Your old pasword is invalid. Try again or restore you password."
        );

      const { errors, valid } = validateNewPassword(
        newPassword,
        confirmPassword
      );
      if (!valid) throw new UserInputError("Error", { errors });

      try {
        password = await bycrypt.hash(newPassword, 12);
        await User.findOneAndUpdate(
          { _id: req.userId },
          {
            password,
          }
        );
        return true;
      } catch (err) {
        return false;
      }
    },
  },
};
