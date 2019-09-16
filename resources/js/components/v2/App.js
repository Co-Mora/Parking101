import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import ReactDOM from 'react-dom';
import Layout from './layout/Layout';
import NavBar from './layout/NavBar'




debugger
export default class App extends Component {
    render() {
        return (
            <div id="wrapper">
                <Layout />
                <div id="page-wrapper" className="gray-bg">
                    <div className="wrapper wrapper-content animated fadeInRight">
                        <NavBar />
                    </div>
                </div>
            </div>

        );
    }
};

debugger
if (document.getElementById('root')) {
    ReactDOM.render(<App />, document.getElementById('root'));
}
