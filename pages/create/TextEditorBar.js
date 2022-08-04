import React, { useState, useRef, useContext } from "react";
import TextBarButton from "./TextBarButton";
import DarkModeContext from "../../Context/DarkModeContext";
const TextEditorBar = ({ currentTab, setCurrentTab, onBarBtnClicked }) => {
  const [headDropOpen, setHeadDropOpen] = useState(false);
  const imgInput = useRef();
  const contextValue = useContext(DarkModeContext);
  const onImgInputChange = (e) => {
    let rawImage = e.target.files[0];
    onBarBtnClicked(e, "image", rawImage);
  };

  return (
    <div
      className={`${
        contextValue.isDark ? "border-[#1c2b4d] bg-[#202e4e]" : ""
      } md:pr-4 mt-4 flex flex-col-reverse items-center md:flex-row md:justify-between border rounded-t-lg`}>
      <div className='text-views w-full md:text-lg flex'>
        <div
          className={` ${
            contextValue.isDark ? "tabDark" : "tab"
          } tab md:rounded-tl-lg ${currentTab == 0 && "active "}`}
          onClick={() => setCurrentTab(0)}>
          <i className='fas fa-pencil'></i> Write
        </div>
        <div
          className={` ${contextValue.isDark ? "tabDark" : "tab"} ${
            currentTab == 1 && "active"
          }`}
          onClick={() => setCurrentTab(1)}>
          <i className='fas fa-eye'></i> Preview
        </div>
        <div
          className={`${contextValue.isDark ? "tabDark" : "tab"} ${
            currentTab == 2 && "active"
          }`}
          onClick={() => setCurrentTab(2)}>
          <i className='fas fa-book'></i> Guide
        </div>
      </div>
      <div className='text-btns hidden md:flex gap-2 p-2 md:p-0 md:gap-4'>
        <div
          className='flex items-center'
          onClick={(e) => setHeadDropOpen(!headDropOpen)}>
          <div
            className={`${
              contextValue.isDark ? "text-gray-200" : ""
            } inline-block relative cursor-pointer`}>
            <i className={`fas fa-heading mr-1`}></i>

            <ul
              className={`absolute ${!headDropOpen && "hidden"}  pt-1 ${
                contextValue.isDark ? "bg-[#121a2e]" : "bg-slate-300"
              } w-12 px-2 rounded-sm`}>
              <li className=''>
                <TextBarButton
                  icon='h1'
                  onClickHandler={(e) => onBarBtnClicked(e, "H1")}
                />
              </li>
              <li className=''>
                <TextBarButton
                  icon='h2'
                  onClickHandler={(e) => onBarBtnClicked(e, "H2")}
                />
              </li>
              <li className=''>
                <TextBarButton
                  icon='h3'
                  onClickHandler={(e) => onBarBtnClicked(e, "H3")}
                />
              </li>
            </ul>
          </div>
          <i
            className={`${
              contextValue.isDark ? "text-gray-200" : ""
            } fas fa-chevron-down`}></i>
        </div>
        <TextBarButton
          icon='bold'
          onClickHandler={(e) => onBarBtnClicked(e, "bold")}
        />
        <TextBarButton
          icon='italic'
          onClickHandler={(e) => onBarBtnClicked(e, "italic")}
        />
        <TextBarButton
          icon='quote-left'
          onClickHandler={(e) => onBarBtnClicked(e, "quote")}
        />
        <TextBarButton
          icon='code'
          onClickHandler={(e) => onBarBtnClicked(e, "code")}
        />
        <TextBarButton
          icon='brackets-curly'
          onClickHandler={(e) => onBarBtnClicked(e, "link")}
        />
        <TextBarButton
          icon='list-ul'
          onClickHandler={(e) => onBarBtnClicked(e, "list")}
        />
        <TextBarButton
          icon='list-ol'
          onClickHandler={(e) => onBarBtnClicked(e, "list-ol")}
        />
        <button onClick={(e) => imgInput.current.click()}>
          <i
            className={` ${
              contextValue.isDark ? "text-gray-200" : ""
            } fas fa-camera`}></i>
          <input
            type='file'
            id='uploadImgToolbar'
            accept='image/png, image/jpeg'
            className='hidden'
            ref={imgInput}
            onChange={onImgInputChange}
          />
        </button>
      </div>
    </div>
  );
};

export default TextEditorBar;
