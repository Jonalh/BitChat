import express from "express";
import connectDB from "./config/db";
import userRoutes from "./routes/userRoutes";
require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;
app.use(express.json());

connectDB();

app.use("/api/v1/users", userRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
