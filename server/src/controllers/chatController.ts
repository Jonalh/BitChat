import { Request, Response } from "express";
import Chat, { ChatMessage } from "../models/chatSchema";

// Create a new chat and update if already existing
export const createChat = async (req: Request, res: Response) => {
  const { from, to, chat }: { from: string; to: string; chat: string } =
    req.body;

  try {
    // Look for an existing chat between the two users
    const existingChat = await Chat.findOne({
      users: { $all: [from, to] },
    });

    const newMessage: ChatMessage = { from, to, chat, date: new Date() };

    if (existingChat) {
      // If a chat exists, push the new message into the content array
      existingChat.content.push(newMessage);
      await existingChat.save();
      res.json(existingChat);
    } else {
      // If a chat does not exist, create a new chat
      const newChat = new Chat({
        users: [from, to],
        content: [newMessage],
      });

      const savedChat = await newChat.save();
      res.json(savedChat);
    }
  } catch (error) {
    res.status(500).json({ message: "Error handling chat", error });
    console.log(error);
  }
};

// Find a chat between two users
export const findChat = async (req: Request, res: Response) => {
  const { user1, user2 } = req.params;

  try {
    // Look for an existing chat between the two users
    const chat = await Chat.findOne({
      users: { $all: [user1, user2] },
    });

    if (chat) {
      // If a chat exists, return it
      res.json(chat);
    } else {
      // If a chat does not exist, return a 404 error
      res.status(404).json({ message: "Chat not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error finding chat", error });
    console.log(error);
  }
};
