import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";

dotenv.config();
connectDB(); // connecting database

const app = express();
const PORT = process.env.PORT!;

app.listen(PORT, async () => { // server listening
  console.log(`Server listening to http://localhost:${PORT}`);
});
