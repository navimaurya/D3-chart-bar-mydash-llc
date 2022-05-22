import React, { useState, useContext, useEffect } from 'react'
import Input from '../../components/input/input'
import Button from '../../components/button/button'
import AppContext from '../../context'
import './auth.scss'

const Auth = () => {
    const { state, dispatch } = useContext(AppContext)
    const [isLogin, setIsLogin] = useState(false)
    const [error, setError] = useState({
        name: '',
        message: ""
    })
    const [details, setDetails] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: "",
        phone: '',
        term: false
    })
    const onChangeHandler = (e) => {
        const { name, value, checked } = e.target
        setDetails({
            ...details,
            [name]: name === 'term' ? checked : value
        })
        setError('')
    }
    const onRegisterHandler = (e) => {
        e.preventDefault();
        if (!(details.phone)) return setError({ name: 'phone', message: "Enter valid 10 digit phone number." });
        if (!(details.email) || !details.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) return setError({ name: 'email', message: "Enter valid email id." });
        if (!(details.name)) return setError({ name: 'name', message: "Enter your name." });
        if (details.password.length < 6) return setError({ name: 'password', message: "Choose a strong password." });
        if (details.password !== details.confirmPassword) return setError({ name: 'confirmPassword', message: "Password and confirm password are not same." });
        if (!details.term) return setError({ name: 'term', message: "Accept term and conditions." });
        const user = state.users.find(user => user.email === details.email)
        if (user) return setError({ name: 'email', message: "This email already registerd." });
        setError('')
        dispatch('REGISTER', details)
        setIsLogin(true)
    }
    const onLoginHandler = (e) => {
        e.preventDefault();
        if (!(details.email)) return setError({ name: 'email', message: "Enter valid email id." });
        const user = state.users.find(user => user.email === details.email.trim())
        if (!user) return setError({ name: 'email', message: "You are not register." });
        if (details.password !== user.password) return setError({ name: 'password', message: "Invalid login or password. Please try again." });
        setError('')
        dispatch('LOGIN', user)
    }
    useEffect(() => {
        setError({
            name: '',
            message: ''
        })
    }, [isLogin])

    return (
        <div className='auth-page'>
            <div className='divider'>
                <div className='divider-l' style={{ backgroundImage: 'url(/bg.jpg)' }} >
                    <div className='comment'>
                        <h2>Choose a date range</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, nesciunt.</p>
                    </div>
                </div>
                <div className='divider-r'>
                    {
                        isLogin ?
                            <>
                                <h1 className='form-title'>Login</h1>
                                <form className='auth-form' onSubmit={onLoginHandler} >
                                    <Input name={'email'} error={error.name === 'email' ? error.message : ''} id={'email'} lable={'Your email address'} onChange={onChangeHandler} value={details.email} />
                                    <Input name={'password'} error={error.name === 'password' ? error.message : ''} id={'password'} lable={'Your password'} type='password' onChange={onChangeHandler} value={details.password} />
                                    <div>
                                        <Button type='submit' label='Login' />
                                    </div>
                                </form>
                                <span onClick={() => setIsLogin(false)} className='authToggle'>Already have an account?</span>
                            </>
                            :
                            <>
                                <h1 className='form-title'>Create an account</h1>
                                <form className='auth-form' onSubmit={onRegisterHandler} >
                                    <Input name={'email'} error={error.name === 'email' ? error.message : ''} id={'email'} lable={'Your email address'} onChange={onChangeHandler} value={details.email} />
                                    <Input name={'password'} error={error.name === 'password' ? error.message : ''} id={'password'} lable={'Your password'} type='password' onChange={onChangeHandler} value={details.password} />
                                    <Input name={'confirmPassword'} error={error.name === 'confirmPassword' ? error.message : ''} id={'confirmPassword'} lable={'Confirm your password'} type='password' onChange={onChangeHandler} value={details.confirmPassword} />
                                    <Input name={'name'} error={error.name === 'name' ? error.message : ''} id={'name'} lable={'Your full name'} onChange={onChangeHandler} value={details.name} />
                                    <Input name={'phone'} error={error.name === 'phone' ? error.message : ''} id={'phone'} lable={'Your phone number'} type='tel' onChange={onChangeHandler} value={details.phone} />
                                    <div className='t-c'>
                                        <input name={`term`} type='checkbox' id='t&c' onChange={onChangeHandler} />
                                        <label className={`${error.name === 'term' ? 'input-error' : ''}`} htmlFor="t&c">Lorem ipsum dolor sit amet. Lorem, ipsum dolor.</label>
                                    </div>
                                    <div>
                                        <Button type='submit' label='Create account' />
                                    </div>
                                </form>
                                <span onClick={() => setIsLogin(true)} className='authToggle'>Already have an account?</span>
                            </>
                    }
                </div>
            </div>
        </div>
    )
}

export default Auth