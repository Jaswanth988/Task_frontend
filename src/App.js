import { useState,useEffect } from "react";
import axios from "axios"
import "./App.css";
function App() {
  const [tasks,setTasks]=useState([])
  const[title,setTitle]=useState("")

  useEffect(()=>{
    fetchTasks();
  },[]);

  const fetchTasks=async()=>
  {
    const res=await axios.get("http://localhost:5000/api/tasks");
    setTasks(res.data);
  };


  const addTask=async ()=>
  {
    if (!title.trim()) {
    alert("Please enter a task");
    return;
  }
    await axios.post("http://localhost:5000/api/tasks/add",{title});
    setTitle("")
    fetchTasks();
  };


  const deleteTask=async(id)=>
  {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`);
    fetchTasks();
  }
  const editTask = async (id) => {
  const newTitle = prompt("Enter new title");
  if (!newTitle) return;
  await axios.put(`http://localhost:5000/api/tasks/${id}`, {
    title: newTitle
  });
  fetchTasks();
};


  const toggleComplete = async (task) => {
  await axios.put(`http://localhost:5000/api/tasks/${task._id}`, {
    completed: !task.completed
  });
  fetchTasks();
};


return (
  <div className="container">
    <h1>Task Manager</h1>

    <div className="input-section">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task"
      />
      <button onClick={addTask}>Add Task</button>
    </div>

    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task, index) => (
          <tr key={task._id}>
            <td>{index + 1}</td>

            <td
              className={task.completed ? "completed" : ""}
              onClick={() => toggleComplete(task)}
            >
              {task.title}
            </td>

            <td>
              {task.completed ? "Completed" : "Pending"}
            </td>

            <td>
              <button className="edit-btn" onClick={() => editTask(task._id)}>
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => deleteTask(task._id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

}

export default App;
