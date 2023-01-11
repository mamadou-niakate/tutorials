import React from "react";
import { useAppProvider } from "../store/provider";

function Task({ task }) {
  const { id, text, date } = task;
  const { dispatch } = useAppProvider();

  const handleDelete = () => {
    dispatch({
      type: "DELETE_TASK",
      payload: id,
    });
  };

  return (
    <li className="task">
      <p>{text}</p>
      <p>{date}</p>
      <button className="btn-delete" onClick={handleDelete}>
        Delete
      </button>
    </li>
  );
}

export default Task;
