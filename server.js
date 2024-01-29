import express from "express";
import http from "http";
import cors from 'cors'
import connectDB from "./config/database.js";
import dotenv from 'dotenv'
import usersRouter from "./routes/userRoutes.js";
import contentRouter from "./routes/contentRoutes.js";
import commentRouter from "./routes/commentRoutes.js";
dotenv.config()

//? DB connection
connectDB();

//!server
const app = express();

//* Middlewares
app.use(express.json());

//! cors middlewares
app.use(cors());

//? Routes
app.use("/api/v1/users", usersRouter)
app.use("/api/v1/content", contentRouter)
app.use("/api/v1/comment", commentRouter)

const server = http.createServer(app);

const PORT = process.env.PORT || 5000;


server.listen(PORT, console.log(`Server running on port ${PORT}`));
