import { React, useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import darkModeContext from "../../Context/DarkModeContext";
export default function Navbar(props) {
  const contextValue = useContext(darkModeContext);
  const [isDarkMode, setIsDarkMode] = useState(contextValue.isDark);
  const router = useRouter();
  const handleCreateButton = () => {
    router.push("/create");
  };

  const handleModeChange = () => {
    //store the mode in local storage
    localStorage.setItem("isDarkMode", !isDarkMode);
    contextValue.updateState(!isDarkMode);
    setIsDarkMode(!isDarkMode);
  };
  return (
    <nav
      id='header'
      className={`fixed transition duration-300 bg-white ${
        props.gradient
          ? isDarkMode
            ? "gradientDark"
            : "gradient text-white"
          : isDarkMode
          ? "gradientDark"
          : null
      } w-full z-30 top-0  shadow-sm`}>
      <div className='w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2'>
        <div
          className={`toggleColour ${
            props.gradient ? "text-white" : isDarkMode? "text-white" : "text-black"
          } no-underline hover:no-underline font-bold text-2xl lg:text-4xl pl-4 flex items-center`}>
          <Link href='/'>{props.title}</Link>
        </div>
        <div
          className='flex-grow flex items-center w-auto  mt-0 bg-transparent text-black p-0 pr-5 z-20'
          id='nav-content'>
          <ul className='list-reset flex justify-end flex-1 items-center'>
            <li className='mr-3'></li>
          </ul>

          <button
            id='navAction'
            onClick={handleCreateButton}
            className={`mx-auto hover:underline font-bold rounded-full mt-0 py-4 px-8 shadow ${
              isDarkMode ? "darkBtn" : "lightBtn"
            } focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out`}>
            Create
          </button>

          <button
            className={`mx-2 fas px-3 py-2 rounded-full fa-${
              isDarkMode
                ? "sun text-white hover:bg-white/20"
                : "moon text-gray-900 hover:bg-white/30"
            } text-2xl`}
            onClick={handleModeChange}></button>
        </div>
      </div>
      <hr
        className={`border-b ${
          contextValue.isDark ? "border-blue-200" : "border-gray-100"
        } opacity-25 my-0 py-0`}
      />
    </nav>
  );
}
