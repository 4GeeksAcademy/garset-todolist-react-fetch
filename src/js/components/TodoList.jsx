
import { useState, useEffect } from 'react';

function TodoList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [username, setUsername] = useState("");
    const [currentUser, setCurrentUser] = useState(null);

    const API_BASE = "https://playground.4geeks.com/todo";

    function createUser() {
        if (username.trim() === "") {
            setError("Username cannot be empty");
            return;
        }
        
        fetch(`${API_BASE}/users/${username}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
           
        })
        .then(response => {
           
            if (response.status === 400) {loadUserTasks(username)};
            return response.json();
        })
        .then(() => {
            setCurrentUser(username);
            console.log (currentUser);
            setUsername("");
            loadUserTasks(username);
        })
        .catch(err => {
            setError(err.message);
            console.error("Error creating user:", err);
        });
    }

    function loadUserTasks(username) {
        setLoading(true);
        fetch(`${API_BASE}/users/${username}`)
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return response.json();
        })
        .then(data => {
            setTasks(data.todos || []);
            setLoading(false);
        })
        .catch(err => {
            setError(err.message);
            setLoading(false);
            console.error("Error loading tasks:", err);
        });
    }

    useEffect(() => {
        if (currentUser) {
            loadUserTasks(currentUser);
        } else {
            setLoading(false);
        }
    }, [currentUser]);

    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    function addTask() {
        if (newTask.trim() === "" || !currentUser) return;

        fetch(`${API_BASE}/todos/${currentUser}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                label: newTask,
                is_done: false,
                id: 0,
            }),
        })
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return response.json();
        })
        .then(newTaskData => {
            setTasks([...tasks, newTaskData]);
            setNewTask("");
        })
        .catch(err => {
            setError(err.message);
            console.error("Error adding task:", err);
        });
    }

    function deleteTask(taskId) {
        fetch(`${API_BASE}/todos/${taskId}`, {
            method: "DELETE",
        })
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            setTasks(tasks.filter(task => task.id !== taskId));
        })
        .catch(err => {
            setError(err.message);
            console.error("Error deleting task:", err);
        });
    }

    if (loading) return <div>Loading tasks...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="to-do-list">
            {!currentUser ? (
                <div className="user-section">
                    <h2>Create or Select User</h2>
                    <div className="user-form">
                        <input
                            type="text"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <button onClick={createUser}>Create/Login User</button>
                    </div>
                </div>
            ) : (
                <>
                    <div className="user-info">
                        <h2>Current User: {currentUser}</h2>
                        <button onClick={() => setCurrentUser(null)}>Change User</button>
                    </div>

                    <h1>Todo List</h1>
                    <div className="task-input">
                        <input 
                            type="text" 
                            placeholder="Enter a task..." 
                            value={newTask} 
                            onChange={handleInputChange}
                        />
                        <button className="add-button" onClick={addTask}>
                            Add
                        </button> 
                    </div>
                    <ol>
                        {tasks.map((task) => (
                            <li key={task.id}>
                                <span className="text">{task.label}</span>
                                <button className="delete-button" onClick={() => deleteTask(task.id)}>
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ol>
                </>
            )}
        </div>
    );
}

export default TodoList;
