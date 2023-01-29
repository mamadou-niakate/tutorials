import React, { useState } from "react";
import { DELETE_TASK } from "../context/actionTypes";
import { useAppContext } from "../context/appContext";
import TasksListItemForm from "./tasksListItemForm";
import {
  ListItem,
  PriorityBar,
  TaskActions,
  TaskDeleteButton,
  TaskEditButton,
  TaskHeader,
} from "../styles/tasksStyles";

function TasksListItem({ task, listId }) {
  const { id, title, description, priority, date } = task;
  const { dispatch } = useAppContext();
  const [isEdit, setIsEdit] = useState();

  const openOrCloseTaskFormForEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleDeleteTask = () => {
    dispatch({ type: DELETE_TASK, payload: { id, listId } });
  };

  return (
    <>
      <ListItem key={title}>
        <TaskHeader>
          <PriorityBar priority={priority} />
          <TaskActions>
            <TaskEditButton onClick={openOrCloseTaskFormForEdit}>
              Edit
            </TaskEditButton>
            <TaskDeleteButton onClick={handleDeleteTask}>
              Delete
            </TaskDeleteButton>
          </TaskActions>
        </TaskHeader>
        <h3>{title}</h3>
        <p>{description}</p>
        <div>
          <p>{priority}</p>
          <p>{date}</p>
        </div>
      </ListItem>
      {isEdit && (
        <TasksListItemForm
          listId={listId}
          task={task}
          openOrCloseTaskFormForEdit={openOrCloseTaskFormForEdit}
          action="edit"
        />
      )}
    </>
  );
}

export default TasksListItem;
