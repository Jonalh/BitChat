import mongoose from "mongoose";

export interface ChatMessage {
  from: string;
  to: string;
  chat: string;
  date: Date;
}

export interface Chat {
  users: string[];
  content: ChatMessage[];
}

const chatSchema = new mongoose.Schema({
  users: [String],
  content: [
    {
      from: String,
      to: String,
      chat: String,
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
