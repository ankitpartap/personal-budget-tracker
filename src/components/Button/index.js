import React from 'react'
import "./style.css"

function Button({text, onBtnCLick, blue}) {
  return (
    <div className={blue?"btn btn-blue":'btn'} onClick={onBtnCLick}>{text}</div>
  )
}

export default Button