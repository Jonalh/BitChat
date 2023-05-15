import express from "express";
import {
  register,
  login,
  addFriend,
  getFriends,
} from "../controllers/userController";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/friend", addFriend);
router.get("/friend/:id", getFriends);

export default router;
