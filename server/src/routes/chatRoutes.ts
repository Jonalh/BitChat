import express from "express";
import { createChat, findChat } from "../controllers/chatController";

const router = express.Router();

router.post("/newchat", createChat);
router.get("/findchat/:user1/:user2", findChat);

export default router;
