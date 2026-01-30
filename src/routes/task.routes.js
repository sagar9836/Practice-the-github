const express = require("express");
const {
    createTask,
    getTask,
    updateTask,
    deleteTask
} = require("../controllers/task.controllers");

const router = express.Router();


router.post("/", createTask);
router.get("/", getTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);


module.exports = router;