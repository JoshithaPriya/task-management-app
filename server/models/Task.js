const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({

    title: String,

    status: {
        type: String,
        default: "Pending"
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    userId: String
});

module.exports = mongoose.model("Task", taskSchema);