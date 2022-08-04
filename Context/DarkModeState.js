import darkModeContext from "./DarkModeContext";
import { useState, useEffect } from "react";
const darkModeState = (props) => {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const darkMode = localStorage.getItem("isDarkMode");
    if (darkMode.toString()=="true") {
      setIsDark(true);
    }
  }
  , [])
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
