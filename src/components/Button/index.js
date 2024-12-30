import React from 'react'
import "./style.css"

function Button({text, onBtnCLick, blue, btnDisabled}) {
  return (
    <div className={blue?"btn btn-blue":'btn'} onClick={onBtnCLick} disabled={btnDisabled}>{text}</div>
  )
}

export default Button