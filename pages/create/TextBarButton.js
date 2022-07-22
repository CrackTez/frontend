import React from 'react'

const TextBarButton = ({ icon, style, onClickHandler }) => {
  return (
    <button onClick={onClickHandler}>
        <i className={`${style} fa-${icon}`}></i>
    </button>
  )
}

TextBarButton.defaultProps = {
    style: "fas",
    onClickHandler: () => {return}
}

export default TextBarButton