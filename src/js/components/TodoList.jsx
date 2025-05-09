import { useState, useEffect } from 'react';

function TodoList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    
    const englishInitialTasks = [
        "Walk the dog",
        "Go to the gym",
        "Study for the exam",
    ];

   
    useEffect(() => {
        
        new Promise(resolve => setTimeout(resolve, 1000))
            .then(() => {
                
                setTasks(englishInitialTasks);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    function addTask() {
        if (newTask.trim() !== "") {
           
            new Promise(resolve => setTimeout(resolve, 500))
                .then(() => {
                    
                    setTasks(t => [...t, newTask]);
                    setNewTask("");
                })
                .catch(err => {
                    setError(err.message);
                });
        }
    }

    function deleteTask(index) {
        
        new Promise(resolve => setTimeout(resolve, 300))
            .then(() => {
                
                const updatedTasks = tasks.filter((_, i) => i !== index);
                setTasks(updatedTasks);
            })
            .catch(err => {
                setError(err.message);
            });
    }

    function moveTaskUp(index) {
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] = 
            [updatedTasks[index - 1], updatedTasks[index]];
            
           
            new Promise(resolve => setTimeout(resolve, 300))
                .then(() => {
                    setTasks(updatedTasks);
                })
                .catch(err => {
                    setError(err.message);
                });
        }
    }

    function moveTaskDown(index) {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = 
            [updatedTasks[index + 1], updatedTasks[index]];
            
            
            new Promise(resolve => setTimeout(resolve, 300))
                .then(() => {
                    setTasks(updatedTasks);
                })
                .catch(err => {
                    setError(err.message);
                });
        }
    }

    if (loading) return <div>Loading tasks...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="to-do-list">
            <h1>To-Do List</h1>
            <div>
                <input 
                    type="text" 
                    placeholder="Enter a task in English..." 
                    value={newTask} 
                    onChange={handleInputChange}
                />
                <button 
                    className="add-button"
                    onClick={addTask}
                >
                    Add
                </button> 
            </div>
            <ol>
                {tasks.map((task, index) => 
                    <li key={index}>
                        <span className="text">{task}</span>
                        <button
                            className="delete-button"
                            onClick={() => deleteTask(index)}
                        >
                            Delete
                        </button>
                        <button
                            className="move-button"
                            onClick={() => moveTaskUp(index)}
                        >
                            ↑
                        </button>
                        <button
                            className="move-button"
                            onClick={() => moveTaskDown(index)}
                        >
                            ↓
                        </button>
                    </li>
                )}
            </ol>
        </div>
    );
}

export default TodoList;