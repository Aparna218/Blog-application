import bcrypt from "bcrypt";
import { response } from "express";
import User from "../model/userModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import token from "../model/token.js";

export const signupUser = async (request, response) => {
  try {
    const hashedPassword = await bcrypt.hash(request.body.password, 10);
    const user = {
      username: request.body.username,
      name: request.body.name,
      password: hashedPassword,
    };

    const newUser = new User(user);
    await newUser.save();
    return response.status(200).json({ msg: "Signup successfully" });
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
};

export const loginUser = async (request, response) => {
  try {
    let user = await User.findOne({ username: request.body.username });
    if (!user) {
      return response.status(400).json({ msg: "username does not match" });
    }
    let match = await bcrypt.compare(request.body.password, user.password);
    if (match) {
      const accessToken = jwt.sign(
        user.toJSON(),
        process.env.Access_Secret_key,
        {expiresIn:'15m' }
      );
      const refreshToken = jwt.sign(
        user.toJSON(),
        process.env.Access_Secret_key
      );
      const newToken = new token({ token: refreshToken });
      await newToken.save();
      return response
        .status(200)
        .json({
          accessToken: accessToken,
          refreshToken: refreshToken,
          name: user.name,
          username: user.username,
        });
    } else {
      return response.status(400).json({ msg: "Password does not match" });
    }
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
};
