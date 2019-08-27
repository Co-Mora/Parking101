import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Layout from './layout/Layout';


export default class App extends Component {
    render() {
        return (
            <div id="wrapper">
                <div id="page-wrapper" className="gray-bg">
                    <Layout />
                    <div className="wrapper wrapper-content animated fadeInRight">
                        
                    </div>
                </div>
            </div>

        );
    }
}

if (document.getElementById('root')) {
    ReactDOM.render(<App />, document.getElementById('root'));
}
