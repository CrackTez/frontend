import darkModeContext from "./DarkModeContext";
import { useState } from "react";
const darkModeState = (props) => {
  const [isDark, setIsDark] = useState(false);
  const updateState = (newState) => {
    console.log(`in chaginging value: ${newState}`);
    setIsDark(newState);
  };

  return (
    <darkModeContext.Provider value={{ isDark, updateState }}>
      {props.children}
    </darkModeContext.Provider>
  );
};
export default darkModeState;
