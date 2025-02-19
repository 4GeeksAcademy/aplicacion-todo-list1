import React, { useState } from "react";

const Home = () => {
  // Estados
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [editText, setEditText] = useState("");

  // Funciones
  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const toggleComplete = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const startEdit = (index, text) => {
    setEditingTask(index);
    setEditText(text);
  };

  const saveEdit = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, text: editText } : task
    );
    setTasks(updatedTasks);
    setEditingTask(null);
  };

  return (
    <div className="container">
      <h1>Lista de Tareas Pendientes</h1>
      <div className="task-input">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Escribe una nueva tarea"
        />
        <button onClick={addTask}>Agregar</button>
      </div>
      <ul className="task-list">
        {tasks.map((task, index) => (
          <li
            key={index}
            className={`task-item ${task.completed ? "completed" : ""}`}
          >
            {editingTask === index ? (
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
            ) : (
              <span>{task.text}</span>
            )}
            <div className="task-actions">
              {editingTask === index ? (
                <button onClick={() => saveEdit(index)}>Guardar</button>
              ) : (
                <button onClick={() => startEdit(index, task.text)}>
                  Editar
                </button>
              )}
              <button onClick={() => removeTask(index)}>Eliminar</button>
              <button onClick={() => toggleComplete(index)}>
                {task.completed ? "Deshacer" : "Completar"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;