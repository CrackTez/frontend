import { createContext } from "react";

const darkModeContext = createContext({
  isDark: false,
  updateDarkModeState: () => {},
});

export default darkModeContext;
