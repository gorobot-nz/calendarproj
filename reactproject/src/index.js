import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import { store } from './redux/index'
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { getStorage } from 'firebase/storage';


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
const db = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app)

export const Context = createContext(null)

ReactDOM.render(
    <Context.Provider value={{
        app,
        db,
        auth,
        storage
    }}>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </Context.Provider>,
    document.getElementById('root')
);
