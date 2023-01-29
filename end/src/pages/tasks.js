import React from "react";
import { useAppContext } from "../context/appContext";
import TasksListForm from "../components/tasksListForm";
import { TasksList } from "../components/tasksList";
import {
  AddTasksListButton,
  Container,
  SvgIcon,
  TasksContainer,
} from "../styles/tasksStyles";
import { OPEN_TASKS_LIST_FORM } from "../context/actionTypes";
import localStorageService from "../service/localStorage.service";

export default function Tasks() {
  const {
    state: { isTasksListFormOpen, tasksList },
    dispatch,
  } = useAppContext();

  const handleAddTaskList = () => {
    dispatch({ type: OPEN_TASKS_LIST_FORM, payload: !isTasksListFormOpen });
  };

  const handleClearAll = () => {
    localStorageService.clearAll();
    window.location.reload();
  };

  return (
    <Container>
      {isTasksListFormOpen ? (
        <>
          <AddTasksListButton onClick={handleAddTaskList}>
            Cancel
          </AddTasksListButton>
          <TasksListForm />
        </>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "90%",
          }}
        >
          <AddTasksListButton onClick={handleAddTaskList}>
            Add new list
          </AddTasksListButton>
          <SvgIcon style={{ marginTop: 40 }} onClick={handleClearAll}>
            <svg
              viewBox="0 0 21 21"
              xmlns="http://www.w3.org/2000/svg"
              fill="#000000"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <g
                  fill="none"
                  fill-rule="evenodd"
                  stroke="#000000"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  transform="matrix(0 1 1 0 2.5 2.5)"
                >
                  {" "}
                  <path d="m3.98652376 1.07807068c-2.38377179 1.38514556-3.98652376 3.96636605-3.98652376 6.92192932 0 4.418278 3.581722 8 8 8s8-3.581722 8-8-3.581722-8-8-8"></path>{" "}
                  <path d="m4 1v4h-4" transform="matrix(1 0 0 -1 0 6)"></path>{" "}
                </g>{" "}
              </g>
            </svg>
          </SvgIcon>
        </div>
      )}
      <TasksContainer>
        {tasksList?.map(({ id, title, tasks }) => {
          return <TasksList key={title} title={title} tasks={tasks} id={id} />;
        })}
      </TasksContainer>
    </Container>
  );
}
