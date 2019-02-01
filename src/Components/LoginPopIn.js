import React, { Component } from 'react';
import {ClientConsumer} from "../Providers/clientProvider";
import {withRouter} from "react-router-dom";
import '../Stylesheets/LoginPopIn.css';

class LoginPopIn extends Component {

    login(login, e){
        login(e);
        this.props.history.push('/');
    }

    render() {
        return (
                <ClientConsumer>
                    {({login}) => (
                        <form className='form' onSubmit={e => this.login(login, e)}>
                            <input type='text' name="username" placeholder="username"/>
                            <input type='password' name="password" placeholder={"mdp"}/>
                            <input type='submit'/>
                        </form>
                    )}
                </ClientConsumer>
        );
    }
}

export default withRouter(LoginPopIn);
