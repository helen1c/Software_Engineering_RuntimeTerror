import React from 'react';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import {Routes} from "./Routes";
import {Provider} from "react-redux";
import {store} from "./store/store";

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes/>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
