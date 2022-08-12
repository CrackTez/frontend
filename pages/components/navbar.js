import { React, useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import darkModeContext from "../../Context/DarkModeContext";
import logo from "../assets/logoNew.svg"
import Image from "next/image";
export default function Navbar(props) {
  const contextValue = useContext(darkModeContext);
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");

  const handleCreateButton = () => {
    router.push("/create");
  };

  const handleModeChange = () => {
    //store the mode in local storage
    localStorage.setItem("isDarkMode", !contextValue.isDark);
    contextValue.updateState(!contextValue.isDark);
  };
  return (
    <>
      <nav
        id='header'
        className={`fixed transition duration-300 bg-white ${
          props.gradient
            ? contextValue.isDark
              ? "gradientDark"
              : "gradient text-white"
            : contextValue.isDark
            ? "gradientDark"
            : null
        } w-full z-30 top-0  shadow-sm`}>
        <>
          <div className='w-full container mx-auto md:grid md:grid-cols-3 flex flex-wrap items-center justify-evenly mt-0 py-2'>
            
            <div
              className={`toggleColour ${
                props.gradient
                  ? "text-white"
                  : contextValue.isDark
                  ? "text-white"
                  : "text-black"
              } no-underline hover:no-underline font-bold text-2xl lg:text-4xl pl-4 flex items-center`}>
                 <div className="w-11 rounded-full flex items-center mx-2" >
              <Image src = {logo} className = '' />
              </div>
              <Link href='/'>{props.title}</Link>
             
             
            </div>
            <div className=' justify-center md:flex items-center hidden md:visible '>
              <input
                className={`${
                  contextValue.isDark ? "thirdDark text-gray-100" : "bg-gray-100 text-gray-900"
                } focus:outline py-2 rounded-l-md px-4 outline-none focus:outline-none active:outline-none`}
                placeholder='Search Wallet Address...'
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                }}></input>
              <button
                className={`${
                  contextValue.isDark ? "darkBtn" : "lightBtn"
                } py-2 rounded-r-md flex items-center px-3 hover:text-gray-200 `}
                onClick={() => {
                  if (searchValue.length > 0) {
                    if (searchValue.length !== 36) {
                      alert("Please enter a valid address");
                    } else {
                      router.push(`/u/${searchValue}`);
                    }
                  }
                }}>
                <span className='fas fa-search mx-1'></span>Search
              </button>
            </div>
            <div
              className='flex-grow flex items-center w-auto  mt-0 bg-transparent text-black p-0 pr-5 z-20'
              id='nav-content'>
              <ul className='list-reset flex justify-end flex-1 items-center'>
                <li className='mr-3'></li>
              </ul>
              {props.noCreate ? (
                <></>
              ) : (
                <button
                  id='navAction'
                  onClick={handleCreateButton}
                  className={`mx-auto hover:underline font-bold rounded-full mt-0 py-4 px-8 shadow ${
                    contextValue.isDark ? "darkBtn" : "lightBtn"
                  } focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out`}>
                  Create
                </button>
              )}

              <button
                className={`mx-2 fas px-3 py-2 rounded-full outline-none active:outline-none focus:outline-none border-none active:border-none focus:border-none fa-${
                  contextValue.isDark
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
        </>
      </nav>
    </>
  );
}
