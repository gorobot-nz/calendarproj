import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Main from "../pages/Main"
import Auth from "../pages/Auth"
import Settings from "../pages/Settings";
import { Context } from "../index";
import { useAuthState } from 'react-firebase-hooks/auth'

export const routes = {
    AUTH: '/',
    MAIN: '/main',
    SETTINGS: '/settings'
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
                        <Route path={routes.SETTINGS} element={<Settings />} />
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