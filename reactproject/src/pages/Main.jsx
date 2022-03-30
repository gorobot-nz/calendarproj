import React from "react";
import CalendarSection from "../components/calendarSection/CalendarSection.jsx";
import UserSection from "../components/userSection/UserSection.jsx";

const Main = () => {
    return (
        <main className="main">
            <div className="container">
                <UserSection />
                <CalendarSection />
            </div>
        </main>
    )
}

export default Main