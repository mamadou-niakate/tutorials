import { createContext, useContext, useReducer } from "react";
import { reducer } from "./reducer";

const Context = createContext();

const initialState = {
  tasks: [
    {
      id: 1,
      text: "Doctors Appointment",
      date: "09/01/2023",
    },
    {
      id: 2,
      text: "Meeting at School",
      date: "08/01/2023",
    },
    {
      id: 3,
      text: "Food Shopping",
      date: "10/01/2023",
    },
  ],
};

const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

const useAppProvider = () => {
  const { state, dispatch } = useContext(Context);
  return { state, dispatch };
};

export { ContextProvider, useAppProvider };
