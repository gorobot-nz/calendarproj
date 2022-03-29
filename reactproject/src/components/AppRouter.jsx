import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Main from "../pages/Main"
import SignIn from "../pages/SignIn"
import SignUp from "../pages/SignUp"

export const routes = {
    SIGN_UP: '/signup',
    SIGN_IN: '/signin',
    MAIN: '/main',
}

const AppRouter = () => {
    const [isAuth, setIsAuth] = useState(false)

    return (
        <Routes>
            {
                isAuth ?
                    <>
                        <Route path={routes.MAIN} element={<Main />} />
                        <Route path="*" element={<Navigate to={routes.MAIN} />} />
                    </>
                    :
                    <>
                        <Route path={routes.SIGN_IN} element={<SignIn />} />
                        <Route path={routes.SIGN_UP} element={<SignUp />} />
                        <Route path="*" element={<Navigate to={routes.SIGN_IN} />} />
                    </>
            }
        </Routes>
    )
}

export default AppRouter