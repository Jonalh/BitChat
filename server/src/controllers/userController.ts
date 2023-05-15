import { Request, Response } from "express";
import User from "../models/userSchema";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
require("dotenv").config();

// Helper function to create token
const createToken = (user: any) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT secret is not defined in the environment");
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  return token;
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

    // Check username conditions
    if (username.length < 5) {
      return res
        .status(400)
        .json({ message: "Username must be at least 5 characters" });
    }

    if (!username.trim()) {
      return res.status(400).json({ message: "Username cannot be empty" });
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

    const token = createToken(savedUser);
    res.json({ user: savedUser, token });
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

    const token = createToken(user);
    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};

// Add friend
export const addFriend = async (req: Request, res: Response) => {
  const { userId, friendId } = req.body;

  if (!userId || !friendId) {
    return res
      .status(400)
      .json({ message: "Both userId and friendId are required" });
  }

  // Ensure a user cannot add themselves as a friend
  if (userId === friendId) {
    return res
      .status(400)
      .json({ message: "You cannot add yourself as a friend" });
  }

  try {
    // Find the user and update the friends array
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!friend) {
      return res.status(404).json({ message: "Friend not found" });
    }

    // Check if friendId already exists in the user's friends array
    if (user.friends.includes(friendId)) {
      return res.status(400).json({ message: "Friend already added" });
    }

    // Check if the friendId exists as a user
    const friendExists = await User.findById(friendId);
    if (!friendExists) {
      return res.status(404).json({ message: "Friend not found" });
    }

    // Add friends
    user.friends.push(friendId);
    friend.friends.push(userId);
    await user.save();
    await friend.save();

    res.json({ message: "Friend added successfully", user, friend });
  } catch (error) {
    res.status(500).json({ message: "Error adding friend", error });
  }
};

// Find friends
export const getFriends = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "userId is required" });
  }

  try {
    // Find the user
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch each friend's data
    const friends = await Promise.all(
      user.friends.map(async (friendId: string) => {
        const friend = await User.findById(friendId);
        return friend;
      })
    );

    res.json({ friends });
  } catch (error) {
    res.status(500).json({ message: "Error getting friends", error });
  }
};
