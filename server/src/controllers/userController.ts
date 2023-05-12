import { Request, Response } from "express";
import User from "../models/userSchema";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Helper function to create tokens
const createTokens = (user: any) => {
  const accessToken = jwt.sign(
    { userId: user._id },
    process.env.ACCESS_TOKEN_SECRET!,
    {
      expiresIn: "15m",
    }
  );
  const refreshToken = jwt.sign(
    { userId: user._id },
    process.env.REFRESH_TOKEN_SECRET!,
    {
      expiresIn: "7d",
    }
  );
  return { accessToken, refreshToken };
};

// Register user
export const register = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;

  try {
    // Check if email is valid
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email address" });
    }

    // Check if email is already in use
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Check if username is already in use
    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return res.status(400).json({ message: "Username already in use" });
    }

    // Check password conditions
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters" });
    }

    const capitalLetterRegex = /[A-Z]/;
    if (!capitalLetterRegex.test(password)) {
      return res
        .status(400)
        .json({ message: "Password must contain at least one capital letter" });
    }

    const numberRegex = /[0-9]/;
    if (!numberRegex.test(password)) {
      return res
        .status(400)
        .json({ message: "Password must contain at least one number" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      username,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    const tokens = createTokens(savedUser);
    res.json({ user: savedUser, tokens });
  } catch (error) {
    res.status(500).json({ message: "Error registering new user", error });
  }
};

// Login user
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Incorrect email or password" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json({ message: "Incorrect email or password" });

    const tokens = createTokens(user);
    res.json({ user, tokens });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};
