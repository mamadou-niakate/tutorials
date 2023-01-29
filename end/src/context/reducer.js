import {
  ADD_TASK,
  ADD_TASKS_LIST,
  DELETE_TASK,
  DELETE_TASKS_LIST,
  EDIT_TASK,
  EDIT_TASKS_LIST,
  OPEN_TASKS_LIST_FORM,
  SET_TASKS,
  SET_TASKS_LIST_TITLE,
} from "./actionTypes";
import localStorageService from "../service/localStorage.service";

const generateRandomString = () => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

export const reducer = (state, action) => {
  switch (action.type) {
    case SET_TASKS:
      return action.payload;
    case ADD_TASKS_LIST:
      const newTasksList = {
        id: generateRandomString(),
        title: action.payload,
        tasks: [],
      };
      localStorageService.set("tasks", {
        ...state,
        tasksList: [...state.tasksList, newTasksList],
      });
      return {
        ...state,
        tasksList: [...state.tasksList, newTasksList],
      };

    case ADD_TASK:
      const newTask = {
        id: generateRandomString(),
        title: action.payload.title,
        description: action.payload.description,
        priority: action.payload.priority,
        date: action.payload.date,
      };
      const tasksList = state.tasksList.map((list) => {
        if (list.id === action.payload.listId) {
          return {
            ...list,
            tasks: [...list.tasks, newTask],
          };
        }
        return list;
      });
      localStorageService.set("tasks", {
        ...state,
        tasksList: tasksList,
      });

      return {
        ...state,
        tasksList: tasksList,
      };

    case DELETE_TASKS_LIST:
      const newStateAfterDelete = state.tasksList.filter(
        (list) => list.id !== action.payload
      );
      localStorageService.set("tasks", {
        ...state,
        tasksList: newStateAfterDelete,
      });
      return {
        ...state,
        tasksList: newStateAfterDelete,
      };

    case DELETE_TASK:
      const newStateAfterDeleteTask = state.tasksList.map((list) => {
        if (list.id === action.payload.listId) {
          return {
            ...list,
            tasks: list.tasks.filter((task) => task.id !== action.payload.id),
          };
        }
        return list;
      });
      localStorageService.set("tasks", {
        ...state,
        tasksList: newStateAfterDeleteTask,
      });
      return {
        ...state,
        tasksList: newStateAfterDeleteTask,
      };

    case EDIT_TASKS_LIST:
      const newStateAfterEdit = state.tasksList.map((list) => {
        if (list.id === action.payload.listId) {
          return {
            ...list,
            title: action.payload.title,
          };
        }
        return list;
      });
      const newStateAfterEditTasksList = {
        ...state,
        tasksList: newStateAfterEdit,
      };
      localStorageService.set("tasks", newStateAfterEditTasksList);
      return newStateAfterEditTasksList;
    case EDIT_TASK:
      const newTasksListAfetrUpdate = state.tasksList.map((list) => {
        if (list.id === action.payload.listId) {
          return {
            ...list,
            tasks: list.tasks.map((task) => {
              if (task.id === action.payload.id) {
                return {
                  ...task,
                  title: action.payload.title,
                  description: action.payload.description,
                  priority: action.payload.priority,
                  date: action.payload.date,
                };
              }
              return task;
            }),
          };
        }
        return list;
      });
      const newStatke = {
        ...state,
        tasksList: newTasksListAfetrUpdate,
      };
      localStorageService.set("tasks", newStatke);
      return newStatke;
    case OPEN_TASKS_LIST_FORM:
      const newStateAfterOpenTasksListForm = {
        ...state,
        isTasksListFormOpen: action.payload,
      };
      localStorageService.set("tasks", newStateAfterOpenTasksListForm);
      return newStateAfterOpenTasksListForm;
    case SET_TASKS_LIST_TITLE:
      const newStateAfterSetTasksListTitle = {
        ...state,
        tasksListTitleEdit: { ...state.tasksListTitleEdit, ...action.payload },
      };
      localStorageService.set("tasks", newStateAfterSetTasksListTitle);
      return newStateAfterSetTasksListTitle;
    default:
      return state;
  }
};
