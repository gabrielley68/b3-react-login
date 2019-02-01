import React, {Component} from 'react';

const ClientContext = React.createContext();

export class ClientProvider extends Component{
    constructor(props){
        super(props);

        this.state = {
            isLogged : false,
            userName : '',
            userPicture : ''
        }
    }

    login = e => {
        e.preventDefault();
        const username = e.target.elements.username.value;
        this.setState({
            isLogged : true,
            userName : username,
            userPicture: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50.jpg'
        })
    };

    logout = () => {
        this.setState({
            isLogged: false,
            userName: '',
            userPicture : ''
        });
    };

    render(){
        const {children} = this.props;

        return (
            <ClientContext.Provider
                value={{
                    isLogged: this.state.isLogged,
                    logout : this.logout,
                    login : this.login,
                    userName: this.state.userName,
                    userPicture : this.state.userPicture
                }}
            >
                {children}
            </ClientContext.Provider>
        )
    }
}

export const ClientConsumer = ClientContext.Consumer;