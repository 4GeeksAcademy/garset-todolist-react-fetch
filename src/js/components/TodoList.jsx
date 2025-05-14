import { useState, useEffect } from 'react';

function TodoList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [username, setUsername] = useState(""); 
    const [showUserForm, setShowUserForm] = useState(false); 

    const API_URL = "https://playground.4geeks.com/todo/users/Garset"; 


    function createUser() {
        if (username.trim() === "") {
            setError("Username cannot be empty");
            return;
        }
        
        fetch("https://playground.4geeks.com/todo/users/" + username, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(response => {
                if (!response.ok) throw new Error("Failed to create user");
                alert(`User "${username}" created successfully!`);
                setUsername("");
                setShowUserForm(false);
            })
            .catch(err => {
                setError(err.message);
            });
    }

    return (
        <div className="to-do-list">
            
            <button 
                className="user-button" 
                onClick={() => setShowUserForm(!showUserForm)}
            >
                {showUserForm ? "Cancel" : "Create New User"}
            </button>

            {/* Formulario para crear usuario (condicional) */}
            {showUserForm && (
                <div className="user-form">
                    <input
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <button onClick={createUser}>Create User</button>
                </div>
            )}

            <h1>Garset TodoList react + fetch</h1>
            <div>
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
                {tasks.map((task, index) => (
                    <li key={task.id}>  
                        <span className="text">{task.task}</span>  
                        <button className="delete-button" onClick={() => deleteTask(task.id)}>
                            Delete
                        </button>
                        <button className="move-button" onClick={() => moveTaskUp(index)}>
                            Up
                        </button>
                        <button className="move-button" onClick={() => moveTaskDown(index)}>
                            Down
                        </button>
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default TodoList;