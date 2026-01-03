import dotenv from "dotenv";
dotenv.config();

import express, { Request, Express, Response } from "express";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";

import adminRoute from "./api/admin-route";
import userRoute from "./api/user-route";
import teacherRoute from "./api/teacher-route";
import secretaryRoute from "./api/secretary-route";

const port = 9000;

const app: Express = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONT_END_URL,
  },
});

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
});
io.on("disconnect", (socket) => {
  console.log("user disconnected", socket.id);
});

app.use(express.json());
app.use(cors());

app.get("/", async (req: Request, res: Response) => {
  res.json({
    message: "Backend for todo list application",
  });
});

app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);
app.use("/api/teacher", teacherRoute);
app.use("/api/secretary", secretaryRoute);

server.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

export { io };
