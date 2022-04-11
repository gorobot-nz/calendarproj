import React, { useState, useContext } from "react";
import { Context } from "../../index";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import FormGroup from "./FormGroup";

const AuthForm = () => {
    const { auth } = useContext(Context)
    const [user, setUser] = useState({})

    const handleSubmit = async (event) => {
        event.preventDefault()
        const eventName = event.nativeEvent.submitter.name
        if (user.email === '' || user.password === '') {
            alert('Really???')
            return
        }
        if (eventName === 'SignUp') {
            try {
                await createUserWithEmailAndPassword(auth, user.email, user.password)
            } catch (e) {
                alert('I think you should choose another mail')
            }
        } else {
            try {
                await signInWithEmailAndPassword(auth, user.email, user.password)
            } catch (e) {
                alert('Check your data, DUDE')
            }
        }
    }

    const handleChange = (event) => {
        setUser(user => ({ ...user, [event.target.name]: event.target.value }))
    }

    return (
        <form onSubmit={handleSubmit}>
            <FormGroup handler={handleChange} inputType='email' labelName='Email' name='email' />
            <FormGroup handler={handleChange} inputType='password' labelName='Password' name='password' />
            <input className="wide-btn shadow" type={'submit'} name='SignIn' value='Sign In' />
            <input className="wide-btn shadow" type={'submit'} name='SignUp' value='Sign Up' />
        </form>
    )
}

export default AuthForm