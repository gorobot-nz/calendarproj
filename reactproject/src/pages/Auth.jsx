import React, { useState, useContext } from "react";
import { Context } from "../index";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"

const Auth = () => {
    const { auth } = useContext(Context)
    const [user, setUser] = useState({})


    const handleSubmit = (event) => {
        event.preventDefault()
        const eventName = event.nativeEvent.submitter.name
        if (eventName === 'SignUp') {
            createUserWithEmailAndPassword(auth, user.email, user.password)
                .then((userCredential) => {
                    console.log(userCredential.user)
                })
                .catch((error) => {
                    console.log(error)
                });
        } else {
            signInWithEmailAndPassword(auth, user.email, user.password)
                .then((userCredential) => {
                    console.log(userCredential.user)
                })
                .catch((error) => {
                    console.log(error)
                });
        }
    }

    const handleChange = (event) => {
        setUser(user => ({ ...user, [event.target.name]: event.target.value }))
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type={'email'} name='email' onChange={handleChange} />
            <input type={'password'} name='password' onChange={handleChange} />
            <input type={'submit'} name='SignIn' value='Sign In' />
            <input type={'submit'} name='SignUp' value='Sign Up' />
        </form>
    )
}

export default Auth