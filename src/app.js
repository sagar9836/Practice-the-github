const express = require("express");
const taskRoutes = require("./routes/task.routes");
const errorHandler = require("./middlewares/error.middleware");

const app = express();

app.use(express.json());   // MUST be here
app.use("/tasks", taskRoutes);
app.use(errorHandler);

module.exports = app;
