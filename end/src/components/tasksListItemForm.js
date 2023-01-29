import React, { useEffect, useState } from "react";
import { ADD_TASK, EDIT_TASK } from "../context/actionTypes";
import { useAppContext } from "../context/appContext";
import {
  CustomTaskForm,
  CustomTaskFormActions,
  CustomTaskFormButton,
  CustomTaskFormInput,
  CustomTaskFormSelect,
} from "../styles/tasksStyles";

const priorityList = ["High", "Medium", "Low"];

function TasksListItemForm({
  listId,
  task,
  openOrCloseTaskFormForAdd,
  openOrCloseTaskFormForEdit,
  action,
}) {
  const { dispatch } = useAppContext();
  const [taskFields, setTaskFields] = useState({
    title: "",
    description: "",
    priority: "High",
    date: new Date().toISOString().slice(0, 10),
  });

  const handleChange = (e) => {
    setTaskFields((prevTask) => ({
      ...prevTask,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCloseForm = (e) => {
    e.preventDefault();
    if (action.toLowerCase() === "add") {
      openOrCloseTaskFormForAdd();
    }
    if (action.toLowerCase() === "edit") {
      openOrCloseTaskFormForEdit();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (action.toLowerCase() === "add") {
      dispatch({ type: ADD_TASK, payload: { listId, ...taskFields } });
      openOrCloseTaskFormForAdd();
    }
    if (action.toLowerCase() === "edit") {
      dispatch({
        type: EDIT_TASK,
        payload: {
          id: taskFields.id,
          listId,
          ...taskFields,
        },
      });
      openOrCloseTaskFormForEdit();
    }
  };

  useEffect(() => {
    if (task) {
      setTaskFields(task);
    }
  }, [task]);

  return (
    <CustomTaskForm>
      <CustomTaskFormInput
        type="text"
        name="title"
        placeholder="Add Task"
        value={taskFields.title}
        onChange={handleChange}
      />
      <CustomTaskFormInput
        type="text"
        name="description"
        placeholder="Add Description"
        value={taskFields.description}
        onChange={handleChange}
      />
      <CustomTaskFormInput
        type="date"
        name="date"
        placeholder="Add Date"
        value={taskFields.date}
        onChange={handleChange}
      />
      <CustomTaskFormSelect
        name="priority"
        value={taskFields.priority}
        onChange={handleChange}
      >
        <option disabled>Select Priority</option>
        {priorityList.map((priority) => (
          <option key={priority} value={priority}>
            {priority}
          </option>
        ))}
      </CustomTaskFormSelect>
      <CustomTaskFormActions>
        <CustomTaskFormButton type="submit" onClick={handleSubmit}>
          Save
        </CustomTaskFormButton>
        <CustomTaskFormButton
          type="submit"
          cancel={true}
          onClick={handleCloseForm}
        >
          Cancel
        </CustomTaskFormButton>
      </CustomTaskFormActions>
    </CustomTaskForm>
  );
}

export default TasksListItemForm;
