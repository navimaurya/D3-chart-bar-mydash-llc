import React from 'react'
import './button.scss'

const Button = ({ label = "Button", type = 'button', ...props }) => {
    return (
        <button className='btn' type={type} {...props}>{label}</button>
    )
}

export default Button