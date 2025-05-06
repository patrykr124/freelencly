const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const userRoutes = require("./routers/user.routes");
const jobRoutes = require("./routers/job.routes");
const taskRoutes = require("./routers/task.routes");
const dotenv = require("dotenv");
const { Server } = require("socket.io");
const { PrismaClient } = require("@prisma/client");
const server = http.createServer(app);
const socketHandler = require("./socket/socketHandler");
const io = new Server(server, {
    cors: {
        origin: "*",
    },
});
const prisma = new PrismaClient();

dotenv.config();
app.use(express.json());

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use("/uploads", express.static("uploads"));
app.use("/user", userRoutes);
app.use("/job", jobRoutes);
app.use("/task", taskRoutes);

socketHandler(io, prisma);

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
