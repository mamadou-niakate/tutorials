import { ThemeProvider } from "styled-components";
import theme from "../theme/default";

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;
