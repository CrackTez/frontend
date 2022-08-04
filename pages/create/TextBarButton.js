import {React, useContext} from 'react'
import DarkModeContext from "../../Context/DarkModeContext";
const TextBarButton = ({ icon, style, onClickHandler }) => {
  const contextValue = useContext(DarkModeContext);
  return (
    <button onClick={onClickHandler}>
        <i className={`${style} fa-${icon} ${contextValue.isDark? "text-gray-200": ""}`}></i>
    </button>
  )
}

TextBarButton.defaultProps = {
    style: "fas",
    onClickHandler: () => {return}
}

export default TextBarButton