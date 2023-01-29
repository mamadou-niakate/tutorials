import React from "react";
import {
  ADD_TASKS_LIST,
  EDIT_TASKS_LIST,
  OPEN_TASKS_LIST_FORM,
  SET_TASKS_LIST_TITLE,
} from "../context/actionTypes";
import { useAppContext } from "../context/appContext";
import {
  CustomTasksListForm,
  CustomTasksListFormButton,
  CustomTasksListFormInput,
} from "../styles/tasksStyles";

function TasksListForm() {
  const {
    state: { tasksListTitleEdit },
    dispatch,
  } = useAppContext();

  const handleChange = (e) => {
    dispatch({
      type: SET_TASKS_LIST_TITLE,
      payload: { value: e.target.value },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tasksListTitleEdit.method.toLowerCase() === "add") {
      dispatch({
        type: ADD_TASKS_LIST,
        payload: tasksListTitleEdit.value,
      });
    } else {
      dispatch({
        type: EDIT_TASKS_LIST,
        payload: {
          title: tasksListTitleEdit.value,
          listId: tasksListTitleEdit.tasksListId,
        },
      });
    }
    dispatch({
      type: SET_TASKS_LIST_TITLE,
      payload: { value: "", method: "add", tasksListId: "" },
    });
    dispatch({ type: OPEN_TASKS_LIST_FORM, payload: false });
  };

  return (
    <CustomTasksListForm>
      <CustomTasksListFormInput
        type="text"
        className="form-control"
        id="taskList"
        placeholder="Enter task list"
        value={tasksListTitleEdit?.value}
        onChange={handleChange}
      />
      <CustomTasksListFormButton type="submit" onClick={handleSubmit}>
        Submit
      </CustomTasksListFormButton>
    </CustomTasksListForm>
  );
}

export default TasksListForm;
