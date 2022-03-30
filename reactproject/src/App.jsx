import React from "react";
import AppRouter from "./components/AppRouter";
import Header from "./components/header/Header"
import './App.css'

const App = () => {
    return (
        <>
            <Header />
            <AppRouter />
        </>
    );
}

export default App;
