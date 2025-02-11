import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [deletedTasks, setDeletedTasks] = useState([]);
  const [taskText, setTaskText] = useState("");

  const addTask = () => {
    if (taskText.trim()) {
      setTasks([...tasks, { text: taskText, done: false }]);
      setTaskText("");
    }
  };

  const toggleTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].done = !updatedTasks[index].done;
    updatedTasks.sort((a, b) => a.done - b.done);
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const taskToDelete = tasks[index];
    setDeletedTasks([...deletedTasks, taskToDelete]);
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="container-fluid layout">
      <header className="bg-primary text-white text-center py-3">
  <span className="mx-2">Home </span>
  <span className="mx-2">About </span>
  <span className="mx-2">To Do Task</span>
  <span className="mx-2">Service</span>
  <span className="mx-2">Contact Us</span>
  </header>
      <div className="row flex-nowrap ">
      <div className="d-flex flex-column col-2 bg-light vh-100 position-fixed">
  <aside className="p-2 border-bottom">Sidebar 1</aside>
  <aside className="p-2 border-bottom">Sidebar 2</aside>
  <aside className="p-2 border-bottom">Sidebar 3</aside>
  </div>

        <main className="col-8 main-content">
          <div className="todo-container">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
                placeholder="Add a new task"
              />
              <button className="btn btn-success" onClick={addTask}>Add</button>
            </div>
            <ul className="list-group">
              {tasks.map((task, index) => (
                <li key={index} className={`list-group-item d-flex justify-content-between align-items-center ${task.done ? "completed" : ""}`}>
                  <div>
                    <input type="checkbox" className="me-2" checked={task.done} onChange={() => toggleTask(index)} />
                    <span>{task.text}</span>
                  </div>
                  <button className="btn btn-danger btn-sm" onClick={() => deleteTask(index)}>Delete</button>
                </li>
              ))}
            </ul>
          </div>
        </main>
        
        {deletedTasks.length > 0 && (
          <aside className="col-2 bg-light sidebar">
            <h5>Deleted Items</h5>
            <ul className="list-group">
              {deletedTasks.map((task, index) => (
                <li key={index} className="list-group-item text-muted">{task.text}</li>
              ))}
            </ul>
          </aside>
        )}
      </div>
      <footer className="bg-warning text-success text-center py-2">To Do List App @Designed By</footer>
    </div>
  );
};

export default TodoList;
