import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import Main from "../pages/Main"
import Auth from "../pages/Auth"
import { Context } from "../index";
import { useAuthState } from 'react-firebase-hooks/auth'

export const routes = {
    AUTH: '/auth',
    MAIN: '/main',
}

const AppRouter = () => {
    const { auth } = useContext(Context)
    const [user] = useAuthState(auth)

    return (
        <Routes>
            {
                user ?
                    <>
                        <Route path={routes.MAIN} element={<Main />} />
                        <Route path="*" element={<Navigate to={routes.MAIN} />} />
                    </>
                    :
                    <>
                        <Route path={routes.AUTH} element={<Auth />} />
                        <Route path="*" element={<Navigate to={routes.AUTH} />} />
                    </>
            }
        </Routes>
    )
}

export default AppRouter