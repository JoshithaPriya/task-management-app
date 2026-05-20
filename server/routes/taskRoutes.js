const router = require("express").Router();
const Task = require("../models/Task");
const auth = require("../middleware/authMiddleware");

router.post("/", auth, async (req, res) => {

    const task = new Task({
        title: req.body.title,
        userId: req.user
    });

    await task.save();

    res.json(task);
});

router.get("/", auth, async (req, res) => {

    const tasks = await Task.find({
        userId: req.user
    });

    res.json(tasks);
});

router.delete("/:id", auth, async (req, res) => {

    await Task.findByIdAndDelete(req.params.id);

    res.json("Task Deleted");
});

router.put("/:id", auth, async (req, res) => {

    await Task.findByIdAndUpdate(
        req.params.id,
        {
            status: req.body.status
        }
    );

    res.json("Task Updated");
});

module.exports = router;