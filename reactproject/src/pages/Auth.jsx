import React, { useState, useContext } from "react";
import { Context } from "../index";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import FormGroup from "../components/forms/FormGroup";

const Auth = () => {
    const { auth } = useContext(Context)
    const [user, setUser] = useState({})

    const handleSubmit = async (event) => {
        event.preventDefault()
        const eventName = event.nativeEvent.submitter.name
        if (eventName === 'SignUp') {
            const responce = await createUserWithEmailAndPassword(auth, user.email, user.password)
            console.log('d', responce)
        } else {
            const responce = await signInWithEmailAndPassword(auth, user.email, user.password)
            console.log('d', responce)
        }
    }

    const handleChange = (event) => {
        setUser(user => ({ ...user, [event.target.name]: event.target.value }))
    }

    return (
        <form onSubmit={handleSubmit}>
            <FormGroup handler={handleChange} inputType='email' labelName='Email' name='email' />
            <FormGroup handler={handleChange} inputType='password' labelName='Password' name='password' />
            <input className="wide-btn" type={'submit'} name='SignIn' value='Sign In' />
            <input className="wide-btn" type={'submit'} name='SignUp' value='Sign Up' />
        </form>
    )
}

export default Auth