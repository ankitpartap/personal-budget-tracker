import React from 'react'
import "./style.css"

function InputComponent({label, state, setState, placeholder}) {
  return (
    <div className='input-wrapper'>
        <p className='input-label'>{label}</p>
        <input 
            value={state}
            placeholder={placeholder}
            onChange={(e)=>setState(e.target.value)} 
            className='custom-input'
        />
    </div>
  )
}

export default InputComponent