import { createContext } from "react";

const darkModeContext = createContext({
  isDark: true,
  updateDarkModeState: () => {},
});

export default darkModeContext;
