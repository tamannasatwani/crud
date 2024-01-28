import React, { useState } from 'react';
import './TodoApp.css';


const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState(null);

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: newTask }]);
      setNewTask('');
    }
  };

  const editTask = (id) => {
    setEditingTask(id);
  };

  const updateTask = (id, newText) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, text: newText } : task
    );
    setTasks(updatedTasks);
    setEditingTask(null);
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    setEditingTask(null);
  };

  return (
    <div className="todo-container">
      <h1>Todo App</h1>
      <div className="add-task">
        <input
          type="text"
          placeholder="Enter new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className={editingTask === task.id ? 'editing' : ''}>
            {editingTask === task.id ? (
              <>
                <input
                  type="text"
                  value={task.text}
                  onChange={(e) => updateTask(task.id, e.target.value)}
                />
                <button onClick={() => updateTask(task.id, task.text)}>Save</button>
                <button onClick={() => setEditingTask(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span>{task.text}</span>
                <button onClick={() => editTask(task.id)}>Edit</button>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
