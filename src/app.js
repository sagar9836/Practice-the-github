const express = require("express");
const taskRoutes = require("./routes/task.routes");
const errorHandler = require("./middlewares/error.middleware");

const app = express();

app.use(express.json());   // MUST be here
app.use("/tasks", taskRoutes);
app.use(errorHandler);


function logRequests(req, res, next) {
    console.log(`${req.method} ${req.url}`);
    next();
}
app.use(logRequests);

console.log("Task Manager API is running...");
module.exports = app;
 