import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { getTasks, createTask, updateTask, deleteTask } from "./api";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const { data } = await getTasks();
    setTasks(data);
  };

  const addTask = async (task) => {
    const { data } = await createTask(task);
    setTasks([...tasks, data]); // Update state with the new task
  };

  const editTask = async (id, updatedTask) => {
    const { data } = await updateTask(id, updatedTask);
    setTasks(tasks.map((task) => (task._id === id ? data : task))); // Update state with modified task
  };

  const removeTask = async (id) => {
    await deleteTask(id);
    setTasks(tasks.filter((task) => task._id !== id)); // Remove deleted task from state
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <TaskForm addTask={addTask} />
      <TaskList tasks={tasks} editTask={editTask} removeTask={removeTask} />
    </div>
  );
}

export default App;
