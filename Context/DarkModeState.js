import darkModeContext from "./DarkModeContext";
import { useState, useEffect } from "react";
const darkModeState = (props) => {
  const [isDark, setIsDark] = useState(true);
  useEffect(() => {
    const darkMode = localStorage.getItem("isDarkMode");
    if(darkMode){
      if (darkMode.toString()=="true") {
        setIsDark(true);
      }
    }
    localStorage.setItem("isDarkMode", isDark);
  
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
