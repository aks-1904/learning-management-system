import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import userRoutes from "./routes/user.route.js";
import mediaRoute from "./routes/media.route.js";
import courseRoutes from "./routes/course.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";

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
app.use(morgan("dev"));

//apis
app.use("/media", mediaRoute);
app.use("/user", userRoutes);
app.use("/course", courseRoutes);

app.listen(PORT, async () => {
  // server listening
  console.log(`Server listening to http://localhost:${PORT}`);
});
