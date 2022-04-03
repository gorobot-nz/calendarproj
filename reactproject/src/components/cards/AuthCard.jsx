import React from "react";
import AuthForm from "../forms/AuthForm";

const AuthCard = () => {
    return (
        <div className="auth-card">
            <div className="card-logo">Calendar</div>
            <AuthForm />
        </div>
    )
}

export default AuthCard