import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import Main from "../pages/Main"
import Auth from "../pages/Auth"

export const routes = {
    AUTH: '/auth',
    MAIN: '/main',
}

const AppRouter = () => {
    const isAuth = useSelector(state => state.userReducer.isAuth)

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
                        <Route path={routes.AUTH} element={<Auth />} />
                        <Route path="*" element={<Navigate to={routes.AUTH} />} />
                    </>
            }
        </Routes>
    )
}

export default AppRouter