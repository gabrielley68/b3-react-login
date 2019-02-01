import React, { Component } from 'react';
import './App.css';
import {ClientProvider} from "./Providers/clientProvider";
import {ChatProvider} from "./Providers/chatProvider";
import Header from './Components/Header';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import LoginPopIn from './Components/LoginPopIn';
import Chat from './Components/Chat';

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <ClientProvider>
                        <ChatProvider>
                            <Link to={'/login'}><Header/></Link>
                            <Link to={'/chat'}>Chat un max</Link>
                            <Route path={'/login'} component={LoginPopIn}/>
                            <Route path={'/chat'} component={Chat}/>
                        </ChatProvider>
                    </ClientProvider>
                </div>
            </Router>
        );
    }
}

export default App;
