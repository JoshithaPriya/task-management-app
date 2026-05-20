import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {

    const [title, setTitle] = useState("");
    const [tasks, setTasks] = useState([]);

    const token = localStorage.getItem("token");

    const getTasks = async () => {

        const res = await axios.get(
            "http://localhost:5000/api/tasks",
            {
                headers: {
                    token
                }
            }
        );

        setTasks(res.data);
    };

    useEffect(() => {
        getTasks();
    }, []);

    const addTask = async () => {

        if (!title) return;

        await axios.post(
            "http://localhost:5000/api/tasks",
            { title },
            {
                headers: {
                    token
                }
            }
        );

        setTitle("");

        getTasks();
    };

    const deleteTask = async (id) => {

        await axios.delete(
            `http://localhost:5000/api/tasks/${id}`,
            {
                headers: {
                    token
                }
            }
        );

        getTasks();
    };

    const updateStatus = async (id, status) => {

        await axios.put(
            `http://localhost:5000/api/tasks/${id}`,
            {
                status
            },
            {
                headers: {
                    token
                }
            }
        );

        getTasks();
    };

    return (

        <div className="container">

            <h1>Task Dashboard</h1>

            <input
                type="text"
                placeholder="Enter task"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <button onClick={addTask}>
                Add Task
            </button>

            <h2>Your Tasks</h2>

            {
                tasks.map((task) => (

                    <div className="task" key={task._id}>

                        <h3>{task.title}</h3>

                        <p>Status: {task.status}</p>

                        <button
                            onClick={() =>
                                updateStatus(
                                    task._id,
                                    task.status === "Pending"
                                    ? "Completed"
                                    : "Pending"
                                )
                            }
                        >
                            Toggle Status
                        </button>

                        <br /><br />

                        <button
                            onClick={() => deleteTask(task._id)}
                        >
                            Delete
                        </button>

                    </div>
                ))
            }

        </div>
    )
}

export default Dashboard;