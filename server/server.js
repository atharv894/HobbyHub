import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import { Server } from "socket.io";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import resourceRoutes from "./routes/resourceRoutes.js";
import Message from "./models/Message.js";

dotenv.config();

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

connectDB();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/resources", resourceRoutes);

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join-room", (hobby) => {
    socket.join(hobby);
    console.log(`User ${socket.id} joined ${hobby} room`);
  });

  socket.on("leave-room", (hobby) => {
    socket.leave(hobby);
    console.log(`User ${socket.id} left ${hobby} room`);
  });

  socket.on("send-message", async (data) => {
    try {
      const { content, sender, hobby } = data;
      const message = await Message.create({
        content,
        sender,
        hobby,
        timestamp: new Date(),
      });

      const populatedMessage = await Message.findById(message._id).populate(
        "sender",
        "name email"
      );

      io.to(hobby).emit("receive-message", populatedMessage);
    } catch (error) {
      console.error("Error sending message:", error);
      socket.emit("error", { message: "Failed to send message" });
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
