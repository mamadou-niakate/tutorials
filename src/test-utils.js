import { render } from "@testing-library/react";
import { ContextProvider } from "./store/provider";

const customRender = (ui, options) =>
  render(ui, { wrapper: ContextProvider, ...options });

export * from "@testing-library/react";
export { customRender as render };
