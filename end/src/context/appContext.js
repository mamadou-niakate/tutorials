import { createContext, useContext, useEffect, useReducer } from "react";
import { reducer } from "./reducer";
import localStorageService from "../service/localStorage.service";
import { SET_TASKS } from "./actionTypes";

const AppContext = createContext();

const initialState = {
  tasksList: [],
  isTasksListFormOpen: false,
  tasksListTitleEdit: {
    method: "add",
    value: "",
    tasksListId: "",
  },
};

const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const data = localStorageService.get("tasks");
    if (data) {
      dispatch({ type: SET_TASKS, payload: data });
    }
  }, [dispatch]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { ContextProvider, useAppContext };
