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

        await axios.post(
            "http://localhost:5000/api/tasks",
            { title },
            {
                headers: {
                    token
                }
            }
        );

        getTasks();

        setTitle("");
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

    return (

        <div className="container">

            <h2>Dashboard</h2>

            <input
                type="text"
                placeholder="Task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <button onClick={addTask}>
                Add Task
            </button>

            {
                tasks.map((task) => (

                    <div className="task" key={task._id}>

                        <h3>{task.title}</h3>

                        <button onClick={() => deleteTask(task._id)}>
                            Delete
                        </button>

                    </div>
                ))
            }

        </div>
    )
}

export default Dashboard;