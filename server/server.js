const express = require("express");
const app = express();
const cors = require("cors");
const userRoutes = require("./routers/user.routes");
const jobRoutes = require("./routers/job.routes");
const dotenv = require("dotenv");

dotenv.config();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use("/uploads", express.static("uploads"));
app.use("/user", userRoutes);
app.use("/job", jobRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
