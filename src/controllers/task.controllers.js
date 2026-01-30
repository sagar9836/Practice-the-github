const db = require("../db/database");

exports.createTask = async (req, res, next)=>{
    const {title} = req.body;

    if(!title){
        return res.status(400).json({message: "Title is required"});
    }

    db.run(
        "INSERT INTO tasks (title) VALUES (?)",
        [title],
        function (err) {
        if (err) return next(err);

        const newTask = {
        id: this.lastID,
        title,
        completed: 0,
        };

      // 🔥 Emit socket event
      const io = req.app.get("io");
      io.emit("task:created", newTask);

      res.status(201).json(newTask);
    }
  );
};


exports.getTask = async (req, res, next) =>{
    db.all("SELECT * FROM tasks", [], (err, rows)=>{
        if (err) return next(err);
        res.json(rows);
    });
};


exports.updateTask = (req, res, next) => {
  const { id } = req.params;
  const db = require("../db/database");

  db.run(
    "UPDATE tasks SET completed = 1 WHERE id = ?",
    [id],
    function (err) {
      if (err) return next(err);

      const io = req.app.get("io");
      io.emit("task:updated", { id, completed: 1 });

      res.json({ updated: this.changes });
    }
  );
};



exports.deleteTask = (req, res, next) => {
  const { id } = req.params;
  const db = require("../db/database");

  db.run("DELETE FROM tasks WHERE id = ?", [id], function (err) {
    if (err) return next(err);

    const io = req.app.get("io");
    io.emit("task:deleted", { id });

    res.json({ deleted: this.changes });
  });
};
