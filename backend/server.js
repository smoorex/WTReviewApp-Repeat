const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const userRoute = require("./routes/user");
const commentsRoute = require("./routes/comment");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use("/users", userRoute);
app.use("/comments", commentsRoute);

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/tempdb";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
