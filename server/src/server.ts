import express from "express";
import connectDB from "./config/db";
import userRoutes from "./routes/userRoutes";
import bodyParser from "body-parser";
import cors from "cors";
require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;

connectDB();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/v1/user", userRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
