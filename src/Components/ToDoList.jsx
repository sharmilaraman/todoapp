import { useState, useEffect, useRef } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faUsers,
  faEnvelope,
  faGift,
  faChartBar,
  faCog,
} from "@fortawesome/free-solid-svg-icons";


const ItemType = "TASK";

const Task = ({ task, index, moveTask, toggleComplete, deleteTask }) => {
  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: ItemType,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveTask(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { index },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  });
  drag(drop(ref));
  return (
    <li
      ref={ref}
      className={`list-group-item d-flex justify-content-between align-items-center ${isDragging ? "opacity-50" : ""}`}
    >
      <div>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleComplete(index)}
          className="me-2"
        />
        <span className={task.completed ? "text-decoration-line-through" : ""}>{task.text}</span>
      </div>
      {!task.completed && (
        <button className="btn btn-danger btn-sm" onClick={() => deleteTask(index)}>
          Delete
        </button>
        )}
    </li>
  );
};
//Function Component TodoList
const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [deletedTasks, setDeletedTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const mainRef = useRef(null);
  const footerRef = useRef(null);
  const [showFooter, setShowFooter] = useState(false);
  //Using useEffect Hook
  useEffect(() => {
     const currentMainRef = mainRef.current; 
   
     if (!currentMainRef) return; 
   
     const handleScroll = () => {
       const { scrollTop, scrollHeight, clientHeight } = currentMainRef;
       setShowFooter(scrollTop + clientHeight >= scrollHeight -1);
     };
   
     currentMainRef.addEventListener("scroll", handleScroll);
   
     return () => {
       currentMainRef.removeEventListener("scroll", handleScroll);
     };
   }, []);
   
 //MoveTask function
  const moveTask = (from, to) => {
    const updatedTasks = [...tasks];
    const [movedTask] = updatedTasks.splice(from, 1);
    updatedTasks.splice(to, 0, movedTask);
    setTasks(updatedTasks);
  };
  //Add Task Function
  const addTask = () => {
    if (newTask.trim()) {
      setTasks([{ id: Date.now(), text: newTask, completed: false }, ...tasks]);
      setNewTask("");
    }
  };
//   Toggle Function
  const toggleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks.sort((a, b) => a.completed - b.completed));
  };
//   Delete Function
const deleteTask = (index) => {
     const confirmDelete = window.confirm("Are you sure to delete this task?");
     if (confirmDelete) {
       setDeletedTasks([...deletedTasks, tasks[index]]);
       setTasks(tasks.filter((_, i) => i !== index));
     }
   };
   
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container-fluid d-flex flex-column vh-100">
     {/* Header Starts */}
      <header 
        style={{
          background: "linear-gradient(90deg, #ff7300, #ffcc00)",
          boxShadow: "4px 0px 10px rgba(0, 0, 0, 0.2)",
          color: "white",
        }}
        
    className="bg-info text-white p-2  start-0 end-0 text-center fw-bold">
  <h1 className="fw-bold display-5 m-0">To-Do List App</h1>
  </header>
      {/* Header End */}

     <div className="row flex-grow-1 h-100 overflow-hidden">
       {/*Left Sidebar Starts    */}
        <aside style={{
  background: "linear-gradient(90deg, #6a3093, #a044ff)",
  boxShadow: "4px 0px 10px rgba(0, 0, 0, 0.2)",
  color: "white",
  pointerEvents:"cursor",
}}
 className="col-md-2 bg-secondary text-white p-3 d-none d-md-flex flex-column position-sticky top-0 vh-100">
      <div className="mb-4 d-flex align-items-center">
        <FontAwesomeIcon icon={faTachometerAlt} className="me-2" />
        <span  style={{cursor:"pointer"}} className="fw-bold">DashBoard</span>
      </div>
      <div className="mb-4 d-flex align-items-center">
        <FontAwesomeIcon icon={faUsers} className="me-2" />
        <span style={{cursor:"pointer"}} className="fw-bold">Users</span>
      </div>
      <div className="mb-4 d-flex align-items-center">
        <FontAwesomeIcon icon={faEnvelope} className="me-2" />
        <span style={{cursor:"pointer"}} className="fw-bold">Message</span>
      </div>
      <div className="mb-4 d-flex align-items-center">
        <FontAwesomeIcon icon={faGift} className="me-2" />
        <span  style={{cursor:"pointer"}} className="fw-bold">Rewards</span>
      </div>
      <div className="mb-4 d-flex align-items-center">
        <FontAwesomeIcon icon={faChartBar} className="me-2" />
        <span style={{cursor:"pointer"}} className="fw-bold">Reports</span>
      </div>
      <div className="mb-4 d-flex align-items-center">
        <FontAwesomeIcon icon={faCog} className="me-2" />
        <span style={{cursor:"pointer"}} className="fw-bold">Settings</span>
      </div>
    </aside>
     {/* Left Sidebar End */}
     
     {/* MainPage Starts */}
          <main ref={mainRef} className="col-md-8 p-3 overflow-auto" style={{ maxHeight: "calc(100vh - 56px)" }}>
            <div className="input-group mb-3">
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="form-control"
                placeholder="Add New Task"
              />
              <button className="btn btn-success" onClick={addTask}>Add Task</button>
            </div>
            <ul className="list-group">
              {tasks.map((task, index) => (
                <Task
                  key={index}
                  task={task}
                  index={index}
                  moveTask={moveTask}
                  toggleComplete={toggleComplete}
                  deleteTask={deleteTask}
                />
              ))}
            </ul>
          </main>
          {/* MainPage End */}
         
          {/* Right Sidebar Starts */}
          {deletedTasks.length > 0 && (
            <aside  style={{
               background: "linear-gradient(90deg, #6a3093, #a044ff)",
               boxShadow: "4px 0px 10px rgba(0, 0, 0, 0.2)",
               color: "white",
             }}
             className="col-md-2 bg-secondary p-3 position-sticky top-0 vh-100">
              <h5 className="fw-bold text-white">Deleted Items</h5>
              <ul className="list-group">
                {deletedTasks.map((task, index) => (
                  <li key={index} className="list-group-item text-muted">
                    {task.text}
                  </li>
                ))}
              </ul>
            </aside>
          )}           
          {/* Right Sidebar End */}

        </div>
        {/* Footer Content Start */}
        <footer style={{
  background: "linear-gradient(90deg, #ff7300, #ffcc00)", 
  boxShadow: "4px 0px 10px rgba(0, 0, 0, 0.2)",
  color: "white",
}}
ref={footerRef} className={`bg-warning text-white  m-0 p-3 text-center ${showFooter ? "d-block" : "d-none"} position-fixed start-0 bottom-0 w-100`}>© 2025 Task Manager | Using React  | All rights reserved.</footer>
        {/* Footer Content End*/}

      </div>
    </DndProvider>
  );
};

export default ToDoList;
