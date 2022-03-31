import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import { store } from './redux/index'
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDrzYuj42DQiJN71wGyXL70bkq-c_TQji8",
    authDomain: "calendar-a0a30.firebaseapp.com",
    databaseURL: "https://calendar-a0a30-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "calendar-a0a30",
    storageBucket: "calendar-a0a30.appspot.com",
    messagingSenderId: "720689188676",
    appId: "1:720689188676:web:52c61c8a9a2c51df351111"
};

const app = initializeApp(firebaseConfig);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
