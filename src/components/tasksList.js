import React, { useState } from "react";
import { useAppProvider } from "../store/provider";
import TasksListItem from "./tasksListItem";

function TasksList() {
  const {
    state: { tasks },
    dispatch,
  } = useAppProvider();

  const [text, setText] = useState("");

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleAddTask = () => {
    if (!text) return;
    dispatch({
      type: "ADD_TASK",
      payload: {
        id: tasks.length + 1,
        text,
        date: new Date().toLocaleDateString(),
      },
    });
    setText("");
  };

  return (
    <div className="container">
      <h1>Task List</h1>
      <div className="task-form">
        <input
          type="text"
          placeholder="Add a task"
          value={text}
          onChange={handleInputChange}
        />
        <button className="btn-add" onClick={handleAddTask}>
          Add
        </button>
      </div>
      <ul className="task-list">
        {tasks.map((task) => (
          <TasksListItem key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
}

export default TasksList;
