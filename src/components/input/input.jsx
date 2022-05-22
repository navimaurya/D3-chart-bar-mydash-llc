import React from 'react'
import './input.scss'
const Input = ({ lable, placeholde = "", name, type = 'text', id = "", value = "", error, ...props }) => {

    return (
        <div className='input-container'>
            <label className='input-lable' htmlFor={id}>{lable}</label>
            <input name={name} className={`input ${error && 'input-error'} `} id={id} type={type} value={value} placeholder={placeholde} {...props} />
            {
                // !!error &&
                <span className='input-error'>{error}</span>
            }
        </div>
    )
}

export default Input