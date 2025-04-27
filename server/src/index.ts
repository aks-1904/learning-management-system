import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import userRoutes from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();
connectDB(); // connecting database

const app = express();
const PORT = process.env.PORT!;

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL!,
    credentials: true,
  })
);

//apis
app.use("/user", userRoutes);

app.listen(PORT, async () => {
  // server listening
  console.log(`Server listening to http://localhost:${PORT}`);
});
