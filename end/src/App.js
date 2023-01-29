import "./App.css";
import { ContextProvider } from "./context/appContext";
import Tasks from "./pages/tasks";
import Theme from "./styles/theme";

function App() {
  return (
    <Theme>
      <ContextProvider>
        <Tasks />
      </ContextProvider>
    </Theme>
  );
}

export default App;
