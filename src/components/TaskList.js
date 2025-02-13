import { useEffect, useState } from "react";
import { getTasks } from "../api";

const TaskList = ({ tasks, editTask, removeTask }) => {
  const [editableTask, setEditableTask] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");

  const handleEdit = (task) => {
    setEditableTask(task._id);
    setUpdatedTitle(task.title);
  };

  const handleUpdate = async (id) => {
    await editTask(id, { title: updatedTitle });
    setEditableTask(null);
  };

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task._id}>
          {editableTask === task._id ? (
            <>
              <input value={updatedTitle} onChange={(e) => setUpdatedTitle(e.target.value)} />
              <button onClick={() => handleUpdate(task._id)}>Save</button>
            </>
          ) : (
            <>
              {task.title}
              <button onClick={() => handleEdit(task)}>Edit</button>
              <button onClick={() => removeTask(task._id)}>Delete</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
