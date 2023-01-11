import "./App.css";
import { ContextProvider } from "./store/provider";
import TasksList from "./components/tasksList";

function App() {
  return (
    <ContextProvider>
      <div className="App">
        <TasksList />
      </div>
    </ContextProvider>
  );
}

export default App;
