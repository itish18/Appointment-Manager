const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const path = require("path");
const { errorHandler } = require("./middleware/errorMiddleware");
const cron = require("node-cron");

const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/appointments", require("./routes/appointmentRoutes"));

// Accessing the path module

app.use(express.static(path.resolve(__dirname, "./client/build")));

app.get("*", function (request, response) {
  response.sendFile(path.join(__dirname, "build", "index.html"));
});
// error handler middleware
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
